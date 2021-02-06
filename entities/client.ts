import {Compte} from "./compte";

export interface Client {
    userId?: string;
    numeroTel?: string;
    comptes?:Compte[];
    account?: {
        firstName?: string;
        lastName?: string;
        email?: string;
    };
}
