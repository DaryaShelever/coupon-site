import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { couponStore, fetchCouponAction } from "../../Redux/CouponState";
import CouponModel from "../../Models/CouponModel";
import companyService from "../../Services/CompanyService";
import notificationService from "../../Services/NotificationService";
import CouponCard from "./CouponCard";
import Category from "../../Models/Category";

function CompanyCoupons(): JSX.Element {

    const { coupon } = couponStore.getState();
    const [allCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        !allCoupons && (async () => {
            companyService.getAllCoupon().then((arr) => {
                fetchCouponAction(arr);
                setCoupon(arr);
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, []);

    const handleSelect = (e: any) => {
        // console.log(e.target.value)
        setSelectedValue(e.target.value);
    }

    return (
        <div className="coupon">
            <div className="up">
                <div>
                    <label >Select by category: </label> 
                    <select  className="selectCategory" onChange={handleSelect} >
                    <option value="">Select</option>
                    <option value={Category.FOOD}>FOOD</option>
                    <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                    <option value={Category.RESTAURANT}>RESTAURANT</option>
                    <option value={Category.VACATION}>VACATION</option>
                    </select>
                    <NavLink to={`/company/coupons/category/${selectedValue}`}> <button>Select</button> </NavLink>
                </div>
                <div>
                    <label > Select by Price : </label>
                    <input  className="selectCategory" type="number"  onChange={handleSelect}  />
                    <NavLink to={`/company/coupons/price/${selectedValue}`}> <button>Select</button> </NavLink>
                </div>
                <div className="navbar-link">
                    <label > New </label> 
                    <NavLink to="new"> <FaPlus/> </NavLink>
                </div>
            </div>
             
            {allCoupons ? allCoupons.map((c) => (
                <CouponCard key={c.id} coupon={c} />
            ))
            : null} 
        </div>
    );
} 

export default CompanyCoupons;
