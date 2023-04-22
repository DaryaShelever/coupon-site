import { useForm } from "react-hook-form";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import { customersStore, updateCustomerAction } from "../../../Redux/CustomerState";

 function EditCustomer(): JSX.Element{

    const { register, handleSubmit, formState, setValue } = useForm<CustomerUserModel>();
    const navigate = useNavigate();

    const params = useParams();
    const id = +params.prodId;
    
    useEffect(() => {
        adminService.getOneCustomer(id)
        
        .then((p) => {
            setValue("firstName", p.firstName);
            setValue("lastName", p.lastName);
            setValue("email", p.email);
            setValue("password", p.password);
         })
        
        .catch((err) => notificationService.error(err));
    }, []);

     // Send updated company information to the server
     async function send(customer: CustomerUserModel) {
        customer.id = id;
        console.log(customer);
        
        try {
            await adminService.updateCustomer(customer);
            notificationService.success("Company has been updated");
            customersStore.dispatch(updateCustomerAction(customer))
            navigate("/admin/customers");
        } catch (error: any) {
            console.dir(error);
            notificationService.error(error);
        }
    }
    return(
        <div className="EditCustomer Form">
                <h2>Edit Customer</h2>
                <form>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text"  {...register("firstName")} />
                    <span>{formState.errors.firstName?.message}</span>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text"  {...register("lastName")} />
    
                    <span>{formState.errors.lastName?.message}</span>
    
                    <label htmlFor="email">Email: </label>
                    <input type="email" {...register("email")} />
                    <span>{formState.errors.email?.message}</span> 
                   
                    <label htmlFor="password">Password: </label>
                    <input type="password" {...register("password")} />
                    <span>{formState.errors.password?.message}</span> 

                <button onClick={handleSubmit(send)}>Edit</button>
            </form>
        </div>
    );
 }
 export default EditCustomer;