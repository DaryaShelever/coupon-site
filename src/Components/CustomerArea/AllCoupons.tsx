import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { couponStore, fetchCouponAction } from "../../Redux/CouponState";
import CouponModel from "../../Models/CouponModel";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";
import CouponCard from "./CouponCard";
import { FaShoppingBag } from "react-icons/fa";
import Category from "../../Models/Category";

function AllCoupons(): JSX.Element {

    // const{register,handleSubmit}= useForm<CredentialsCategoryModel>();


    const { coupon } = couponStore.getState();
    const [allCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);
    
    // const credentials = CredentialsCategoryModel;
    
    useEffect(() => {
        !allCoupons && (async () => {
            // if (credentials!= null) {
            //     console.log(register);
                
                //   console.log(credentials);
                // const category=  credentials;
                // customerService.getAllCouponsByCategory();
                // .then((arr) => {
                //     fetchCouponAction(arr);
                //     setCoupon(arr);
                // }, (error) => {
                //     notificationService.error(error);
                // });
            // }
            // else{
                customerService.getAllCoupon().then((arr) => {
                    fetchCouponAction(arr);
                    setCoupon(arr);
                }, (error) => {
                    notificationService.error(error);
                });
            // }
        })();
    }, []);

    // async function send(category: Category) {
    //     try {
    //       await customerService.getAllCouponsByCategory(category);
    //     } catch (err:any) {
    //         console.log(err.message);
    //        (err.message);//pop
    //     }
    // }


    return (
        <div className="Coupon">
	 		<h1>All Coupons that you can to buy</h1>
            <div className="navbar-link">
                <NavLink to="/customer/purchase" > <FaShoppingBag/> </NavLink>
                My Coupons
            </div>

        <div>
            
            <select >
                <option value="">Select</option>
                <option value={Category.FOOD}>FOOD</option>
                <option value={Category.ELECTRICITY}>ELECTRICITY</option>
                <option value={Category.RESTAURANT}>RESTAURANT</option>
                <option value={Category.VACATION}>VACATION</option>
            </select>
            <button>Select</button> <br /><br /><br />
        </div>
        <div>
            <label > Up To Max Price : </label>
            <input type="number" />
            <button>Select</button>
        </div>


            {allCoupons ? allCoupons.map((c) => (
                 <CouponCard key={c.id} coupon={c} />
                 
            ))
             : null} 
             {/* add loading screen / component  */}

        </div>
    );

            }
export default AllCoupons;
