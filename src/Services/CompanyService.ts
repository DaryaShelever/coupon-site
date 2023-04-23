import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/AppConfig";
import { addCouponAction, couponStore, deleteCouponAction, fetchPersonalCouponAction, updateCouponAction } from "../Redux/CouponState";
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
    public async updateCoupon(couponPersonal: CouponModel): Promise<void> {
        const response = await axios.put<CouponModel>(appConfig.companyUpdateCouponUrl, couponPersonal,{//
            headers: {'Content-Type': 'application/json'}
        });
        const updatedCoupon = response.data;
        couponStore.dispatch(updateCouponAction(updatedCoupon));
    }
        
    public async deleteCoupon(couponId: number): Promise<void> {
        await axios.delete(appConfig.companyDeleteCouponUrl + couponId);//
        couponStore.dispatch(deleteCouponAction(couponId));
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        return couponStore.getState().couponPersonal.find(p => p.id === id);
    }

    public async getAllCoupon(): Promise<CouponModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (couponStore.getState().couponPersonal.length === 0) {
                const response = await axios.get<CouponModel[]>(appConfig.companyFindAllCouponsUrl); // waiting//
                const data = response.data;
                couponStore.dispatch(fetchPersonalCouponAction(data));
            }
            const coupon = couponStore.getState().couponPersonal;
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
            return coupon;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }
    public async getAllCouponsByPrice(price:any): Promise<CouponModel[]> {
        try {
            const response = await axios.get<CouponModel[]>(appConfig.companyFindCouponsByMaxPriceUrl+price); // waiting//
            const coupon = response.data;
            return coupon;
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
            return company;
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }

}
}
const companyService = new CompanyService();
export default companyService;

