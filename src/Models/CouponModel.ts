import Category from "./Category";

class CouponModel{
    constructor (
        public id: number,
        public title: string,
        public description: string,
        public startDate: string,
        public endDate: string,
        public amount: number,
        public price: number ,
        public image: string,
		public category: Category
        
    ){}   
}
export default CouponModel;
