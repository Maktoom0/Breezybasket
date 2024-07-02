import { useContext, useEffect, useState } from "react";
import { ProductsFavArray } from "./productsCartContext";

import './style/cart.css'
import { Rate } from "antd";

import ProductsSlider from "./ProductsSlider";
import Message from "./Message";

function Favorites({productsJSON}) {
    const [messageV, setMessageV] = useState(false)
    const { favArray, setFavArray } = useContext(ProductsFavArray);
    
    useEffect(() => {
        try {
            const proArrayFav = localStorage.getItem('productsFavArray'); if (proArrayFav){setFavArray(JSON.parse(proArrayFav))}
        } catch (error) {console.log("error while loading products: " + error)}
    }, [setFavArray])
    
    const addedProducts = productsJSON.filter(product => favArray.includes(product.id))

    const removeFromFav = (event) => {
      const productToRemove = event.target.id
      favArray.splice(favArray.indexOf(productToRemove), 1);
      setFavArray(favArray)
      localStorage.setItem("productsFavArray", JSON.stringify(favArray))
      setMessageV(true)
      document.querySelector(".cart .message").classList.add("message-activated")
      setTimeout(() => {window.location.reload()}, 2000)

  }

    const addedProductsElements = addedProducts.map((product) => {
        const priceAfterOffer = (product.price - (product.price * (product.offer / 100))).toFixed(2);

        return (
            <div key={product.id} className="added-product flex align-items">
                <div className="image-wrapper full-height flex"><img className="full-height" src={product.srcs.split(" ")[0]} title={product.title} alt={product.title} /></div>
                <a href={`/breezybasket/product/${product.id}`} className="added-product-details flex align-items full-height">
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
                        <button id={product.id} className="btn remove-from-cart pointer align-items full-width" onClick={removeFromFav}>remove from favorites <i id={product.id} className="fa-solid fa-trash"></i></button>
                    </div>

                    <div className="small-btns-container">
                        <button id={product.id} className="btn remove-from-cart-small pointer" onClick={removeFromFav}><i id={product.id} className="fa-solid fa-trash"></i></button>
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
                            <p>removed from favorites</p>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    :
                    null
                }
            </Message>
            <p className="cart-subtitle" style={{fontSize: "3rem", textTransform: "capitalize", margin: "10px 20px"}}>favorites</p>
            {addedProducts.length > 0 
            ? <>
            {addedProductsElements}
            <div className="full-width line" style={{height: "1px", borderBottom: "2px black solid"}}></div>
            <p className="cart-down-title">products like in your favorites</p>
            {addedProductsTrademarks.map(addedProductTrademark => 
                <ProductsSlider productsJSON={productsJSON.filter(product => product.trademark === addedProductTrademark)} sliderTitle={addedProductTrademark} />
            )}
            </> : <div className="no-products full-width flex align-items">no products in the favorites <a href="/">add now!</a></div>}
            
        </div>
    )
}

export default Favorites