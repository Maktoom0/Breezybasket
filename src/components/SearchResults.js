import { useParams } from "react-router-dom";
import { Rate } from "antd";

import './style/search-results.css'
import { useState } from "react";
import Productt from "./Productt";

export default function SearchResults({productsJSON}){
    const { searchFor, category } = useParams();
    const [filterV, setFilterV] = useState(false)

    const withoutSpecChars = (stringToRemoveFrom) => stringToRemoveFrom.split('').filter(char => (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char === ' ').join('').toLowerCase();
    let searchForArray = withoutSpecChars(searchFor).split(" ");

    searchForArray = searchForArray.filter(word => word !== "the" && word !== "flavor" && word !== "" && word !== " ")

    let matchIds = []
    for (var word of searchForArray){
        productsJSON.filter(product => withoutSpecChars(product.summary).toLowerCase().includes(word) ? matchIds.push(product) : null)
    }

    let productsPrices = []; 
    let productsTrademarks = []; 
    let productsCategories = []; 

    matchIds.map(product => {
        let priceAfterOffer_ = (Math.floor((product.price - (product.price * (product.offer / 100))) * 100) / 100).toFixed(2);
        productsCategories.push(product.id.split("-")[0])
        productsPrices.push(product.offer !== 0 ? priceAfterOffer_ : product.price);
        productsTrademarks.push(product.trademark);

    })
    const mostExpPrice = Math.max(...productsPrices)
    productsTrademarks = Array.from(new Set(productsTrademarks))
    productsCategories = Array.from(new Set(productsCategories))

    productsCategories = ["all", ...productsCategories]
    productsTrademarks = ["all", ...productsTrademarks]

    const [filterMethod, setFilterMethod] = useState({
        category: productsCategories.includes(category) ? category : "all",
        trademark: "all",
        rangeStart: 0,
        rangeEnd: mostExpPrice,
        evalWanted: "all",
        offers: "all products"
    })

    const evalsArray = ["all", 5, 4, 3]
    const offersArray = ["all products", "offered products"]

    matchIds = Array.from(new Set(matchIds));
    matchIds = matchIds.filter(product => filterMethod.category === "all" ? matchIds : product.id.split("-")[0] === filterMethod.category)
    matchIds = matchIds.filter(product => filterMethod.trademark === "all" ? matchIds : product.trademark === filterMethod.trademark)
    matchIds = matchIds.filter(product => product.offer !== 0 
        ? (Math.floor((product.price - (product.price * (product.offer / 100))) * 100) / 100) >= filterMethod.rangeStart && (Math.floor((product.price - (product.price * (product.offer / 100))) * 100) / 100) <= filterMethod.rangeEnd
        : product.price >= filterMethod.rangeStart && product.price <= filterMethod.rangeEnd
    )
    matchIds = matchIds.filter(product => filterMethod.evalWanted === "all" ? matchIds : product.evaluation >= filterMethod.evalWanted)
    matchIds = matchIds.filter(product => filterMethod.offers === "all products" ? matchIds : product.offer !== 0)

    return (
        <div className="results">
            <span className="flex align-items">
                <p>{`results: ${matchIds.length} item`}</p>
                <button onClick={() => {setFilterV(!filterV)}} className="btn pointer">filter <i className="fa-solid fa-sort"></i></button>
            </span>
            <div className="flex">
                <div>
                    <div className={`filter-section ${filterV === true ? "visible" : ""}`}>
                        <button className="btn pointer absolute" onClick={() => {setFilterV(false)}}><i className="fa-solid fa-circle-xmark"></i></button>
                        <div>
                            <p>category</p>
                            <ul>
                                {productsCategories.map(category_ => <li>
                                    <div style={{border: filterMethod.category === category_ ? "none" : "1px black solid"}}><i className="fa-solid fa-square-check" style={{opacity: filterMethod.category === category_ ? "1" : "0"}}></i></div>
                                    <button onClick={() => {setFilterMethod({...filterMethod, category: category_}); console.log("set category")}} className="btn pointer">{category_}</button></li>)}
                            </ul>
                        </div>

                        <div>
                            <p>brand</p>
                            <ul>
                                {productsTrademarks.map(trademark_ => <li>
                                    <div style={{border: filterMethod.trademark === trademark_ ? "none" : "1px black solid"}}><i className="fa-solid fa-square-check" style={{opacity: filterMethod.trademark === trademark_ ? "1" : "0"}}></i></div>
                                    <button onClick={() => {setFilterMethod({...filterMethod ,trademark: trademark_})}} className="btn pointer">{trademark_}</button></li>)}
                            </ul>
                        </div>

                        <div>
                            <p>price range</p>
                            <div>
                                <p>from: </p>
                                <div className="flex">
                                    <input type="range" 
                                        min={0} 
                                        max={mostExpPrice} 
                                        value={filterMethod.rangeStart}
                                        onChange={(event) => {
                                            setFilterMethod({...filterMethod, rangeStart: event.target.value})}} 
                                        />
                                    <p>{`${filterMethod.rangeStart} EGP`}</p>
                                </div>
                            </div>

                            <div>
                                <p>to: </p>
                                <div className="flex">
                                    <input type="range" 
                                        min={0} 
                                        max={mostExpPrice} 
                                        value={filterMethod.rangeEnd}
                                        onChange={(event) => {
                                            setFilterMethod({...filterMethod ,rangeEnd: event.target.value})}} 
                                        />
                                    <p>{`${filterMethod.rangeEnd} EGP`}</p>
                                </div>
                            </div>
                        </div>
                    <div>
                        <p>rate</p>
                        <ul>
                            {evalsArray.map(evall => {
                                return (
                                    <li>
                                        <div style={{border: filterMethod.evalWanted === evall ? "none" : "1px black solid"}}><i className="fa-solid fa-square-check" style={{opacity: filterMethod.evalWanted === evall ? "1" : "0"}}></i></div>
                                        {evall === "all" ? null : <Rate defaultValue={evall} disabled className="pointer" />}
                                        <button className="btn pointer" onClick={() => {
                                            setFilterMethod({...filterMethod, evalWanted: evall})
                                        }}>{`${evall} ${evall === "all" || evall === 5 ? "" : "& up"}`}</button>
                                    </li>
                                )
                            } 
                                
                            )}
                        </ul>
                    </div>

                    <div>
                        <p>others</p>
                        <ul>
                            {offersArray.map(offer => 
                                <li>
                                    <div style={{border: filterMethod.offers === offer ? "none" : "1px black solid"}}><i className="fa-solid fa-square-check" style={{opacity: filterMethod.offers === offer ? "1" : "0"}}></i></div>
                                    <button className="btn pointer" onClick={() => {setFilterMethod({...filterMethod, offers: offer})}}>{offer}</button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="flex full-width"><button className="btn pointer" onClick={() => {
                        setFilterMethod({
                            category: productsCategories.includes(category) ? category : "all",
                            trademark: "all",
                            rangeStart: 0,
                            rangeEnd: mostExpPrice,
                            evalWanted: "all",
                            offers: "all products"
                        })
                    }}>default filters <i className="fa-solid fa-rotate-right"></i></button></div>
                </div>
                </div>
                
                <div className="result-products-wrapper">
                    <div className="result-products flex full-width">
                        {matchIds.map(product => <Productt product={product} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};