import React from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
function Unit(props) {
    
    if(props.unit){
        return (
            <button className="btn-custom btn-custom-success">{props.unit.unitPrice}₺ Ekle</button>
        )
    }
    else {
        return (
            <></>
        )
    }
        
    
    

}
export default  Unit;