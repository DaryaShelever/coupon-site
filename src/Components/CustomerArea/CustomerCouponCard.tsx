import CouponModel from "../../Models/CouponModel";

interface CouponCardProps {
 coupon: CouponModel;
}

function CustomerCouponCard(props: CouponCardProps ): JSX.Element {
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
        </div>
    );
}

export default CustomerCouponCard;