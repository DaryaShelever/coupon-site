import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";


function AboutCustomer(): JSX.Element {
   
    const params = useParams();
    // const customerId = +params.prodId;

    const [customer, setCustomer] = useState<CustomerUserModel>();
    // const navigate = useNavigate();

    useEffect(() => {
        customerService.getDetails()
        // .then((p)=>{
        //     setCustomer("firstName", p.firstName);
        //     setCustomer("lastName",p.lastName);
        //     setCustomer("email", p.email);
        //     setCustomer("password", p.password);
            
        // })
        .catch((e: any) => notificationService.error(e));
    }, []);
   


    return (
        <div className="CouponCard Box">
                {customer.id}
                First Name: {customer.firstName} <br />
                Last Name: {customer.lastName} <br />
                Email: {customer.email} <br />
                Password: {customer.password} <br />
        </div>
    );
}

export default AboutCustomer;