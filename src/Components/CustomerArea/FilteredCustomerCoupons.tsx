import React, { useEffect, useState } from 'react'
import { couponStore, fetchCouponAction } from '../../Redux/CouponState';
import notificationService from '../../Services/NotificationService';
import CouponModel from '../../Models/CouponModel';
import { NavLink, useParams } from 'react-router-dom';
import CouponCard from './CouponCard';
import customerService from '../../Services/CustomerService';

interface Props {
  selectedValue: string;
}
//all coupons by category
function FilteredCustomerCoupons(props: Props): JSX.Element  {
  const { category } = useParams<{ category: string }>();

  const { coupon } = couponStore.getState();
  const [allCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);
  
  useEffect(() => {
    !allCoupons && (async () => {
        customerService.getAllCouponsByCategory(category)
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
                <CouponCard key={c.id} coupon={c} />
            ))
            : null} 

        <NavLink to="/customer/coupons"><button> Back to All Coupons </button></NavLink>
    </div>

  )
}
export default FilteredCustomerCoupons;
