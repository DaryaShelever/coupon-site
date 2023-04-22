import { NavLink, useParams } from "react-router-dom";
import{FaEdit, FaTrashAlt} from 'react-icons/fa'
import CouponModel from "../../Models/CouponModel";
import { useEffect, useState } from "react";
import companyService from "../../Services/CompanyService";
import notificationService from "../../Services/NotificationService";

interface CouponCardProps {
 coupon: CouponModel;
}

function CouponCard(props: CouponCardProps ): JSX.Element {

    const params = useParams();
    const couponId = +params.prodId;
    const [coupon, setCoupon] = useState<CouponModel>();

    async function deleteCoupon()  {
        if (window.confirm("Are you sure?")) {
        try {
            await companyService.deleteCoupon(props.coupon.id);
            notificationService.success("Company deleted");
        }catch (error: any) {
            notificationService.error(error);
        }
    }
}

useEffect(() => {
    companyService
        .getOneCoupon(couponId)
        .then((p) => setCoupon(p))
        .catch((e) => notificationService.error(e));
}, []);

return (
    <div className="CouponCard Box">
        <div className="CouponCardBox ">
            {/* Id: {props.coupon.id} <br /> */}
            Title : {props.coupon.title} <br />
            Start Date : {props.coupon.startDate} <br />
            End Date : {props.coupon.endDate} <br />
            Amount : {props.coupon.amount} <br />
            Description : {props.coupon.description} <br />
            Category : {props.coupon.category} <br />
            Price : {props.coupon.price} <br />
            Image : {props.coupon.image} <br />
            </div>
            <div className="navbar-link-coupon">
            <NavLink to={ "/company/coupons/edit/"+ props.coupon.id}><FaEdit/></NavLink>
            <NavLink to="" onClick={deleteCoupon}><FaTrashAlt/></NavLink>
            </div>
        </div>
    );
}
export default CouponCard;