import {Payment} from "../../entities/payment";



export const getPayments: any = (payload: Payment[]) => {
    return ({
        type: 'GET_PAYMENTS',
        payload
    })
};

