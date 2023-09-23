import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Product from "../components/Product";
import ActiveWalletService from "../services/ActiveWalletService";
import UnitService from "../services/UnitService";
import Unit from "../components/Unit";

function Units() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [units, setUnit] = useState([]);

    useEffect(() => {
        const unitService = new UnitService();
        unitService.getUnits().then(
            (result) => {
                if (result.success) {
                    if (result.data) {
                        setIsLoaded(true);
                        setUnit(result.data);
                        setError(false);
                    }
                    else {
                        setIsLoaded(true);
                        setError(error)
                    }
                } else {
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
        return <>{units.map(unit => (

            <Unit unit={unit} key={unit.id}></Unit>
        ))}</>

    }

}
export default Units;