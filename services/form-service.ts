import {config} from "../constants/api";
import { getComptes} from "../redux/actions/compte-actions";
import axiosInstance from "../request.interceptor";
import {Compte} from "../entities/compte";

export const fetchComptes = () => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/comptes`)
        .then(({data}) => {
            // console.log("Fetched comptes", data);
            dispatch(getComptes(data));
        });


