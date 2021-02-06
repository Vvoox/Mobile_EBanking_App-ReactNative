import {Client} from "../../entities/client";
import {Compte} from "../../entities/compte";

export const getClient = (payload: Client) => ({
    type: 'GET_CLIENT',
    payload
});

