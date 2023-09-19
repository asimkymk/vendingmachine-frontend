import BaseService from "./BaseService";

export default class ProductService {
    async getAllProducts() {
       return fetch(BaseService.BASE_URL+'/products').then(res=>res.json());
       
    }
}