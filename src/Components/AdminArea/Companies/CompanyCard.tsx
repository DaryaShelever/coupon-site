import { NavLink} from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import{FaEdit, FaTrashAlt} from 'react-icons/fa'
import notificationService from "../../../Services/NotificationService";
import adminService from "../../../Services/AdminService";


interface CompanyCardProps {
 company: CompanyUserModel;
}

function CompanyCard(props: CompanyCardProps ): JSX.Element {
   
    async function deleteCompany()  {
        if (window.confirm("Are you sure?")) {
        try {
            await adminService.deleteCompany(props.company.id);
            notificationService.success("Company deleted");
        }catch (error: any) {
            notificationService.error(error);
        }
    }
}

    return (
        <div className="CompanyCard Box">
            <div className="CompanyCardBox ">
                Name:{props.company.name} <br />
                Email: {props.company.email} <br />
                Password: {props.company.password} <br />
            </div>
            <div className="navbar-link-company">
            <NavLink to={ "/admin/companies/edit/"+ props.company.id}><FaEdit/></NavLink>
            <NavLink to="" onClick={deleteCompany}><FaTrashAlt/></NavLink>
            </div>
        </div>
    );
}

export default CompanyCard;