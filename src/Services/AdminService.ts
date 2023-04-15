import axios from "axios";
import CompanyUserModel from "../Models/CompanyUserModel";
import { addCompanyAction, companiesStore, deleteCompanyAction, fetchCompanyAction, updateCompanyAction } from "../Redux/CompanyState";
import appConfig from "../Utils/AppConfig";
import authService from "./AuthService";
import CustomerUserModel from "../Models/CustomerUserModel";
import { addCustomerAction, customersStore, deleteCustomerAction, fetchCustomerAction, updateCustomerAction } from "../Redux/CustomerState";

class AdminService{
   
    public async addCompany(company: CompanyUserModel): Promise<any> {

        const response = await axios.post<CompanyUserModel>(appConfig.adminAddCompanyUrl, company);
        const addedCompany = response.data;

        // Redux - update global state about a newly added product
        companiesStore.dispatch(addCompanyAction(addedCompany));

    }
    public async updateCompany(company: CompanyUserModel): Promise<void> {
               
        const response = await axios.put<CompanyUserModel>(appConfig.adminUpdateCompanyUrl, company,{
            headers: {'Content-Type': 'application/json'}
        });
        const updatedCompany = response.data;
        // Redux
        companiesStore.dispatch(updateCompanyAction(updatedCompany));
    }
        
    public async deleteCompany(companyId: number): Promise<void> {
        await axios.delete(appConfig.adminDeleteCompanyUrl + companyId);
        // Redux
        companiesStore.dispatch(deleteCompanyAction(companyId));
    }

    public async getOneCompany(id: number): Promise<CompanyUserModel> {
        return companiesStore.getState().companies.find(p => p.id === id);
    }

    public async getAllCompany(): Promise<CompanyUserModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (companiesStore.getState().companies.length === 0) {
                const response = await axios.get<CompanyUserModel[]>(appConfig.adminGetAllCompaniesUrl); // waiting
                const companies = response.data;
            
                // Redux - update global state about fetching all companies
                // productsStore.dispatch({ type: ProductActionType.FetchProducts, payload: products });
                companiesStore.dispatch(fetchCompanyAction(companies));

            return companies;
            }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }

    }

    //Customer
    public async getOneCustomer(id: number): Promise<CustomerUserModel> {
        return customersStore.getState().customers.find(p => p.id === id);
    }
    public async getAllCustomer(): Promise<CustomerUserModel[]> {
        try {
            // if there are no products in Redux global state go to server:
            if (customersStore.getState().customers.length === 0) {
                const response = await axios.get<CustomerUserModel[]>(appConfig.adminGetAllCustomersUrl); // waiting
                const customers = response.data;
            
                // Redux - update global state about fetching all companies
                customersStore.dispatch(fetchCustomerAction(customers));

            return customers;
            }
        }catch (error: any) {
            console.log(error.response.status);
            if (error.response.status === 401) authService.logout();
        }
    }

    public async addCustomer(customer: CustomerUserModel): Promise<any> {

        const response = await axios.post<CustomerUserModel>(appConfig.adminAddCustomerUrl, customer);
        const addedCustomer = response.data;
        // Redux - update global state about a newly added product
        customersStore.dispatch(addCustomerAction(addedCustomer));
    }
    public async updateCustomer(customer: CustomerUserModel): Promise<void> {
               
        const response = await axios.put<CustomerUserModel>(appConfig.adminUpdateCustomerUrl, customer,{
            headers: {'Content-Type': 'application/json'}
        });
        const updatedCustomer = response.data;
        // Redux
        customersStore.dispatch(updateCustomerAction(updatedCustomer));
    }

    public async deleteCustomer(customerId: number): Promise<void> {
        await axios.delete(appConfig.adminDeleteCustomerUrl + customerId);
        // Redux
        customersStore.dispatch(deleteCustomerAction(customerId));
    }














}

const adminService = new AdminService();
export default adminService;