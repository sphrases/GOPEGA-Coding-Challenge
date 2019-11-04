import { ADD_CUSTOMER } from "../constants/action-types";

export function addCustomer(payload) {
    return { type: ADD_CUSTOMER, payload };
}