import { createStore } from "redux";
import CompanyUserModel from "../Models/CompanyUserModel";

// 1. Companies state - the data we need at global application level
export class CompaniesState {
    public companies: CompanyUserModel[] = [];
}

// 2. Action Types - list of actions - enum
export enum CompanyActionType {
    FetchCompanies,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    DetailsAction
}

// 3. Action - an interface describing a single command
export interface CompaniesAction {
    type: CompanyActionType; // action type
    payload: any; // action data
}

// 4. action creators - functions to create action objects
export function fetchCompanyAction(Companies: CompanyUserModel[]): CompaniesAction {
    return { type: CompanyActionType.FetchCompanies, payload: Companies };
}

export function addCompanyAction(product: CompanyUserModel): CompaniesAction {
    return { type: CompanyActionType.AddCompany, payload: product };
}

export function updateCompanyAction(product: CompanyUserModel): CompaniesAction {
    return { type: CompanyActionType.UpdateCompany, payload: product };
}

export function deleteCompanyAction(id: number): CompaniesAction {
    return { type: CompanyActionType.DeleteCompany, payload: id };
}
export function detailsCompanyAction(Company: CompanyUserModel): CompaniesAction{
    return { type: CompanyActionType.DetailsAction, payload: Company };
}

// 5. reducer - a single function performing any of the above actions

export function productReducer(currentState: CompaniesState = new CompaniesState(), action: CompaniesAction): CompaniesState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CompanyActionType.FetchCompanies: // here payload is all Companies
            newState.companies = action.payload;
            break;
        case CompanyActionType.AddCompany: // here payload is a single product to add
            newState.companies.push(action.payload);
            break;
        case CompanyActionType.UpdateCompany: // here payload is a single product to update
            const indexToUpdate = newState.companies.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
            break;
        case CompanyActionType.DeleteCompany: // here payload is an id of product to delete
            const indexToDelete = newState.companies.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.companies.splice(indexToDelete, 1);
            break;
        case CompanyActionType.DetailsAction: 
            newState.companies = action.payload;
            break;
    }

    return newState;
}

// 6 Companies Store object to manage all Companies state

export const companiesStore = createStore(productReducer);

