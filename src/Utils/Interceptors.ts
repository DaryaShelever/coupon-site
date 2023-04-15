import axios from "axios";
import { authStore } from "../Redux/AuthState";
import notificationService from "../Services/NotificationService";

class Interceptors {
    
    public create(): void {
        
        axios.interceptors.request.use(requestObject => {
            if (authStore.getState().token) {
                requestObject.headers.Authorization = "Bearer " + authStore.getState().token;
            }
            return requestObject;  
        });
        
        axios.interceptors.response.use(responseObject => {
            if(responseObject.status === 401 || responseObject.status === 403|| responseObject.status === 400) {
                // Redirect to login
                window.location.href="/login";
                notificationService.error("The user is disconnected, Please login again!");
                console.log(responseObject.status);
            }
            return responseObject;
        });
    }
}

const interceptors = new Interceptors();

export default interceptors;