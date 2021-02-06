import {CompteAction, CompteActions} from "../reducers/comptes-reducer";
import {Compte} from "../../entities/compte";
import {fetchComptes} from "../../services/comptes-service";


export const getComptes: any = (payload: Compte[]) => {
    return ({
        type: 'GET_ALL_COMPTES',
        payload
    })
};

