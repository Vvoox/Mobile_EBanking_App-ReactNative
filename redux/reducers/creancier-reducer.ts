import {Compte} from "../../entities/compte";
import {Creance} from "../../entities/creance";

export interface CreancierState {
    creances: Creance[];
}

const INTIAL_STATE: CreancierState = {
    creances: []
};

export enum CreancierActions {
    GET_ALL_CREANCES,
}

export interface CreancierAction {
    type: CreancierActions,
    payload?: any;
}

export const crenciersReducer = (state = INTIAL_STATE, action:CreancierAction) => {
    switch (action.type) {
        case CreancierActions.GET_ALL_CREANCES:
            return ({...state, creances: action.payload});
        default:
            return state;

    }
};
