import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../Models/CouponModel";
import companyService from "../../Services/CompanyService";
import notificationService from "../../Services/NotificationService";
import Category from "../../Models/Category";

function AddCoupons(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CouponModel>();
    const navigate = useNavigate();



    async function send(coupon: CouponModel) {
        try {
            await companyService.addCoupon(coupon);
            notificationService.success("Product Added");
            // navigate back to products
            navigate("/company/coupons");

        } catch (error: any) {
            console.dir(error);
            notificationService.error(error);
        }
    }
    return (  
        <div className="AddCoupon ">
                <h2>Add Coupon</h2>
            <form>
                    <label htmlFor="title">Title: </label>
                    <input type="text"  {...register("title")} />
                    <span>{formState.errors.title?.message}</span>
    
                    <label htmlFor="description">Description: </label>
                    < input type="text" {...register("description")} />
                    <span>{formState.errors.description?.message}</span> 
                   
                    <label htmlFor="amount">Amount: </label>
                    < input type="number" {...register("amount")} />
                    <span>{formState.errors.amount?.message}</span> 

                    <label htmlFor="price">Price: </label>
                    < input type="number" {...register("price")} />
                    <span>{formState.errors.price?.message}</span> 

                    <label htmlFor="image">Image: </label>
                    < input type="" {...register("image")} />
                    {/*  */}
                    <span>{formState.errors.image?.message}</span> 

                    
                    <select defaultValue=""  required {...register("category")}> 
                        <option disabled value="">Select Category </option>
                        <option value={Category.FOOD}>FOOD </option>
                        <option value={Category.ELECTRICITY}>ELECTRICITY </option>
                        <option value={Category.RESTAURANT}>RESTAURANT </option>
                        <option value={Category.VACATION}>VACATION </option>
                    </select>
                    <span>{formState.errors.category?.message}</span> 

                    <label htmlFor="startDate">Start Date: </label>
                    < input type="date" {...register("startDate")} />
                    <span>{formState.errors.category?.message}</span> 

                    <label htmlFor="endDate">End Date: </label>
                    < input type="date" {...register("endDate")} />
                    <span>{formState.errors.endDate?.message}</span> 



                <button onClick={handleSubmit(send)}>Add</button>
            </form>
        </div>
    );
}

export default AddCoupons;
