import React from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import ActiveWalletService from "../services/ActiveWalletService";
function Unit(props) {

    function addToWallet(){
        const activeWalletService = new ActiveWalletService();
        const reqData = {
            "add":props.unit.unitPrice
          };

        activeWalletService.updateWallet(reqData).then(data => {
            console.log('PUT işlemi başarılı:', data);
            
          })
          .catch(error => {
            console.error('PUT işlemi sırasında hata oluştu:', error);
          });
    }
    
    function addtoUnit(){
        const activeWalletService = new ActiveWalletService();
        activeWalletService.updateUnitAmounts(props.unit.id.toString()).then(data => {
            console.log('PUT işlemi başarılı:', data);
            addToWallet();
          })
          .catch(error => {
            console.error('PUT işlemi sırasında hata oluştu:', error);
          });
    }

    if(props.unit){
        return (
            <button className="btn-custom btn-custom-success" onClick={addtoUnit}  >{props.unit.unitPrice}₺ Add</button>
        )
    }
    else {
        return (
            <></>
        )
    }
        
    
    

}
export default  Unit;