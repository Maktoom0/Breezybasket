import { useParams } from "react-router-dom";
import Product from "./Product";

import './style/search-results.css'
import { useState } from "react";

export default function SearchResults({productsJSON}){
    const { searchFor, category } = useParams();


    const withoutSpecChars = (stringToRemoveFrom) => stringToRemoveFrom.split('').filter(char => (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char === ' ').join('').toLowerCase();
    let searchForArray = withoutSpecChars(searchFor).split(" ");
    // console.log("searched for : " + typeof searchForArray)

    // let matchIds = []
    // for (let word of searchForArray) {
    //     for (let product of productsJSON){
    //         for (let ii of withoutSpecChars(product.summary).split(" ")){
    //             if (word === ii){matchIds.push(product.id)}
    //         }
    //         }
    //     }

    searchForArray = searchForArray.filter(word => word !== "the" && word !== "flavor" && word !== "" && word !== " ")

    let matchIds = []
    for (var word of searchForArray){
        productsJSON.filter(product => withoutSpecChars(product.summary).toLowerCase().includes(word) ? matchIds.push(product) : console.log(`product: ${product.id} doesn't have the search word ${word}`))
    }

    const productsPrices = []; 
    let productsTrademarks = []; 

    matchIds.map(product => {
        productsPrices.push(product.price);
        productsTrademarks.push(product.trademark);

    })
    const mostExpPrice = Math.max(...productsPrices)
    productsTrademarks = Array.from(new Set(productsTrademarks))

    // matchIds.map(produ)
    console.log(`trademarks: ${productsTrademarks} \nbiggest price: ${mostExpPrice}`)

    const filterMethod = useState({
        trademark: "all",
        rangeStart: 0,
        rangeEnd: mostExpPrice,
        evalWanted: "all"
    })
    // [trademarks, rangeStart, rangeEnd, eval]

    // matchIds = matchIds.filter(product => category === "all" ? matchIds : product.id.split("-")[0] === category)

    matchIds = Array.from(new Set(matchIds));
    matchIds.filter(product => filterMethod.trademark === "all" ? matchIds : product.trademark === filterMethod.trademark)

    const searchProductsElements = matchIds.map(product => <Product id={product.id} srcs={product.srcs} title={product.title} summary={product.summary} price={product.price} offer={product.offer} evaluation={product.evaluation} evaluationCount={product.evaluationCount} quantity={product.quantity} />)

    return (
        <div>
             {/* className="flex" style={{justifyContent: "space-evenly"}} */}
            <p style={{fontSize: "2.3rem", margin: "10px 0px 0px 20px"}}>Results</p>
            <div className="results-container flex">
                <div className="results-products">
                    <div className="search-product-container flex main-products">{searchProductsElements}</div>
                    <hr />
                    <p style={{fontSize: "2.3rem", margin: "10px 0px 0px 20px"}}>{category === "all" ? "" : "Products from same category"}</p>
                    <div className="search-product-container flex same-category-products"> {category === "all" ? <></> : productsJSON.filter(product => product.id.split("-")[0] === category).map(product => <Product id={product.id} srcs={product.srcs} title={product.title} summary={product.summary} price={product.price} offer={product.offer} evaluation={product.evaluation} evaluationCount={product.evaluationCount} quantity={product.quantity} />)}</div>
                    <div className="search-product-container flex high-offer-products"></div>
                    <div className="search-product-container flex high-evaluation-products"></div>

                </div>


                <div className="filter-results-products-container right">
                    <div className="filter-container">
                        <p>trademark</p>

                    </div>
                </div>
            </div>
        </div>
    );
};