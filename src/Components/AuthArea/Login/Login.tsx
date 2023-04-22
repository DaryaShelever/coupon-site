import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import "./Login.css";
import notificationService from "../../../Services/NotificationService";


function Login(): JSX.Element {
    
    const{register,handleSubmit}= useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
          await authService.login(credentials);
          notificationService.success("Welcome");
          navigate("/home");
        } catch (err:any) {
            console.log(err.message);
            notificationService.error(err.message);
            // alert(err.message);//pop
        }
    }
    return (
        <div className="Login">
			<form onSubmit={handleSubmit(send)}>
                <h1>Login</h1> 
                <label > Email:</label>
                <input type="email"  required {...register("email")} />
                <label >Password: </label>
                <input type="password"  required {...register("password")} />

                <select className="selectInLogin" defaultValue=""  required {...register("clientType")}> 
                    <option disabled value="">Select Client Type</option>
                    <option value={ClientType.CUSTOMER}>Customer </option>
                    <option value={ClientType.COMPANY}>Company </option>
                    <option value={ClientType.ADMIN}>Admin </option>
                </select>
                <button>Login</button>
             </form>
        </div>
    );}
export default Login;
