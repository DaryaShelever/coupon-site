import { useEffect, useState } from "react";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";

function AboutCompany(): JSX.Element {
   
   const [company,setCompany]= useState <CompanyUserModel>();

   useEffect(()=> {
    companyService.getDetails()
    .then((p)=> {setCompany(p)})
    .catch((e: any)=> notificationService.error(e));
   },[]);

    return company? (
        <div  >
            <div className="h1">
                <h2>Your details </h2>
            </div>
            <div className="AboutBox Box">
             Name : {company.name} <br />
             Email : {company.email} <br />
             Password : {company.password} <br />
            </div>
        </div>
    ): null;
}

export default AboutCompany;
