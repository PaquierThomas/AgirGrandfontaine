import type { Entity } from "./entity";

export default interface Actualities extends Entity {
    link: string;
    date: string;
    description: string;
    title: string;
}
