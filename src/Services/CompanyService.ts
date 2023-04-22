import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import { addCouponAction, couponStore, deleteCouponAction, fetchCouponAction, updateCouponAction } from "../Redux/CouponState";
import authService from "./AuthService";
import CompanyUserModel from "../Models/CompanyUserModel";
import { companiesStore, detailsCompanyAction } from "../Redux/CompanyState";

class CompanyService{
   
    public async addCoupon(coupon: CouponModel): Promise<any> {
        const response = await axios.post<CouponModel>(appConfig.companyAddCouponUrl, coupon);//
        const addedCoupon = response.data;

        // Redux - update global state about a newly added product
        couponStore.dispatch(addCouponAction(addedCoupon));

    }
    public async updateCoupon(coupon: CouponModel): Promise<void> {
        const response = await axios.put<CouponModel>(appConfig.companyUpdateCouponUrl, coupon,{//
            headers: {'Content-Type': 'application/json'}
        });
        const updatedCoupon = response.data;
        // Redux
        couponStore.dispatch(updateCouponAction(updatedCoupon));
    }
        
    public async deleteCoupon(couponId: number): Promise<void> {
        await axios.delete(appConfig.companyDeleteCouponUrl + couponId);//
        // Redux
        couponStore.dispatch(deleteCouponAction(couponId));
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        return couponStore.getState().coupon.find(p => p.id === id);
    }

    public async getAllCoupon(): Promise<CouponModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (couponStore.getState().coupon.length === 0) {
                    // Redux - update global state about fetching all companies
                    // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                    
                const response = await axios.get<CouponModel[]>(appConfig.companyFindAllCouponsUrl); // waiting//
                const data = response.data;
                 couponStore.dispatch(fetchCouponAction(data));
            }
            const coupon = couponStore.getState().coupon;
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }

    public async getAllCouponsByCategory(category:string): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.companyFindCouponsByCategoryUrl+category); // waiting//
                const coupon = response.data;
            // if there are no products in Redux global state go to server:
            // if (couponStore.getState().coupon.length === 0) {
                
            //     // Redux - update global state about fetching all companies
            //     // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                // couponStore.dispatch(fetchCouponAction(coupon));
            return coupon;
            // }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }
    public async getAllCouponsByPrice(price:any): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.companyFindCouponsByMaxPriceUrl+price); // waiting//
            const coupon = response.data;
            // if there are no products in Redux global state go to server:
            // if (couponStore.getState().coupon.length === 0) {
               
            //     // Redux - update global state about fetching all companies
            //     // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
            //     couponStore.dispatch(fetchCouponAction(coupon));
            return coupon;
            // }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }

    public async getDetails(): Promise<CompanyUserModel>{
        try {
            const response = await axios.get<CompanyUserModel>(appConfig.companyGetDetailsUrl); 
            const company = response.data;
            companiesStore.dispatch(detailsCompanyAction(company)) ;
            // console.log('customer: ', customer)
            return company;
            
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }

}
}
const companyService = new CompanyService();
export default companyService;

