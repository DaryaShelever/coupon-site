class AppConfig{
    public loginUrl = "http://localhost:8080/auth/login";
    //customer url
    // public customerPurchaseCouponUrl = "http://localhost:8080/api/customer/purchase/";//1
    // public customerGetDetailsUrl= "http://localhost:8080/api/customer/detailes/";
    // public customerFindCouponsUrl= "http://localhost:8080/api/customer/all-customer-coupons/";
    // public customerFindCouponsByMaxPriceUrl="http://localhost:8080/api/customer/all-customer-coupons/max-price?maxPrice=";//12
    // public customerFindCouponsByCategoryUrl="http://localhost:8080/api/customer/all-customer-coupons/category?category=";//FOOD
    // public getAllCouponsUrl="http://localhost:8080/api/customer/all-coupons/";
    
    // //admin url
    public adminUpdateCustomerUrl = "http://localhost:8080/api/Admin/Customer/update";
    public adminAddCustomerUrl = "http://localhost:8080/api/Admin/Customer/add";
    public adminGetCustomerUrl = "http://localhost:8080/api/Admin/Customer/getOne/";//1  //GET
    public adminDeleteCustomerUrl = "http://localhost:8080/api/Admin/Customer/delete/";//1  //DELETE
    public adminGetAllCustomersUrl = "http://localhost:8080/api/Admin/Customer/getAll";

    public adminUpdateCompanyUrl = "http://localhost:8080/api/Admin/Company/update";
    public adminAddCompanyUrl ="http://localhost:8080/api/Admin/Company/add";
    public adminGetCompanyUrl = "http://localhost:8080/api/Admin/Company/getOne";//1  //GET
    public adminDeleteCompanyUrl = "http://localhost:8080/api/Admin/Company/delete/";//1  //DELETE
    public adminGetAllCompaniesUrl = "http://localhost:8080/api/Admin/Company/getAll";
    
    //company url
    public companyAddCouponUrl="http://localhost:8080/api/Company/Coupon/add";//POST
    public companyUpdateCouponUrl="http://localhost:8080/api/Company/Coupon/update";//PUT
    public companyGetDetailsUrl ="http://localhost:8080/api/Company/Details";
    public companyFindAllCouponsUrl = "http://localhost:8080/api/Company/Coupon/getAll";
    public companyFindCouponsByMaxPriceUrl = "http://localhost:8080/api/Company/Coupon/getUpToMaxPrice?maxPrice=";//2
    public companyFindCouponsByCategoryUrl="http://localhost:8080/api/Company/Coupon/getByCategory?category=";//FOOD
    public companyDeleteCouponUrl = "http://localhost:8080/api/Company/Coupon/delete/";//6

    //customer url
    public customerGetDetailsUrl= "http://localhost:8080/api/Customer/Details";
    public customerGetCouponsUrl= "http://localhost:8080/api/Customer/Coupons";
    public customerGetCouponsUpToMaxPriceUrl="http://localhost:8080/api/Customer/Coupons/UpToMaxPrice?maxPrice="//12
    public customerGetCouponsByCategoryUrl="http://localhost:8080/api/Customer/Coupons/ByCategory?category=";//FOOD
    public customerPurchaseCouponUrl = "http://localhost:8080/api/Customer/Coupon/Purchase?couponId=";//1
    public getAllCouponsUrl="http://localhost:8080/api/Customer/AllCoupons";
    public customerGetAllCouponsUpToMaxPriceUrl="http://localhost:8080/api/Customer/AllCoupons/UpToMaxPrice?maxPrice="//12
    public customerGetAllCouponsByCategoryUrl="http://localhost:8080/api/Customer/AllCoupons/ByCategory?category=";//FOOD
    



    }
    const appConfig = new AppConfig();
    
    export default appConfig;