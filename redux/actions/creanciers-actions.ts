import {fetchComptes} from "../../services/comptes-service";
import {Facture} from "../../entities/facture";
import {Creancier} from "../../entities/creancier";
import {Creance} from "../../entities/creance";


export const getCreanciers: any = (payload: Creancier[]) => {
    return ({
        type: 'GET_ALL_CREANCIERS',
        payload
    })
};

export const getCreancier: any = (payload: Creancier) => {
    return ({
        type: 'GET_CREANCIER',
        payload
    })
};

export const getCreances: any = (payload: Creance[]) => {
    return ({
        type: 'GET_All_CREANCES',
        payload
    })
};

export const getCreance: any = (payload: Creance) => {
    return ({
        type: 'GET_CREANCE',
        payload
    })
};



