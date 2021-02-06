import {config} from "../constants/api";
import { getComptes} from "../redux/actions/compte-actions";
import axiosInstance from "../request.interceptor";
import {Compte} from "../entities/compte";
import {getPayments} from "../redux/actions/payement-actions";


export const fetchPayment = (numeroCompte: string | undefined) => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/creanciers/payments/${numeroCompte}`)
        .then(({data}) => {
            console.log(data)
            dispatch(getPayments(data));
            return data;
        });


