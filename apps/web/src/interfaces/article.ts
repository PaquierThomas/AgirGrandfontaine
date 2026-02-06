// interfaces/article.ts
import type { Entity } from "./entity";
import type { Image } from "./image";
import type { ArticleBlock } from "./block";

export default interface Article extends Entity {
  title: string;
  description: string;
  date: string;
  read_time: string;
  category: string[];
  slug: string;
  cover: Image;
  blocks?: ArticleBlock[];
}