import {Creance} from "./creance";

export interface Creancier {
    codeCreancier:string|undefined;
    name?:string;
    category?:string
    creances?:Creance[];

}
