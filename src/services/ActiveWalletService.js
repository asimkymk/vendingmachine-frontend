import BaseService from "./BaseService";

export default class ActiveWalletService {
    async getActiveWallet() {
       return fetch(BaseService.BASE_URL+'/activeWallet').then(res=>res.json());
    }

    async updateUnitAmounts(unitId){
        return fetch(BaseService.BASE_URL+'/units/activeWallet/'+unitId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json(); // Yanıtı JSON olarak çözümle
            })
            
    }
    async updateWallet(data){
      return fetch(BaseService.BASE_URL+'/activeWallet', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Yanıtı JSON olarak çözümle
          })
    
          
    }
    async refundWallet(data){
      return fetch(BaseService.BASE_URL+'/units/activeWallet/refund', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Yanıtı JSON olarak çözümle
          })
    
          
    }

    async buyProduct(data){
      return fetch(BaseService.BASE_URL+'/activeWallet/buyProduct', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Yanıtı JSON olarak çözümle
          })
    
          
    }
}