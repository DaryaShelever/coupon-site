import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";
import{FaSignOutAlt, FaUserAlt,} from 'react-icons/fa'
import notificationService from "../../../Services/NotificationService";

function AuthMenu(): JSX.Element {
    
    const[user, setUser]= useState<UserModel>(authStore.getState().user);

    useEffect(()=> {
        console.log('user: ', user);
        // setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(()=>{
            setUser(authStore.getState().user); // Any other update
        });
        return unsubscribe; 

    }, [user]);

    function logout(): void {
        authService.logout();
        notificationService.success("Bye Bye");
    }
    return (
        <div className="AuthMenu">
			{!user && 
                <> 
                    <NavLink to= "/login" className="navbar-link"><FaUserAlt/></NavLink>
                </>
            }
            {!!user && 
                <>
                {/* <span> Hello {user.email}</span> */}
                <NavLink to= "/home" onClick={logout}className="navbar-link"> <FaSignOutAlt/></NavLink>
                </>
            }
        </div>
    );
}

export default AuthMenu;

