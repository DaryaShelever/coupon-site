import { useEffect, useState } from "react";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";

function AboutCustomer(): JSX.Element {
    const [customer, setCustomer] = useState<CustomerUserModel>();

    useEffect(() => {
        customerService.getDetails()
        .then((p)=>{setCustomer(p)})
        .catch((e: any) => notificationService.error(e));
    }, []);
   
    return customer ? (
        <div>
            <div className="h1">
                <h2>Your details </h2>
            </div>
             <div className="AboutBox Box ">
                First Name : {customer.firstName} <br />
                Last Name : {customer.lastName} <br />
                Email : {customer.email} <br />
                Password : {customer.password} <br />
            </div>
        </div>
    ) : null;
}

export default AboutCustomer;