import { SEARCH_USER } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER:
            return {
                ...state,
                name: action.user.name,
                lastName: action.user.lastName,
                code: action.user.cade,
                career: action.user.career
            }
        default:
            return state;
    }
}