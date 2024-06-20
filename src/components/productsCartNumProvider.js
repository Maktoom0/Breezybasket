import { useState } from "react";

import { ProductsCartNumberArray, ProductsFavArray} from './productsCartContext'

export default function ProductsCartNumProvider({children}){
    const [productsArray, setProductsArray] = useState([]);
    const [favArray, setFavArray] = useState([]);

    return (
        <ProductsCartNumberArray.Provider value={{productsArray, setProductsArray}}>
            <ProductsFavArray.Provider value={{favArray, setFavArray}}>
                {children}
            </ProductsFavArray.Provider>
        </ProductsCartNumberArray.Provider>
    );
};