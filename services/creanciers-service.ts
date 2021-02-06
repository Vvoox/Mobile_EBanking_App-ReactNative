import {config} from "../constants/api";
import { getComptes} from "../redux/actions/compte-actions";
import axiosInstance from "../request.interceptor";
import {Compte} from "../entities/compte";
import {getFactures} from "../redux/actions/factures-actions";
import {getCreanciers} from "../redux/actions/creanciers-actions";

export const fetchCreanciers = () => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/creanciers/all`)
        .then(({data}) => {
            dispatch(getCreanciers(data));
        });


export const getAllFactures = (name:string) => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/creanciers/facture/${name}`)
        .then(({data}) => {
            dispatch(getFactures(data));
        });


