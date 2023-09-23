import React from "react";
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import ProductService from "../services/ProductService";
import ActiveWalletServices from "../services/ActiveWalletService";
import UnitService from "../services/UnitService";
function Product(props) {



    function buyProduct(){
        const activeWalletService = new ActiveWalletServices();
        
        activeWalletService.buyProduct(props.product).then(
            (result) => {
                if(result.success){
                    const unitService = new UnitService();
                    unitService.buyProduct().then(
                        (result) => {
                            if(result.success){
                                const productService = new ProductService();
                                productService.buyProduct(props.product.id).then(
                                    (result) => {
                                        // işlemler ok
                                    },
                                    (error) => {
                                        // hata işlemleri
                                    }
                                )
                            }
                        },
                        (error) => {
                            //hata işlemleri
                        }
                    )
                }
            },
            (error) => {
                // hata işlemleri
            }
        )
    }
    
    if(props.product){
        return (
            <div class="col-xs-4 col-sm-6 col-md-3 col-lg-3">
                
                    <div class="card-flyer">
                        <div class="text-box">
                            <div class="image-box">
                                <img src={props.product.productImageUrl} alt="" />
                            </div>
                            <div class="text-container">
                                <h6>{props.product.productName}</h6>
                               
                            </div>

                        </div>
                        <div className="card-foot">
                            <div> <p>{props.product.productAmount} pieces left </p></div>

                            {props.product.productAmount >0 ?  <div><button className="btn-custom btn-custom-success" onClick={buyProduct}>{props.product.productPrice}₺ Buy</button></div> :  <div><button className="btn-custom btn-custom-danger">{props.product.productPrice}₺ Buy</button></div>}
                           
                        </div>
                    </div>
                
            </div>
        )
    }
    else {
        return (
            <div class="col-xs-4 col-sm-6 col-md-3 col-lg-3">
                
                    <div class="card-flyer">
                        <div class="text-box">
                            <div class="image-box">
                            <Skeleton baseColor="#d3cce3" variant="rectangular" width={200} height={190} style={{borderRadius: 5,marginTop:7}} />
                            </div>
                            <div class="text-container">
                                <h6><Skeleton baseColor="#d3cce3" variant="text" width={200} height={20}  count={1}/></h6>
                                
                            </div>

                        </div>

                        <div className="card-foot">
                            <div> <p><Skeleton baseColor="#d3cce3" variant="text" width={100} height={20}  count={1}/> </p></div>
                            <div><Skeleton baseColor="#d3cce3" variant="rectangular" width={100} height={50} style={{borderRadius: 5,marginRight:10}}/></div>
                        </div>
                    </div>
                
            </div>
        )
    }
        
    
    

}
export default  Product;