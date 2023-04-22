import { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import ClientType from "../../Models/ClientType";
import { authStore } from "../../Redux/AuthState";
import "./Menu.css";

function Menu(): JSX.Element {

    const [clientType, setClientType] = useState<ClientType>();

    useEffect(() => {
        setClientType(authStore.getState().user?.clientType);
        const unsubscribe = authStore.subscribe(() => {
            setClientType(authStore.getState().user?.clientType);
        });
        return unsubscribe;
    }, []);
    
    return (
        <div className="Menu">
            <NavLink to={"/home"}>Home</NavLink>

            {clientType === ClientType.CUSTOMER && <>
                <NavLink to={"/customer/coupons"}>All Coupons</NavLink>
                <NavLink to="/customer/purchase" > My Coupons </NavLink>
                <NavLink to={"/customer/details" }>Details</NavLink>
            </>}
            {clientType === ClientType.COMPANY && <>
                <NavLink to={"/company/coupons" }>Coupons</NavLink>
                <NavLink to={"/company/details" }>Details</NavLink>
            </>}
            {clientType === ClientType.ADMIN && <>
                <NavLink to="/admin/companies">Companies</NavLink>
                <NavLink to="/admin/customers">Customers</NavLink>
            </>}
                {clientType == null &&<>
                <NavLink to={"/about"}>About</NavLink>
                
            </>}
        </div>
    );
}

export default Menu;
