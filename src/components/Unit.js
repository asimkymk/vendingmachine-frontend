import React from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import ActiveWalletService from "../services/ActiveWalletService";
function Unit(props) {

  function addToWallet() {
    const activeWalletService = new ActiveWalletService();
    const reqData = {
      "add": props.unit.unitPrice
    };

    activeWalletService.updateWallet(reqData).then((result) => {
      // işlemler ok
    },
      (error) => {
        // hata işlemleri
      });
  }

  function addtoUnit() {
    const activeWalletService = new ActiveWalletService();
    activeWalletService.updateUnitAmounts(props.unit.id.toString()).then((result) => {
      if(result.success){
        addToWallet();
      }
    },
      (error) => {
        // hata işlemleri
      });
  }

  if (props.unit) {
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
export default Unit;