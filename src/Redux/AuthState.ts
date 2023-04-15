import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import AdminUserModel from "../Models/AdminUserModel";
import ClientType from "../Models/ClientType";
import CompanyUserModel from "../Models/CompanyUserModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import UserModel from "../Models/UserModel";

export class AuthState{
    public user: UserModel= null;
    public token: string=null;

    public constructor(){
        this.token= sessionStorage.getItem("token");
        if(this.token){
            this.user= extractUser(this.token);
        }
    }
}
export enum AuthActionType{
Login,
Logout,
Refresh
}
export interface AuthAction{
    type:AuthActionType;
    payload?:string;
}
export function authReducer(currentState:AuthState, action:AuthAction):AuthState{
const newState= {...currentState};

switch (action.type) {
    case AuthActionType.Login: // payload = token
        newState.token = action.payload;
        newState.user = extractUser(newState.token);
        sessionStorage.setItem("token", newState.token);
        localStorage.setItem("token", newState.token);
        break;

    case AuthActionType.Logout: // no payload
        newState.token = null;
        newState.user = null;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        break;

    case AuthActionType.Refresh: // refresh
        newState.token = action.payload;
        newState.user = extractUser(action.payload);
        break;
}

// c. return the duplicate state
return newState;
}

function extractUser(token: string): UserModel {
    console.log(token);
let user: UserModel;
const container: any = jwtDecode(token);
if (container.ClientType === ClientType.CUSTOMER) {
    user = new CustomerUserModel(container.clientType, container.id, container.email, container.password, container.firstName, container.lastName);
} else if (container.ClientType === ClientType.COMPANY) {
    // user = new CompanyUserModel(container.clientType, container.id, container.email, container.password, container.name);
    user = new CompanyUserModel(container.clientType, container.id, container.email, container.password, container.name);
} else {
    user = new AdminUserModel(container.clientType, container.id, container.email, container.password);
}
return user;


}

export const authStore= createStore(authReducer);
