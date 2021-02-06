import {Compte} from "../../entities/compte";

export interface ComptesState {
    comptes: Compte[];
}

const INTIAL_STATE: ComptesState = {
    comptes: []
};

export enum CompteActions {
    GET_ALL_COMPTES,
}

export interface CompteAction {
    type: CompteActions,
    payload?: any;
}

export const comptesReducer = (state = INTIAL_STATE, action: CompteAction) => {
    switch (action.type) {
        case CompteActions.GET_ALL_COMPTES:
            return ({...state, comptes: action.payload});
        default:
            return state;

    }
};
