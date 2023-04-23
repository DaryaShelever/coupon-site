import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";

function AddCompany(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CompanyUserModel>();
    const navigate = useNavigate();

    async function send(company: CompanyUserModel) {
        try {
            await adminService.addCompany(company);
            notificationService.success("Product Added");
            // navigate back to products
            navigate("/admin/companies");

        } catch (error: any) {
            console.dir(error);
            notificationService.error(error);
        }
    }
    return (
        <div className="AddCompany Form">
                <h2>Add Company</h2>
            <form>
                    <label htmlFor="name">Name: </label>
                    <input type="text"  {...register("name")} />
                    <span>{formState.errors.name?.message}</span>
    
                    <label htmlFor="email">Email: </label>
                    <input type="email" {...register("email")} />
                    <span>{formState.errors.email?.message}</span> 
                   
                    <label htmlFor="password">Password: </label>
                    <input type="password" {...register("password")} />
                    <span>{formState.errors.password?.message}</span> 

                <button onClick={handleSubmit(send)}>Add</button>
            </form>
        </div>
    );
}

export default AddCompany;
