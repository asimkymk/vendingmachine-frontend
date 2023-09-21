import BaseService from "./BaseService";

export default class ProductService {
    async getAllProducts() {
       return fetch(BaseService.BASE_URL+'/products').then(res=>res.json());
       
    }

    async buyProduct(productId){
        return fetch(BaseService.BASE_URL+'/products/buyProduct/'+productId,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
              
          }).then(res=>res.json());
      
            
      }
}