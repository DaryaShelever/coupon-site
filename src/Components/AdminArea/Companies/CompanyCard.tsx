import { NavLink, useParams } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import{FaEdit, FaTrashAlt} from 'react-icons/fa'
import notificationService from "../../../Services/NotificationService";
import adminService from "../../../Services/AdminService";
import { useEffect, useState } from "react";

interface CompanyCardProps {
 company: CompanyUserModel;
}

function CompanyCard(props: CompanyCardProps ): JSX.Element {
   

    const params = useParams();
    const companyId = +params.prodId;

    const [company, setCompany] = useState<CompanyUserModel>();
    // const navigate = useNavigate();

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

useEffect(() => {
    adminService
        .getOneCompany(companyId)
        .then((p) => setCompany(p))
        .catch((e) => notificationService.error(e));
}, []);

    return (
        <div className="CompanyCard Box">
            <div className="CompanyCardBox ">
                Id: {props.company.id} <br />
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