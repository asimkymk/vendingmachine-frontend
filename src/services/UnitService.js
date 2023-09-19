import BaseService from "./BaseService";

export default class UnitService {
    async getUnits() {
       return fetch(BaseService.BASE_URL+'/units').then(res=>res.json());
       
    }
}