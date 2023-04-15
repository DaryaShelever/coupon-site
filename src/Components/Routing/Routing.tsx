import "./Routing.css";
import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Home from "../HomeArea/Home/Home";
import About from "../AboutArea/About/About";
import Login from "../AuthArea/Login/Login";
import Companies from "../AdminArea/Companies/Companies";
import AddCompany from "../AdminArea/Companies/AddCompany";
import EditCompany from "../AdminArea/Companies/EditCompany";
import Customers from "../AdminArea/Customers/Customers";
import AddCustomer from "../AdminArea/Customers/AddCustomer";
import EditCustomer from "../AdminArea/Customers/EditCustomer";
import CompanyCoupons from "../CompanyArea/CompanyCoupons";
import AddCoupons from "../CompanyArea/AddCoupons";
import EditCoupon from "../CompanyArea/EditCoupon";
import AboutCompany from "../AboutArea/AboutCompany/AboutCompany";
import CustomerCoupons from "../CustomerArea/AllCoupons";
import AboutCustomer from "../AboutArea/AboutCustomer/AboutCustomer";
import PurchaseCoupons from "../CustomerArea/PurchaseCoupons";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Home */}
                <Route path="/home" element={<Home />} />
                {/* About */}
                <Route path="/about" element={<About/>} />
                {/* Login */}
                <Route path="/login" element={<Login/>} />
                
                {/* Admin Area */}
                {/* Companies */}
                <Route path="/admin/companies" element={<Companies/>} />
                {/* Edit */}
                <Route path="/admin/companies/edit/:prodId" element={<EditCompany/>} />
                {/* New */}
                <Route path="/admin/companies/new" element={<AddCompany/>} />

                {/* Customers */}
                <Route path="/admin/customers" element={<Customers/>} />
                {/* Edit */}
                <Route path="/admin/customers/edit/:prodId" element={<EditCustomer/>} />
                {/* New */}
                <Route path="/admin/customers/new" element={<AddCustomer/>} />

                {/* Company Area */}
                <Route path= "/company/coupons" element={<CompanyCoupons/>} />
                 {/* New */}
                 <Route path="/company/coupons/new" element={<AddCoupons/>} />
                {/* Edit */}
                <Route path="/company/coupons/edit/:prodId" element={<EditCoupon/>} />
                {/* About */}
                <Route path="/company/details" element={<AboutCompany/>} />

                {/* Customer Area */}
                <Route path= "/customer/coupons" element={<CustomerCoupons/>} />
                {/* Purchase */}
                <Route path="/customer/purchase" element={<PurchaseCoupons/>} />
                {/* my coupons */}
                {/* About */}
                <Route path="/customer/details" element={<AboutCustomer/>} />








                {/* <Route path="/admin" element={<Admin/>} /> */}
                {/* default rout */}
                <Route path="/" element={<Navigate to={"/home"}/>} />
                {/* page not found */}
                <Route path="*" element={<PageNotFound/>} />
                
            </Routes>
        </div>
    );
}

export default Routing;
