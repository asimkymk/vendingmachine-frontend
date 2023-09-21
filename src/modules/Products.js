import React, { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import Product from "../components/Product";

function Products() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productService = new ProductService();
        productService.getAllProducts().then(
            (result) => {
                setIsLoaded(true);
                setProducts(result);
                setError(false);
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
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
            </div>
        </div>
    </div>
        }
    else {
        return <div id="cards_landscape_wrap-2">
            <div class="container">
                <div class="row">
                    {products.map(product => (

                        <Product product={product} key={product.id}></Product>
                    ))}
                </div>
            </div>
        </div>
    }

}
export default Products;