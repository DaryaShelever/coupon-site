import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import { companiesStore, fetchCompanyAction } from "../../../Redux/CompanyState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import CompanyCard from "./CompanyCard";

function Companies(): JSX.Element {

    const { companies } = companiesStore.getState();
    const [allCompanies, setCompanies] = useState<CompanyUserModel[]>(companies[0] ? companies : null);

    useEffect(() => {
        !allCompanies && (async () => {
            adminService.getAllCompany().then((arr) => {
                fetchCompanyAction(arr);
                setCompanies(arr);
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, []);

    return (
        <div className="companies">
             <div className="navbar-link">
             <NavLink to="new "> Add Company <FaPlus/> </NavLink>
             </div>
             
            {allCompanies ? allCompanies.map((c) => (
                <CompanyCard key={c.id} company={c} />
            ))
            : null} {/* add loading screen / component  */}
        </div>
    );
} 

export default Companies;
