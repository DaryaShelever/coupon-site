import { NavLink } from "react-router-dom";
import "./Customers.css";
import { FaPlus } from "react-icons/fa";
import { customersStore, fetchCustomerAction } from "../../../Redux/CustomerState";
import { useEffect, useState } from "react";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "./CustomerCard/CustomerCard";

function Customers(): JSX.Element {

    const { customers } = customersStore.getState();
    const [allCustomers, setCustomers] = useState<CustomerUserModel[]>(customers[0] ? customers : null);

    useEffect(() => {
        !allCustomers && (async () => {
            adminService.getAllCustomer().then((arr) => {
                fetchCustomerAction(arr);
                setCustomers(arr);
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, []);

    return (
        <div className="Customers">
                <div className="navbar-link">
                    <NavLink to="new"> <FaPlus/> </NavLink>
                </div>
             {allCustomers ? allCustomers.map((c) => (
                <CustomerCard key={c.id} customer={c} />
            ))
            : null}
        </div>
    );
}

export default Customers;
