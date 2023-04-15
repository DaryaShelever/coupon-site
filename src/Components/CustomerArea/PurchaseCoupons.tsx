import { useEffect, useState } from "react";
import { couponStore, fetchCouponAction } from "../../Redux/CouponState";
import CouponModel from "../../Models/CouponModel";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";
import CouponCard1 from "./CouponCard1";
import Category from "../../Models/Category";

function PurchaseCoupons(): JSX.Element {

    const { coupon } = couponStore.getState();
    const [customerCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);

    useEffect(() => {
        !customerCoupons && (async () => {
            customerService.getCustomersCoupon().then((arr) => {
                fetchCouponAction(arr);
                setCoupon(arr);
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, []);

    return (
        <div className="Coupon">
            <h1>My Coupons </h1>
            
            <select >
                <option value="">Select</option>
                <option value={Category.FOOD}>FOOD</option>
                <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                <option value={Category.RESTAURANT}>RESTAURANT</option>
                <option value={Category.VACATION}>VACATION</option>
            </select>
            <button>Select</button>
            
             {customerCoupons ? customerCoupons.map((c) => (
                  <CouponCard1 key={c.id} coupon={c} />
            ))
             : null} 
             {/* add loading screen / component   */}
       </div>
    );

            }
export default PurchaseCoupons;
