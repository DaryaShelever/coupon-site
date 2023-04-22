import {useEffect} from 'react'
import { fetchCompanyAction } from '../../Redux/CompanyState';
import adminService from '../../Services/AdminService';
import authService from '../../Services/AuthService';
import notificationService from '../../Services/NotificationService';
import AuthMenu from "../AuthArea/AuthMenu/AuthMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { fetchCustomerAction } from '../../Redux/CustomerState';

function Layout(): JSX.Element {
    useEffect(() => {
        // console.log(localStorage.getItem("token"));
        doSilentLogin(localStorage.getItem("token"));
        (async () => {
            adminService.getAllCompany().then((arr) => {
                fetchCompanyAction(arr);
            adminService.getAllCustomer().then((arr)=> {
                fetchCustomerAction(arr);
                })
            }, (error) => {
                notificationService.error(error);
            });
        })();
    }, [])

    const doSilentLogin = async (token: string) => {
        await authService.refresh(token);
    }
    return (
        <div className="Layout">
            <header>
                <div className="HeaderContainer">
                    <Header/>
                    <Menu/>
                    <AuthMenu/>
                </div>
            </header>
            <div className="bodyContainer">
                <Routing/>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Layout;
