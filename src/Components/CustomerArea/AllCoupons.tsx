import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { couponStore, fetchCouponAction } from "../../Redux/CouponState";
import CouponModel from "../../Models/CouponModel";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";
import CouponCard from "./CouponCard";
import Category from "../../Models/Category";

function AllCoupons(): JSX.Element {
    const { coupon } = couponStore.getState();
    const [allCoupons, setCoupons] = useState<CouponModel[]>(coupon[0] ? coupon : null);
    const [selectedValue, setSelectedValue] = useState<string>('');
    
    useEffect(() => {
        !allCoupons && (async () => {
                customerService.getAllCoupon().then((arr) => {
                    fetchCouponAction(arr);
                    setCoupons(arr);
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
	 		<h2>All Coupons that you can to buy  </h2>
            <div className="up">
            
        <div className="">
        <label >Select by category: </label>
            <select className="selectCategory" onChange={handleSelect}>
                <option value="">All</option>
                <option value={Category.FOOD}>FOOD</option>
                <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                <option value={Category.RESTAURANT}>RESTAURANT</option>
                <option value={Category.VACATION}>VACATION</option>
            </select>
            <NavLink to={`/customer/coupons/category/${selectedValue}`}> <button>Select</button> </NavLink> 
        </div>
        <div className="">
            <label > Select by price: </label>
            <input className="selectCategory" type="number" onChange={handleSelect} />
            <NavLink to={`/customer/coupons/price/${selectedValue}`}> <button>Select</button> </NavLink>        
        </div>
        </div>
 <hr />
        {allCoupons ? allCoupons.map((c) => (

            <CouponCard key={c.id} coupon={c} />
        )): null} 
        </div>
    );

 }
export default AllCoupons;
