import BaseService from "./BaseService";

export default class UnitService {
    async getUnits() {
       return fetch(BaseService.BASE_URL+'/units').then(res=>res.json());
       
    }
    async buyProduct(){
        return fetch(BaseService.BASE_URL+'/units/activeWallet/buyProduct',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
             
          }).then(res=>res.json());
      
            
      }
}