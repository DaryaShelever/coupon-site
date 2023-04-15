import ClientType from "./ClientType";

class CompanyUserModel{
    constructor (
        public id: number,
        public name: string,
        public email: string,
        public password: string,
		public clientType: ClientType
        
    ){}
}

export default CompanyUserModel;
