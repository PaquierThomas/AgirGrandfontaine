/**
 * Interfaces generated from the provided image JSON
 * Generated: 2025-12-11
 */

/** Single format variant (thumbnail, small, medium, etc.) */
export interface ImageFormatVariant {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  /** size in kilobytes as provided in the JSON (e.g. 6.92) */
  size: number;
  /** size in bytes */
  sizeInBytes: number;
  url: string;
}

/** Collection of available format variants. Keys may vary depending on what was generated. */
export interface ImageFormats {
  thumbnail?: ImageFormatVariant;
  small?: ImageFormatVariant;
  medium?: ImageFormatVariant;
  [key: string]: ImageFormatVariant | undefined;
}

/** Provider-specific metadata (structure not provided in example). Keep flexible. */
export type ProviderMetadata = Record<string, unknown> | null;

/** Main image interface */
export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: ImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  /** size in kilobytes as provided in the JSON (e.g. 7.5) */
  size: number;
  url: string;
  previewUrl?: string | null;
  provider?: string | null;
  provider_metadata?: ProviderMetadata;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  publishedAt?: string | null; // ISO date string or null
}

/** Example: narrow/strongly-typed variant when you know some fields are always present */
export interface ImageStrict extends Image {
  id: number;
  url: string;
  createdAt: string;
}


