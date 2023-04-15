import { NavLink, useParams } from "react-router-dom";
import{FaPlus} from 'react-icons/fa'
import CouponModel from "../../Models/CouponModel";
import { useEffect, useState } from "react";
import companyService from "../../Services/CompanyService";
import notificationService from "../../Services/NotificationService";
import customerService from "../../Services/CustomerService";
import { log } from "console";

interface CouponCardProps {
 coupon: CouponModel;
}

function CouponCard(props: CouponCardProps ): JSX.Element {
   

    const params = useParams();
    const couponId = +params.prodId;

    const [coupon, setCoupon] = useState<CouponModel>();
    // const navigate = useNavigate();

    async function purchaseCoupon()  {
        try {
            // console.log(props.coupon.id);
            
            await customerService.purchaseCoupon(props.coupon.id);
            notificationService.success("Company deleted");
            //add popup
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
                Image:{props.coupon.image} <br />
                Title:{props.coupon.title} <br />
                {/* Name:{props.coupon.startDate.} <br /> */}
                {/* Name:{props.coupon.endDate} <br /> */}
                Description:{props.coupon.description} <br />
                Amount:{props.coupon.amount} <br />
                Category:{props.coupon.category} <br />
                Price:{props.coupon.price} <br />
            </div>
                <div className="navbar-link">
                 <NavLink to="" onClick={purchaseCoupon}> <FaPlus/> </NavLink>
                </div>
            
            
        </div>
    );
}

export default CouponCard;