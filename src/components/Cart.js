import { useContext, useEffect, useState } from "react";
import { ProductsCartNumberArray } from "./productsCartContext";

import './style/cart.css'
import { Rate } from "antd";

import ProductsSlider from "./ProductsSlider";
import Message from "./Message";

function Cart({productsJSON}) {
    const [messageV, setMessageV] = useState(false)
    const { productsArray, setProductsArray } = useContext(ProductsCartNumberArray);
    
    useEffect(() => {
        try {
            const proArray = localStorage.getItem('productsCartArray'); if (proArray){setProductsArray(JSON.parse(proArray))}
        } catch (error) {console.log("error while loading cart product: " + error)}
    }, [setProductsArray])

    const addedProducts = productsJSON.filter((product) => productsArray.includes(product.id))
    
    let pricesArray = []
    
    addedProducts.map((product) => {
        var price = 0
        product.offer !== 0 ? price = product.price - (product.price * (product.offer / 100)) : price = product.price
        pricesArray.push(price)
        return price
    })

    let finalPriceSum = 0;
    for (const price of pricesArray){finalPriceSum += price}
    finalPriceSum = Number(finalPriceSum.toFixed(2))

    const removeFromCart = (event) => {
        const productToRemove = event.target.id
        productsArray.splice(productsArray.indexOf(productToRemove), 1);
        setProductsArray(productsArray)
        localStorage.setItem("productsCartArray", JSON.stringify(productsArray))
        setMessageV(true)
        document.querySelector(".cart .message").classList.add("message-activated")
        setTimeout(() => {window.location.reload()}, 2000)

    }

    const addedProductsElements = addedProducts.map((product) => {
        const priceAfterOffer = (product.price - (product.price * (product.offer / 100))).toFixed(2);

        return (
            <div key={product.id} className="added-product flex align-items">
                <div className="image-wrapper full-height flex"><img className="full-height" src={product.srcs.split(" ")[0]} title={product.title} alt={product.title} /></div>
                <a href={`#/product/${product.id}`} className="added-product-details flex align-items full-height">
                    <div>
                        <p className="added-product-title">{product.title}</p>
                        <p className="added-product-summary" title={product.summary}>{product.summary}</p>
                        <div className="price-previewer">
                            <p className="added-product-product-price" style={{fontSize: "1.6rem", textTransform: "uppercase"}}>{product.offer !== 0 ? priceAfterOffer + "egp" : ""}</p>
                            <p className="added-product-price-offer" style={{textDecoration: product.offer !== 0 ? "line-through" : "none", fontSize: product.offer !== 0 ? "1.2rem" : "1.6rem", marginLeft: product.offer !== 0 ? "10px" : "0px", textTransform: "uppercase"}}>{product.price.toFixed(2)}egp</p>
                            <p className="offer-displayer" style={{padding: product.offer === 0 ? 0 : "5px 20px"}}>{product.offer === 0 ? "" : product.offer + "% off"}</p>
                        </div>
                        <p style={product.quantity <= 10 ? {color: "red"} : {color: "orange"}}>{product.quantity <= 10 ? `Only ${product.quantity} units left` : "In stock"}</p>

                        <div className="added-product-rate-container flex align-items">
                            <Rate defaultValue={product.evaluation} allowHalf disabled />
                            <p className="added-product-evaluation" style={{marginLeft: "20px"}}>{`${product.evaluation}/5`}</p>
                        </div>
                    </div>
                </a>
                <div className="right-container flex align-items full-height">
                    <div className="big-btns-container">
                        <button id={product.id} className="btn remove-from-cart pointer align-items full-width" onClick={removeFromCart}>remove from cart <i id={product.id} className="fa-solid fa-trash"></i></button>
                        <button className="btn buy-now pointer align-items full-width">buy now <i className="fa-regular fa-circle-check"></i></button>
                    </div>

                    <div className="small-btns-container">
                        <button id={product.id} className="btn remove-from-cart-small pointer" onClick={removeFromCart}><i id={product.id} className="fa-solid fa-trash"></i></button>
                        <button className="btn buy-now-small pointer"><i className="fa-regular fa-circle-check"></i></button>
                    </div>
                </div>
            </div>
        )})

    let addedProductsTrademarks = []
    let addedProductsIds = []
    addedProducts.map(product => {
        addedProductsTrademarks.push(product.trademark)
        addedProductsIds.push(product.id)
    })
    addedProductsTrademarks = Array.from(new Set(addedProductsTrademarks))

    return (
        <div className="cart">
            <Message>
                {
                    messageV === true
                    ? 
                        <div className="flex align-items">
                            <p>removed from cart</p>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    :
                    null
                }
            </Message>
            <p className="cart-subtitle" style={{fontSize: "3rem", textTransform: "capitalize", margin: "10px 20px"}}>your cart</p>
            {addedProducts.length > 0 ? <>
            <div className="cart-products-details full-width">
                <p style={{marginLeft: "30px"}}>{`total: ${finalPriceSum}EGP`}</p>
                {finalPriceSum >= 100 

                    ? <p className="free-shipping">
                        shipping: free shipping 
                        <span>
                            <span className="sent-after-shipping pointer relative">why?</span>
                            <div className="absolute sent" style={{marginLeft: "110px"}}>
                                <div className="arrow absolute"></div>
                                <p>{`Your cart total price is ${finalPriceSum === 100 ? "" : "more than"} 100EGP`}</p>
                            </div>
                        </span>
                    </p>
                    
                    : <p className="paid-shipping">
                        shipping: 23EGP
                        <span>
                            <span className="sent-after-shipping pointer relative">want free?</span>
                            <div className="absolute sent" style={{marginLeft: "-25px"}}>
                                <div className="arrow absolute"></div>
                                <p>Continue <a href="/" style={{textDecoration: "underline", color: "purple"}}>shopping</a> in breezybasket until reaching 100EGP or more</p>
                            </div>
                        </span>
                    </p>
                }
                <p style={{marginLeft: "30px"}}>{`final: ${finalPriceSum >= 100 ? finalPriceSum : finalPriceSum + 23}`}EGP</p>
                <button className="submit-order-btn btn absolute pointer">cotinue to order<i className="fa-solid fa-arrow-right"></i></button>
            </div>
            {addedProductsElements}
            <div className="full-width line" style={{height: "1px", borderBottom: "2px black solid"}}></div>
            <p className="cart-down-title">products like in your cart</p>
            {addedProductsTrademarks.map(addedProductTrademark => 
                <ProductsSlider productsJSON={productsJSON.filter(product => product.trademark === addedProductTrademark)} sliderTitle={addedProductTrademark} />
            )}
            </> : <div className="no-products full-width flex align-items">no products in the cart <a href="/">shop now!</a></div>}
            
        </div>
    )
}

export default Cart