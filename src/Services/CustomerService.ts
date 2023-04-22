import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import { couponStore, deleteAll, fetchCouponAction, fetchCustomerCouponAction } from "../Redux/CouponState";
import authService from "./AuthService";
import CustomerUserModel from "../Models/CustomerUserModel";
import { customersStore, detailsCustomerAction } from "../Redux/CustomerState";

class CompanyService{
    [x: string]: any;
   
    public async purchaseCoupon(id: number): Promise<void> {
        couponStore.getState().coupon.find(p=> p.id===id)
        await axios.get<CouponModel>(appConfig.customerPurchaseCouponUrl+ id);//
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        return couponStore.getState().coupon.find(p => p.id === id);
    }

    public async getAllCoupon(): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.getAllCouponsUrl); // waiting//
            const coupon = response.data;
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                authService.logout();
            } }
    }
    //all coupons
    public async getAllCouponsByCategory(category: string): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.customerGetAllCouponsByCategoryUrl+category); // waiting//
            const coupon = response.data;
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                authService.logout();
            }}
    }
    public async getAllCouponsByPrice(price: any): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.customerGetAllCouponsUpToMaxPriceUrl+price); // waiting//
            const coupon = response.data;
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                authService.logout();
            }
        }
    }


    public async getCustomersCoupon(): Promise<CouponModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (couponStore.getState().couponCustomer.length === 0) {
                //if no coupons
                const response = await axios.get<CouponModel[]>(appConfig.customerGetCouponsUrl); // waiting//
                const data = response.data;
            
                // Redux - update global state about fetching all companies
                // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                //save coupon in the state
                couponStore.dispatch(fetchCustomerCouponAction(data));
            }
            //go to state and takes coupons 
            const coupon = couponStore.getState().couponCustomer;
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401){
                authService.logout();
                // couponStore.dispatch(deleteAll());
            } 
                
        }
    }

    public async getCustomerCouponsByCategory(category: string): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.customerGetCouponsByCategoryUrl+category); // waiting//
                const coupon = response.data;
        return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                authService.logout();
            }
        }
    }
    public async getCustomerCouponsByPrice(price: any): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.customerGetCouponsUpToMaxPriceUrl+price); // waiting//
                const coupon = response.data;
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                authService.logout();
            }
        }
    }


    public async getDetails(): Promise<CustomerUserModel>{
        try {
            const response = await axios.get<CustomerUserModel>(appConfig.customerGetDetailsUrl); 
            const customer = response.data;
            customersStore.dispatch(detailsCustomerAction(customer)) ;
            return customer;
            
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                authService.logout();

            }
        }
    }
}
const customerService = new CompanyService();
export default customerService;

