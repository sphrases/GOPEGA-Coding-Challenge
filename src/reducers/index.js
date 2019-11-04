import {ADD_CUSTOMER} from "../constants/action-types";

const initialState = {
    customers: []
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CUSTOMER) {
        return Object.assign({}, state, {
            customers: state.customers.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;