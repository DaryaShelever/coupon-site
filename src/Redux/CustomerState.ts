import { createStore } from "redux";
import CustomerUserModel from "../Models/CustomerUserModel";

// 1. Customers state - the data we need at global application level
export class CustomersState {
    public customers: CustomerUserModel[] = [];
}

// 2. Action Types - list of actions - enum
export enum CustomerActionType {
    FetchCustomer,
    AddCustomer,
    UpdateCustomer,
    DeleteCustomer,
    DetailsAction
}

// 3. Action - an interface describing a single command
export interface CustomerAction {
    type: CustomerActionType; // action type
    payload: any; // action data
}

// 4. action creators - functions to create action objects
export function fetchCustomerAction(Customers: CustomerUserModel[]): CustomerAction {
    return { type: CustomerActionType.FetchCustomer, payload: Customers };
}

export function addCustomerAction(product: CustomerUserModel): CustomerAction {
    return { type: CustomerActionType.AddCustomer, payload: product };
}

export function updateCustomerAction(product: CustomerUserModel): CustomerAction {
    return { type: CustomerActionType.UpdateCustomer, payload: product };
}

export function deleteCustomerAction(id: number): CustomerAction {
    return { type: CustomerActionType.DeleteCustomer, payload: id };
}
export function detailsAction(Customers: CustomerUserModel): CustomerAction{
    return { type: CustomerActionType.DetailsAction, payload: Customers };
}

// 5. reducer - a single function performing any of the above actions
export function productReducer(currentState: CustomersState = new CustomersState(), action: CustomerAction): CustomersState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CustomerActionType.FetchCustomer: // here payload is all Customers
            newState.customers = action.payload;
            break;
        case CustomerActionType.AddCustomer: // here payload is a single product to add
            newState.customers.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomer: // here payload is a single product to update
            const indexToUpdate = newState.customers.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.customers[indexToUpdate] = action.payload;
            break;
        case CustomerActionType.DeleteCustomer: // here payload is an id of product to delete
            const indexToDelete = newState.customers.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.customers.splice(indexToDelete, 1);
            break;
        case CustomerActionType.DetailsAction: 
            newState.customers = action.payload;
            break;
    }

    return newState;
}

// 6 Companies Store object to manage all Companies state

export const customersStore = createStore(productReducer);

