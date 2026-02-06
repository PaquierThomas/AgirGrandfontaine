import type { Component } from "react";
import type { Entity } from "../entity";

export default interface PersonalInformation extends Entity {
  
    phone: string;
    adress: string;
    adress2: string;
    email: string;

}
