import type { Image } from "src/interfaces/image";

interface Props {
  endpoint: string;
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
  query?: {
    fields?: string[];
    populate?: string | Record<string, any>;
  };
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

function buildStrapiQuery(query: Record<string, any>) {
  const params: Record<string, string> = {};
  const addParam = (key: string, value: string) => {
    params[key] = value;
  };
  const processField = (field: string) => {
    const parts = field.split(".");
    if (parts.length === 1) {
      const index = Object.keys(params).filter((k) => k.startsWith("fields")).length;
      addParam(`fields[${index}]`, parts[0]);
    } else {
      let path = "";
      parts.forEach((part, i) => {
        if (i === 0) {
          path = `populate[${part}]`;
        } else if (i < parts.length - 1) {
          path += `[populate][${part}]`;
        } else {
          // Dernier élément → field
          const index = Object.keys(params).filter((k) => k.includes("[fields]")).length;
          addParam(`${path}[fields][${index}]`, part);
        }
      });
    }
  };
  if (query.fields) {
    query.fields.forEach(processField);
    delete query.fields;
  }

  Object.entries(query).forEach(([key, value]) => {
    if (typeof value === "string") {
      addParam(key, value);
    }
  });
  return params;
}

// Helper function pour convertir l'objet populate en paramètres URL
function buildPopulateParams(populate: any, prefix = "populate"): Record<string, string> {
  const params: Record<string, string> = {};

  if (typeof populate === "string") {
    params[prefix] = populate;
    return params;
  }

  if (typeof populate === "object" && populate !== null) {
    Object.entries(populate).forEach(([key, value]) => {
      if (value === true) {
        params[`${prefix}[${key}][populate]`] = "true";
      } else if (typeof value === "object" && value !== null) {
        const nested = buildPopulateParams(value, `${prefix}[${key}]`);
        Object.assign(params, nested);
      }
    });
  }

  return params;
}

export default async function fetchApi<T>({
  method = "GET",
  body = {},
  endpoint,
  query = {},
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T | T[] | null> {
  if (endpoint.startsWith("/")) endpoint = endpoint.slice(1);
  
  const baseUrl = `${import.meta.env.PUBLIC_API_URL}/api/${endpoint}`;
  const url = new URL(baseUrl);

  // Gestion du paramètre populate
  if (query.populate) {
    if (typeof query.populate === "string") {
      // populate simple: "cover" ou "*"
      url.searchParams.append("populate", query.populate);
    } else {
      // populate objet: { father: { populate: { image: { populate: true } } } }
      const populateParams = buildPopulateParams(query.populate);
      Object.entries(populateParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
  }
  // Si pas de fields et pas de populate → populate=*
  else if (!query.fields) {
    url.searchParams.append("populate", "*");
  }
  // Sinon → génération des fields imbriqués
  else {
    const parsed = buildStrapiQuery({ fields: query.fields });
    Object.entries(parsed).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  console.log("Strapi URL:", url.toString()); // Debug

  try {
    const res = await fetch(url.toString(), {
      method,
      body: method === "GET" ? undefined : JSON.stringify({ data: body }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.API_TOKEN}`,
      },
    });

    // Vérifier si la réponse est ok
    if (!res.ok) {
      console.error(`Strapi API Error: ${res.status} ${res.statusText}`);
      console.error(`URL: ${url.toString()}`);
      
      // Essayer de lire le message d'erreur de Strapi
      try {
        const errorData = await res.json();
        console.error("Strapi error details:", errorData);
      } catch (e) {
        // Ignore si on ne peut pas parser l'erreur
      }
      
      // Retourner un tableau vide ou null selon le cas
      if (wrappedByKey) {
        return [] as T;
      }
      return null as T;
    }

    let data = await res.json();

    // Vérifier si les données sont nulles ou undefined
    if (data === null || data === undefined) {
      console.warn(`Strapi returned null/undefined for endpoint: ${endpoint}`);
      if (wrappedByKey) {
        return [] as T;
      }
      return null as T;
    }

    if (wrappedByKey) {
      data = data[wrappedByKey];
      // Vérifier si la clé wrappée existe et contient des données
      if (!data) {
        console.warn(`Key "${wrappedByKey}" not found or is null in response`);
        return [] as T;
      }
    }

    if (wrappedByList) {
      data = data[0];
    }

    return data as T;
  } catch (error) {
    console.error("Fetch error:", error);
    console.error(`Failed to fetch from: ${url.toString()}`);
    
    // En cas d'erreur réseau ou autre, retourner un tableau vide ou null
    if (wrappedByKey) {
      return [] as T;
    }
    return null as T;
  }
}

export const getImagesApi = (Image: Image | undefined | null): string => {
  if (!Image || !Image.url) {
    console.warn('getImagesApi called with invalid image data:', Image);
    return '/placeholder.jpg'; // ou '' selon votre préférence
  }
  
  // Si l'URL commence par http:// ou https://, c'est déjà une URL complète (Strapi Cloud)
  if (Image.url.startsWith('http://') || Image.url.startsWith('https://')) {
    return Image.url;
  }
  
  // Sinon, c'est un chemin relatif (Strapi auto-hébergé)
  return `${import.meta.env.PUBLIC_API_URL}${Image.url}`;
};