import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import { couponStore, fetchCouponAction } from "../Redux/CouponState";
import authService from "./AuthService";
import CustomerUserModel from "../Models/CustomerUserModel";
import { customersStore, detailsAction } from "../Redux/CustomerState";
import Category from "../Models/Category";

class CompanyService{
    [x: string]: any;
   
    public async purchaseCoupon(id: number): Promise<void> {
        couponStore.getState().coupon.find(p=> p.id===id)
        // console.log(id);
        // Redux - update global state about a newly added product
        await axios.get<CouponModel>(appConfig.customerPurchaseCouponUrl+ id);//
        //pop
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        return couponStore.getState().coupon.find(p => p.id === id);
    }

    public async getAllCoupon(): Promise<CouponModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (couponStore.getState().coupon.length === 0) {
                const response = await axios.get<CouponModel[]>(appConfig.getAllCouponsUrl); // waiting//
                const coupon = response.data;
            
                // Redux - update global state about fetching all companies
                // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                couponStore.dispatch(fetchCouponAction(coupon));
            return coupon;
            }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }
    public async getAllCouponsByCategory(category: Category): Promise<CouponModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (couponStore.getState().coupon.length === 0) {
                const response = await axios.get<CouponModel[]>(appConfig.customerGetACouponsByCategoryUrl+category); // waiting//
                const coupon = response.data;
                // Redux - update global state about fetching all companies
                // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                couponStore.dispatch(fetchCouponAction(coupon));
            return coupon;
            }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }


    public async getCustomersCoupon(): Promise<CouponModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (couponStore.getState().coupon.length === 0) {
                const response = await axios.get<CouponModel[]>(appConfig.customerGetCouponsUrl); // waiting//
                const coupon = response.data;
            
                // Redux - update global state about fetching all companies
                // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                couponStore.dispatch(fetchCouponAction(coupon));
            return coupon;
            }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }

    public async getDetails(): Promise<CustomerUserModel>{
        try {
            const response = await axios.get<CustomerUserModel>(appConfig.customerGetDetailsUrl); 
            const customer = response.data;
            customersStore.dispatch(detailsAction(customer)) ;
            return customer;
            
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    //   return companiesStore.dispatch(fetchCompanyAction());  
    }


}

const customerService = new CompanyService();
export default customerService;

