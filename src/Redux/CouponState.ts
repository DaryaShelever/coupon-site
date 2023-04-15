import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

// 1. Customers state - the data we need at global application level
export class CouponState {
    public coupon: CouponModel[] = [];
}

// 2. Action Types - list of actions - enum
export enum CouponActionType {
    FetchCoupon,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon, 
    PurchaseCoupon
}

// 3. Action - an interface describing a single command
export interface CouponAction {
    type: CouponActionType; // action type
    payload: any; // action data
}

// 4. action creators - functions to create action objects
export function fetchCouponAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FetchCoupon, payload: coupons };
}

export function addCouponAction(coupons: CouponModel): CouponAction {
    return { type: CouponActionType.AddCoupon, payload: coupons };
}

export function updateCouponAction(coupons: CouponModel): CouponAction {
    return { type: CouponActionType.UpdateCoupon, payload: coupons };
}

export function deleteCouponAction(id: number): CouponAction {
    return { type: CouponActionType.DeleteCoupon, payload: id };
}

export function purchaseCouponAction (id: number): CouponAction{
    return{ type: CouponActionType.PurchaseCoupon, payload:id}
}


// 5. reducer - a single function performing any of the above actions
export function productReducer(currentState: CouponState = new CouponState(), action: CouponAction): CouponState {
    const newState = { ...currentState }; // duplicate current state

    switch (action.type) {
        case CouponActionType.FetchCoupon: // here payload is all Coupon
            newState.coupon = action.payload;
            break;
        case CouponActionType.AddCoupon: // here payload is a single product to add
            newState.coupon.push(action.payload);
            break;
        case CouponActionType.UpdateCoupon: // here payload is a single product to update
            const indexToUpdate = newState.coupon.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.coupon[indexToUpdate] = action.payload;
            break;
        case CouponActionType.DeleteCoupon: // here payload is an id of product to delete
            const indexToDelete = newState.coupon.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.coupon.splice(indexToDelete, 1);
            break;
        case CouponActionType.PurchaseCoupon: // here payload is a single product to add
            // newState.coupon = action.payload;
            newState.coupon.push(action.payload);
            break;
    }

    return newState;
}

// 6 Companies Store object to manage all Companies state

export const couponStore = createStore(productReducer);

