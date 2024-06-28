import { useState } from "react";

import { ProductsCartNumberArray, ProductsFavArray, Comments} from './productsCartContext'

export default function ProductsCartNumProvider({children}){
    const [productsArray, setProductsArray] = useState([]);
    const [favArray, setFavArray] = useState([]);
    const [comments, setComments] = useState([]);

    return (
        <ProductsCartNumberArray.Provider value={{productsArray, setProductsArray}}>
            <ProductsFavArray.Provider value={{favArray, setFavArray}}>
                <Comments.Provider value={{comments, setComments}}>
                    {children}
                </Comments.Provider>
            </ProductsFavArray.Provider>
        </ProductsCartNumberArray.Provider>
    );
};