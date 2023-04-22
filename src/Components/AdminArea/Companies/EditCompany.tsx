import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import { companiesStore, updateCompanyAction } from "../../../Redux/CompanyState";
import notificationService from "../../../Services/NotificationService";
import adminService from "../../../Services/AdminService";

function EditCompany(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<CompanyUserModel>();
    const navigate = useNavigate();

    const params = useParams();
    const id = +params.prodId;

    useEffect(() => {
        adminService.getOneCompany(id)
        
        .then((p) => {
            setValue("name", p.name);
            setValue("email", p.email);
            setValue("password", p.password);
         })
        
        .catch((err) => notificationService.error(err));
    }, []);

    // Send updated company information to the server
    async function send(company: CompanyUserModel) {
        company.id = id;
        console.log(company);
        
        try {
            await adminService.updateCompany(company);
            notificationService.success("Company has been updated");
            // navigate back to products
            companiesStore.dispatch(updateCompanyAction(company))
            navigate("/admin/companies");
            
        } catch (error: any) {
            console.dir(error);
            notificationService.error(error);
        }
    }
    return (
        <div className="EditCompany Form">
                <h2>Edit Company</h2>
            <form>
                {/* you can not change name */}
                <label htmlFor="name">Name: </label> <br /><br />
                <span>You can not change name</span>
                <input type="text"  {...register("name" )}readOnly />
                <span>{formState.errors.name?.message}</span>

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

export default EditCompany;
