import BaseService from "./BaseService";

export default class ActiveWalletService {
    async getActiveWallet() {
       return fetch(BaseService.BASE_URL+'/units/activeWallet').then(res=>res.json());
       
    }
}