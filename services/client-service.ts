import axiosInstance from "../request.interceptor";
import {config} from "../constants/api";
import {getClient} from "../redux/actions/client-actions";
import {Compte} from "../entities/compte";
import {getComptes} from "../redux/actions/compte-actions";
import {Client} from "../entities/client";

export const fetchClients = () => (dispatch: any) =>
    axiosInstance.get(`${config.API_URL}/client`)
        .then(({data}) => dispatch(getClient(data)));
