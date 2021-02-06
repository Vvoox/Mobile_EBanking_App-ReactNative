import {fetchComptes} from "../../services/comptes-service";
import {Facture} from "../../entities/facture";


export const getFactures: any = (payload: Facture[]) => {
    return ({
        type: 'GET_ALL_FACTURES',
        payload
    })
};


export const getFacture: any = (payload: Facture) => {
    return ({
        type: 'GET_FACTURE',
        payload
    })
};

