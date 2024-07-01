import { useParams } from "react-router-dom";
import Productt from "./Productt";

import './style/trademark-products.css'

export default function TrademarkProducts({productsJSON}){
    const { searchFor, category } = useParams();

    const products1 = productsJSON.filter(product => product.trademark === searchFor)
    const products2 = category === "all" ? productsJSON : productsJSON.filter(product => product.id.split("-")[0] === category)

    return (
        <div className="trademark-products">
            <p>{`products for ${searchFor === "none" ? `category "${category}"` : `brand "${searchFor}"`}`}</p>
            <div className="flex">{searchFor === "none" ? products2.map(product => <Productt product={product} />) : products1.map(product => <Productt product={product} />)}</div>
        </div>
    );
};