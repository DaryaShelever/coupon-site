import { NavLink, useParams } from "react-router-dom";
import{FaEdit, FaTrashAlt} from 'react-icons/fa'
import notificationService from "../../../Services/NotificationService";
import adminService from "../../../Services/AdminService";
import { useEffect, useState } from "react";
import CustomerUserModel from "../../../Models/CustomerUserModel";

interface CustomerCardProps {
    customer: CustomerUserModel;
}

function CustomerCard(props: CustomerCardProps ): JSX.Element {
   

    const params = useParams();
    const customerId = +params.prodId;

    const [customer, setCustomer] = useState<CustomerUserModel>();
    // const navigate = useNavigate();

    async function deleteCustomer()  {
        if (window.confirm("Are you sure?")) {
        try {
            await adminService.deleteCustomer(props.customer.id);
            notificationService.success("Customer deleted");
            //add popup
        }catch (error: any) {
            notificationService.error(error);
        }
    }
}

useEffect(() => {
    adminService
        .getOneCustomer(customerId)
        .then((p) => setCustomer(p))
        .catch((e) => notificationService.error(e));
}, []);

    return (
        <div className="CustomersCard Box">
            <div className="CustomersCardBox ">
                {/* {props.customer.id} <br /> */}
                First Name: {props.customer.firstName} <br />
                Last Name: {props.customer.lastName} <br />
                Email: {props.customer.email} <br />
                Password: {props.customer.password} <br />
            </div>
            <div className="navbar-link-customer">
            <NavLink to={ "/admin/customers/edit/"+ props.customer.id}><FaEdit/></NavLink>
            <NavLink to="" onClick={deleteCustomer}><FaTrashAlt/></NavLink>
            </div>
        </div>
    );
}

export default CustomerCard;