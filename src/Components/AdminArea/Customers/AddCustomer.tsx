import { useForm } from "react-hook-form";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import { useNavigate } from "react-router-dom";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

function AddCustomer(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CustomerUserModel>();
    const navigate = useNavigate();
        

    async function send(customer: CustomerUserModel) {
        try {
            await adminService.addCustomer(customer);
            notificationService.success("Product Added");
          
            // navigate back to products
            navigate("/admin/customers");

        } catch (error: any) {
            console.dir(error);
            notificationService.error(error);
        }
    }
    return(
            <div className="AddCustomer Form">
                    <h2>Add Customer</h2>
                <form>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text"  {...register("firstName")} />
    
                    <span>{formState.errors.firstName?.message}</span>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text"  {...register("lastName")} />
    
                    <span>{formState.errors.lastName?.message}</span>
    
                    <label htmlFor="email">Email: </label>
                   < input type="email" {...register("email")} />
                     <span>{formState.errors.email?.message}</span> 
                   
                    <label htmlFor="password">Password: </label>
                   < input type="password" {...register("password")} />
                     <span>{formState.errors.password?.message}</span> 

                <button onClick={handleSubmit(send)}>Add</button>
            </form>
            </div>
        )
  
}
export default AddCustomer;
