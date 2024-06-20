import { useContext, useEffect, useState } from "react";
import { ProductsCartNumberArray } from "./productsCartContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";

import './style/cart.css'
import { Rate } from "antd";

function Cart({productsJSON}) {
    // const [quantity, setQuantity] = useState("quanity");
    const { productsArray, setProductsArray } = useContext(ProductsCartNumberArray);
    const proArray = localStorage.getItem('productsCartArray')
    const proArr = proArray ? proArray : [];
    // const myVariable = importedValue ? importedValue : [];
    // proArr === null ? proArr = [] : proArr = proArr
    const addedProducts = productsJSON.filter((product) => proArr.includes(product.id))
    
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
    console.log(`final proce: ${finalPriceSum}`)

    const addedProductsElements = addedProducts.map((product) => {
        const imagesArray = product.srcs.split(" ")
        const priceAfterOffer = product.price - (product.price * (product.offer / 100));
        // const quantityArray = Array.from({ length: product.quantity }, (_, i) => i + 1);
        // console.log(quantityArray);
        return (
            <div key={product.id} className="added-product flex align-items">
                <Swiper 
                    modules={[Navigation, Autoplay]}
                    autoplay={{delay: 5000}}
                    navigation 
                    className="added-product-swiper full-height"
                    style={{width: "20%"}}
                >
                    {imagesArray.map((imageSrc) => <SwiperSlide style={{justifyContent: "center"}} className="full-width flex align-items"><img src={imageSrc} title={`${product.title} | Image: ${imagesArray.indexOf(imageSrc)}`} alt={product.title} /></SwiperSlide>)}
                </Swiper>

                <a href={`product/${product.id}`} className="added-product-details" style={{width: "50%", marginLeft: "20px"}}>
                    <p className="added-product-title">{product.title}</p>
                    <p className="added-product-summary" title={product.summary}>{product.summary}</p>
                    <div className="flex align-items">
                        <p className="added-product-product-price" style={{fontSize: "1.6rem", textTransform: "uppercase"}}>{product.offer !== 0 ? priceAfterOffer + "egp" : ""}</p>
                        <p className="added-product-product-price-offer" style={{textDecoration: product.offer !== 0 ? "line-through" : "none", fontSize: product.offer !== 0 ? "1.2rem" : "1.6rem", marginLeft: product.offer !== 0 ? "20px" : "0px", textTransform: "uppercase"}}>{product.price}egp</p>
                        <p className="offer-displayer" style={{padding: product.offer === 0 ? 0 : "5px 20px"}}>{product.offer === 0 ? "" : product.offer + "% off"}</p>
                    </div>
                    <p style={product.quantity <= 10 ? {color: "red"} : {color: "orange"}}>{product.quantity <= 10 ? `Only ${product.quantity} units left` : "In stock"}</p>

                    <div className="added-product-rate-container flex align-items">
                        <Rate defaultValue={product.evaluation} allowHalf disabled />
                        <p className="added-product-evaluation" style={{marginLeft: "20px"}}>{`${product.evaluation}/5`}</p>
                    </div>
                </a>
                <div className="right-container flex">
                    {/* <div>
                        <span className="quantity-nav block relative">
                            <div className="flex align-items">
                                <p className="quantity-number">{quantity}</p>
                                <i className="fa-solid fa-chevron-down"></i> 
                            </div>
                            <div className="quantity-dropdown absolute full-width">{quantityArray.map((number) => <button onClick={() => {setQuantity(number)}} className="full-width btn">{number}</button>)}</div>
                        </span>
                    </div> */}
                    <button className="btn remove-from-cart block pointer flex align-items full-width">remove from cart <i className="fa-solid fa-trash"></i></button>
                    <button className="btn buy-now block pointer flex align-items full-width">buy now <i className="fa-regular fa-circle-check"></i></button>
                </div>
            </div>
        )})

        console.log(`form cart ==========> ${addedProductsElements}`)
        if (addedProducts) {
            console.log("yahooooooooooooo");
        } else {
            console.log("nooooooooooooo");
        }

        console.log(`products array: ${addedProducts}`)

    return (
        <div className="cart">
            <p style={{fontSize: "3rem", textTransform: "capitalize", margin: "10px 20px"}}>your cart</p>
            {addedProducts.length > 0 ? <>
            <div className="cart-products-details full-width flex align-items">
                <p style={{marginLeft: "30px"}}>{`total: ${finalPriceSum}EGP`}</p>
                {finalPriceSum >= 100 

                    ? <p style={{zIndex: "15", marginLeft: "50px"}} className="free-shipping">
                        shipping: free shipping 
                        <span>
                            <span className="sent-after-shipping pointer relative">why?</span>
                            <div className="absolute sent" style={{marginLeft: "110px"}}>
                                <div className="arrow absolute"></div>
                                <p>{`Your cart total price is ${finalPriceSum === 100 ? "" : "more than"} 100EGP`}</p>
                            </div>
                        </span>
                    </p>
                    
                    : <p style={{zIndex: "15", marginLeft: "50px"}} className="paid-shipping">
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
            </> : <div>Your cart is empty</div>}
            
        </div>
    )
}

export default Cart