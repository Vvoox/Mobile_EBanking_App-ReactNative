import {Client} from "../../entities/client";
import {CompteAction, CompteActions} from "./comptes-reducer";
import {Compte} from "../../entities/compte";
import {Facture} from "../../entities/facture";
import {Creancier} from "../../entities/creancier";
import {getCreances} from "../actions/creanciers-actions";
import {Payment} from "../../entities/payment";

export interface ClientsState {
    comptes: Compte[],
    factures : Facture[],
    creancier: Creancier[],
    payment:Payment[]
}

const INITIAL_STATE: ClientsState = {
    comptes: [],
    factures: [],
    creancier:[],
    payment:[]
};


export interface ClientAction {
    type: string,
    payload?: any;
}

export const clientReducer = (state = INITIAL_STATE, action: ClientAction) => {
    switch (action.type) {
        case 'GET_CLIENT':
            return ({...state, client: action.payload});

        case 'GET_ALL_COMPTES':
            return ({...state, comptes: action.payload});

        case 'GET_COMPTE':
            return ({...state, compte: action.payload});

        case 'GET_ALL_CREANCIERS':
            return ({...state, creanciers: action.payload});

        case 'GET_CREANCIER':
            return ({...state, creancier: action.payload});

        case 'GET_ALL_FACTURES':
            return ({...state, factures: action.payload});

        case 'GET_FACTURE':
            return ({...state, facture: action.payload});

        case 'GET_FORM':
            return ({...state, facture: action.payload});
        case 'GET_PAYMENTS':
            return ({...state, payments: action.payload});

        default:
            return state;
    }
}
