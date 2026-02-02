import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import fetchApi from "src/lib/strapi";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      fullname: z.string(),
      email: z.string().email(),
      message: z.string().min(10),
      phone: z.string(),
    }),
    handler: async (input) => {
      console.log(input);
      try {
        const res = await fetchApi({
        method: "POST",
        body: input,
        endpoint: "contact-submissions",
      })
console.log("succes mon P")
console.log(res)
      } catch (e){console.error(e)}
      
      
    },
  }),
};