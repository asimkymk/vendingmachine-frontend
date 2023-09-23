import BaseService from "./BaseService";

export default class SupplierService {
    async validateToken(token) {
        return fetch(BaseService.BASE_URL + '/supplier/validateToken', {
            headers: {
                'Authorization': token
            }
        }).then(res => res.json());

    }

    async login(data) {
        return fetch(BaseService.BASE_URL + '/supplier/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json());


    }

    async deleteProduct(token, id) {
        return fetch(BaseService.BASE_URL + `/supplier/products/${id}`, {
            headers: {
                'Authorization': token
            },
            method: 'DELETE',
        }).then(res => res.json());
    }

    async deleteUnit(token, id) {
        return fetch(BaseService.BASE_URL + `/supplier/units/${id}`, {
            headers: {
                'Authorization': token
            },
            method: 'DELETE',
        }).then(res => res.json());
    }
    async updateProduct(token, id,data) {
        return fetch(BaseService.BASE_URL + `/supplier/products/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json());
    }
    
    async updateUnit(token, id,data) {
        return fetch(BaseService.BASE_URL + `/supplier/units/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json());
    }

    async addProduct(token,data){
        return fetch(BaseService.BASE_URL +'/supplier/products', {
            method: 'POST',
            headers: {
                'Authorization': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
    }
    async addUnit(token,data){
        return fetch(BaseService.BASE_URL +'/supplier/units', {
            method: 'POST',
            headers: {
                'Authorization': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
    }

    async getTotalRevenue(token){
        return fetch(BaseService.BASE_URL +'/supplier/units/info', {
            method: 'GET',
            headers: {
                'Authorization': token,
              'Content-Type': 'application/json',
            }
          })
          .then(response => response.json())
    }

    async collectAllMoney(token){
        return fetch(BaseService.BASE_URL +'/supplier/units/collectAllMoney', {
            method: 'PUT',
            headers: {
                'Authorization': token,
              'Content-Type': 'application/json',
            }
          })
          .then(response => response.json())
    }

}