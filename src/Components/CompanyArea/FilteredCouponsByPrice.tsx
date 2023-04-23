import React, { useEffect, useState } from 'react'
import { couponStore, fetchCouponAction } from '../../Redux/CouponState';
import companyService from '../../Services/CompanyService';
import notificationService from '../../Services/NotificationService';
import CouponModel from '../../Models/CouponModel';
import { NavLink, useParams } from 'react-router-dom';
import CouponCard from './CouponCard';

interface Props {
  selectedValue: string;
}
function FilteredCouponsByPrice(props: Props): JSX.Element  {
  const { price } = useParams<{ price: string }>();
  const { coupon } = couponStore.getState();
  const [allCoupons, setCoupon] = useState<CouponModel[]>(coupon[0] ? coupon : null);
  
  useEffect(() => {
    !allCoupons && (async () => {
        companyService.getAllCouponsByPrice(price)
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
                  <NavLink to="/company/coupons"><button> Back to Coupons </button></NavLink>

    </div>
  )
}
export default FilteredCouponsByPrice;
