import type { Entity } from "./entity";
import type { Image } from "./image";

export default interface Dog extends Entity {
    slug: string;
    color: string;
    name: string;
    sex: "Male" | "Femelle";
    birthday: string;
    retired: boolean;
    image: Image;
    banner: Image[];
    history: string;
    galery: Image[];
    health: string[];
    hobbies: string[];
    personalities: string[];

    mother_children: Dog;
    father_children: Dog;
    father: Dog;
    mother: Dog;


}
