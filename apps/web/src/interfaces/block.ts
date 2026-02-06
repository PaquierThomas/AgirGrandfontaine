// interfaces/block.ts
import type { Image } from "./image";

export interface IntroductionBlock {
  __component: "shared.introduction";
  id: number;
  title: string;
  paragraph: string;
}

export interface ParagraphBlock {
  __component: "shared.paragraph";
  id: number;
  text: string;
}
export interface ParagraphSubtitleBlock {
  __component: "shared.paragraph-subtitle";
  id: number;
  subtitle: string;
  paragraph: string;
}

export interface MediaBlock {
  __component: "shared.media";
  id: number;
  legend?: string | null;
  image?: Image | null;
}

export interface SliderBlock {
  __component: "shared.slider";
  id: number;
  files: Image[];
}

// interfaces/block.ts
export type ArticleBlock =
  | IntroductionBlock
  | ParagraphBlock
  | ParagraphSubtitleBlock
  | MediaBlock
  | SliderBlock;
