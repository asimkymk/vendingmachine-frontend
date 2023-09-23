import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Product from "../components/Product";
import ActiveWalletService from "../services/ActiveWalletService";
import Units from "./Units";

function ActiveWallet() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [wallet, setWallet] = useState({});

    function getRefund() {
        const activeWalletService = new ActiveWalletService();
        const reqData = {
            "refundAmount": wallet.walletAmount
        };
        activeWalletService.refundWallet(reqData).then(
            (result) => {
                if (result.success) {
                    const reqWalletData = {
                        "remove": result.data.wallet
                    };
                    activeWalletService.updateWallet(reqWalletData).then();
                }

            },
            (error) => {
                // hata işlemleri
            }
        )
    }

    useEffect(() => {
        const activeWalletService = new ActiveWalletService();
        activeWalletService.getActiveWallet().then(
            (result) => {
                if (result.success) {
                    if (result.data) {
                        setIsLoaded(true);
                        setWallet(result.data);
                        setError(false);
                    }
                    else {
                        setIsLoaded(true);
                        setError(error)
                    }
                }
                else {
                    setIsLoaded(true);
                    setError(error)
                }

            },
            (error) => {
                setIsLoaded(true);
                setError(error)
            }
        )
    })

    if (error) {
        return <div>Şu anda beklenmedik bir hata var. Lütfen daha sonra tekrar deneyiniz.</div>
    }
    else if (!isLoaded) {
        return <div id="cards_landscape_wrap-2">
            <div class="container">
                <div class="row">

                </div>
            </div>
        </div>
    }
    else {
        return <div id="">
            <div class="container">
                <div class="row">
                    <p>There is {wallet.walletAmount}₺ in wallet.</p>
                </div>

                <Units></Units>

            </div>
            <button className="btn-custom btn-custom-danger" onClick={getRefund}>Refund</button>
        </div>
    }

}
export default ActiveWallet;