import "./Home.css"

function Home(): JSX.Element {
    return (
        <div className="Home">
           {/* <img src={'https://i.pinimg.com/564x/00/d3/e8/00d3e8c3b6149614367472d65cb40c6f.jpg'} alt={'heh'}/> */}
            <h1 className="description">  Description of the project:  </h1>
            <p className="main Box">The project is a coupon management system that allows companies to create and manage coupons, and customers to purchase them. The system has restrictions on the quantity and validity period of coupons, as well as the number of coupons each customer can purchase. </p>
            <div className="roles ">
                <div className="levels">
                The system provides different levels of access depending on the user's role:
                </div>
            <   div className="role ">
                    <div className="role-1">
                    <h3>Admin </h3>
                    <p>An administrator can manage lists of companies and customers.</p>
                </div>
                <div  className="role-1">
                    <h3>Company</h3>
                    <p>Companies can create and manage lists of coupons associated with their company.</p>
                
                </div>
                <div  className="role-1">
                    <h3>Customer</h3>
                    <p> Customers can view and purchase coupons, as well as view their purchase history.</p>
                </div>
                </div>
            </div>
            <div className="end Box">
                As a result, the project represents an effective solution for coupon management that is convenient for both companies and customers.
            </div>
        </div>
    );
}

export default Home;
