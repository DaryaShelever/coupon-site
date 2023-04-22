import { NavLink} from "react-router-dom";
import{FaPlus} from 'react-icons/fa'
import CouponModel from "../../Models/CouponModel";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";

interface CouponCardProps {
 coupon: CouponModel;
}

function CouponCard(props: CouponCardProps ): JSX.Element {
    
    async function purchaseCoupon()  {
        try {
            await customerService.purchaseCoupon(props.coupon.id);
            notificationService.success("Coupon added");
        }catch (error: any) {
            notificationService.error(error);
        }
    }

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