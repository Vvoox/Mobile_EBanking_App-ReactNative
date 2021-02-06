import {fetchComptes} from "../../services/comptes-service";
import {Facture} from "../../entities/facture";
import {Form} from "../../entities/forms";


export const getForm: any = (payload: Form) => {
    return ({
        type: 'GET_FORM',
        payload
    })
};


