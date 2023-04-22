import { NavLink, useParams } from "react-router-dom";
import{FaPlus} from 'react-icons/fa'
import CouponModel from "../../Models/CouponModel";
import { useEffect, useState } from "react";
import companyService from "../../Services/CompanyService";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";

interface CouponCardProps {
 coupon: CouponModel;
}

function CouponCard(props: CouponCardProps ): JSX.Element {
   

    const params = useParams();
    const couponId = +params.prodId;

    const [coupon, setCoupon] = useState<CouponModel>();
    // const navigate = useNavigate();

    //customer added the coupon 
    async function purchaseCoupon()  {
        try {
            await customerService.purchaseCoupon(props.coupon.id);
            notificationService.success("Coupon added");
        }catch (error: any) {
            notificationService.error(error);
        }
    }

// useEffect(() => {
    // companyService
    //     .getOneCoupon(couponId)
    //     .then((p) => setCoupon(p))
    //     .catch((e) => notificationService.error(e));
// }, []);

    return (
        <div className="CouponCard Box">
            <div className="CouponCardBox ">
                Image : {props.coupon.image} <br />
                Title : {props.coupon.title} <br />
                Start Date : {props.coupon.startDate} <br />
                End Date : {props.coupon.endDate} <br />
                Description : {props.coupon.description} <br />
                Amount : {props.coupon.amount} <br />
                Category : {props.coupon.category} <br />
                Price : {props.coupon.price} <br />
            </div>
                <div className="navbar-link">
                 <NavLink to="" onClick={purchaseCoupon}> <FaPlus/> </NavLink>
                </div>
            
            
        </div>
    );
}

export default CouponCard;