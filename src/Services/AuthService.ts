import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";
import { couponStore, deleteAll } from "../Redux/CouponState";

class AuthService{

    public async login(credentials : CredentialsModel): Promise<void>{
        // console.log("appConfig", appConfig.loginUrl)
        // console.log("credential", credentials)
        const response =  await axios.post<string>(appConfig.loginUrl, credentials)
        // console.log("response: "+response);
        const token = response.data;
        // console.log("token: "+token)
        authStore.dispatch({type :AuthActionType.Login,payload:token});
    }

    public logout(): void {
       authStore.dispatch({type: AuthActionType.Logout});
       couponStore.dispatch(deleteAll());
    }

    public refresh(token: string): void {
        console.log('in refresh: ', token);
        authStore.dispatch({type :AuthActionType.Refresh,payload:token});
    }

}
const authService= new AuthService();
export default authService;
