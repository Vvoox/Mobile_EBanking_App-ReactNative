import {config} from "../constants/api";
import { getComptes} from "../redux/actions/compte-actions";
import axiosInstance from "../request.interceptor";
import {Compte} from "../entities/compte";
import {getCreancier, getCreanciers} from "../redux/actions/creanciers-actions";
import {getFactures} from "../redux/actions/factures-actions";

export const fetchComptes = () => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/creancier`)
        .then(({data}) => {
            dispatch(getComptes(data));
        });

export const fetchAllCreanciers = () => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/creanciers/all`)
        .then(({data}) => {
            dispatch(getCreanciers(data));
        });

export const fetchCreancier = (codeCreancier:string) => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/creanciers/${codeCreancier}`)
        .then(({data}) => {
            dispatch(getCreancier(data));
        });

export const fetchFactures = (name: string | undefined) => (dispatch: any ) =>
    axiosInstance.get(`${config.API_URL}/creanciers/facture/${name}`)
        .then(({data}) => {
            console.log("Fetched factures", data);
            dispatch(getFactures(data));
           return data;
        });

export const checkFacture = (creanceId: number | undefined, factureId: string | undefined, numeroCompte: string) =>
    axiosInstance.post(`${config.API_URL}/creanciers/facture/${creanceId}/${factureId}/${numeroCompte}`)
        .then(({data}) => {
            console.log("Checking factures", data);
            // dispatch(getFactures(data));
            return data;
        });





