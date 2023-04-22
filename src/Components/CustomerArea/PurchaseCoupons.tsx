import { useEffect, useState } from "react";
import { couponStore, fetchCustomerCouponAction } from "../../Redux/CouponState";
import CouponModel from "../../Models/CouponModel";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";
import CouponCard1 from "./CouponCard1";
import Category from "../../Models/Category";
import { NavLink } from "react-router-dom";

//the coupons of customer 
function PurchaseCoupons(): JSX.Element {

    const { coupon } = couponStore.getState();
    const [customerCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        // couponStore.dispatch(deleteAll());
        !customerCoupons && (async () => {
            customerService.getCustomersCoupon().then((arr) => {
                fetchCustomerCouponAction(arr);
                setCoupon(arr);
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, []);

    const handleSelect = (e: any) => {
        console.log(e.target.value)
        setSelectedValue(e.target.value);
    }
    return (
        <div className="coupon">
            <h2>My Coupons </h2>
            <div className="up">
                <div>
                <label >Select by category: </label>
                <select onChange={handleSelect} className="selectCategory">
                <option value="">All</option>
                <option value={Category.FOOD}>FOOD</option>
                <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                <option value={Category.RESTAURANT}>RESTAURANT</option>
                <option value={Category.VACATION}>VACATION</option>
            </select>
            <NavLink to={`/customer/purchase/category/${selectedValue}`}> <button>Select</button> </NavLink> 
            </div>
            <div>
                <label > Select by price: </label>
                <input type="number" onChange={handleSelect} className="selectCategory" />
                <NavLink to={`/customer/purchase/price/${selectedValue}`}> <button>Select</button> </NavLink>        
            </div>
            </div>

             {customerCoupons ? customerCoupons.map((c) => (
                  <CouponCard1 key={c.id} coupon={c} />
            ))
             : null} 
             {/* add loading screen / component   */}
       </div>
    );

            }
export default PurchaseCoupons;
