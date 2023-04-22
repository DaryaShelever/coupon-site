import React, { useEffect, useState } from 'react'
import { couponStore, fetchCouponAction } from '../../Redux/CouponState';
import notificationService from '../../Services/NotificationService';
import CouponModel from '../../Models/CouponModel';
import { NavLink, useParams } from 'react-router-dom';
import customerService from '../../Services/CustomerService';
import CouponCard1 from './CustomerCouponCard';

interface Props {
  selectedValue: string;
}
//customers coupons by category
function FilteredCustomerMyCoupons(props: Props): JSX.Element  {
  const { category } = useParams<{ category: string }>();
  const { coupon } = couponStore.getState();
  const [allCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);
  
  useEffect(() => {
    !allCoupons && (async () => {
        customerService.getCustomerCouponsByCategory(category)
        .then((arr) => {
            fetchCouponAction(arr);
            setCoupon(arr);
        }, (error) => {
            notificationService.error(error);
        });
    })();
}, []);

  return (
    <div>
      {allCoupons ? allCoupons.map((c) => (
                <CouponCard1 key={c.id} coupon={c} />
            ))
            : null} 
        <NavLink to="/customer/purchase"> <button>Back to My Coupons </button></NavLink>

    </div>

  )
}
export default FilteredCustomerMyCoupons;
