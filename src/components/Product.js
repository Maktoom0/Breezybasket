import { Rate } from "antd";
import { useContext, useEffect, useState } from "react";

import {ProductsCartNumberArray, ProductsFavArray } from "./productsCartContext";

export default function Product({
    id="example",
    srcs = "https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg https://t3.ftcdn.net/jpg/00/92/53/56/360_F_92535664_IvFsQeHjBzfE6sD4VHdO8u5OHUSc6yHF.jpg",
    title = "Product Title",
    summary = "Product Summary",
    price = 0,
    offer = 0,
    evaluation = 0,
    evaluationCount = 0,
    quantity = 0
}){
    
    const [heartClass, setHeartClass] = useState("regular");

    const { productsArray, setProductsArray } = useContext(ProductsCartNumberArray);
    const { favArray, setFavArray } = useContext(ProductsFavArray);

    useEffect(() => {
        try {
            const productsArrayL = localStorage.getItem("productsCartArray"); if (productsArrayL){setProductsArray(JSON.parse(productsArrayL))}
            const productsFavArrayL = localStorage.getItem("productsFavArray"); if (productsFavArrayL){setFavArray(JSON.parse(productsFavArrayL))}
            } catch (error) {console.log("error while loading data from localStorage");}
    }, [setProductsArray, setFavArray])
            
    useEffect(() => {
        if (favArray.includes(id)) {setHeartClass("solid")}
        else {setHeartClass("regular")}
    }, [setHeartClass, favArray, id])

    let priceAfterOffer = (Math.floor((price - (price * (offer / 100))) * 100) / 100).toFixed(2);

    const handleAddToFav = () => {
        setHeartClass(heartClass === "regular" ? "solid" : "regular");

        if (heartClass === "solid"){
            favArray.splice(favArray.indexOf(id), 1);
            setFavArray(favArray);
            localStorage.setItem("productsFavArray", JSON.stringify(favArray));

        } else if (heartClass === "regular"){
            let updatedFavArray = [...favArray, id];
            setFavArray(updatedFavArray);
            localStorage.setItem("productsFavArray", JSON.stringify(updatedFavArray));
        }
    }

    // localStorage.removeItem("productsCartArray")
    // localStorage.removeItem("productsFavArray")

    const handleAddToCart = () => {
        let updatedProductsArray = [...productsArray, id];
        setProductsArray(updatedProductsArray);
        localStorage.setItem("productsCartArray", JSON.stringify(updatedProductsArray));
    }

    const styleHeartBC = {"fontSize": "1.2rem", "color": "black"}
    const styleHeartAC = {"fontSize": "1.2rem", "color": "red"}

    return (
        <div className="product full-width full-height">
            <a href={`/breezybasket/product/${id}`}  className="full-width block relative" style={{height: "85%"}}>
                <p className="offer absolute top left">{offer !== 0 ? `${offer}% OFF` : ""}</p>
                <div className="image-container full-width flex"><img className="full-height" src={srcs.split(" ")[0]} alt={title} title={title} /></div>
                <div style={{margin: "10px 10px 0px"}}>
                    <p className="product-title">{title}</p>
                    <p className="product-summary">{summary}</p>
                    <p className="product-price">{offer !== 0 ? priceAfterOffer + "EGP" : ""}</p>
                    <p className="product-price-offer" style={offer !== 0 ? {textDecoration: "line-through"} : {textDecoration: "none", fontSize: "1.3rem" ,margin: "5px"}}>{price.toFixed(2)}EGP</p>
                    <p className="qunatity-sent" style={quantity <= 10 && quantity !== 0 ? {color: "red"} : {color: "orange"}}>{quantity <= 10 ? `Only ${quantity} units left` : "In stock"}</p>
                    <div className="rate-container flex align-items justify-content">
                        <div className="rate-child-container flex align-items">
                            <Rate defaultValue={evaluation} allowHalf disabled />
                            <p className="evaluation">{`${evaluation}/5`}</p>
                        </div>
                        <p className="evaluation-count">{`from: ${evaluationCount}`}</p>
                    </div>
                </div>
            </a>
            <div className={`flex full-width absolute align-items `} style={{justifyContent: "center", bottom: "60px"}}>
                <button onClick={handleAddToCart} className={`btn pointer flex align-items add-to-cart-btn ${productsArray.includes(id) ? "disabled" : ""}`}>
                    {productsArray.includes(id) ? "Already added to cart" : "Add to cart"}
                    <i className={`fa-solid ${productsArray.includes(id) ? "fa-check" : "fa-plus"}`}></i>
                </button>
            </div>

            <div className={`flex full-width absolute align-items`} style={{justifyContent: "center", bottom: "10px"}}>
                <button onClick={handleAddToFav} className={`add-to-fav-btn btn pointer flex align-items ${favArray.includes(id) ? "disabled" : ""}`}>
                    {favArray.includes(id) ? "Added to favorites" : "Add to favorites"}
                    <i style={heartClass === "regular" ? styleHeartBC : styleHeartAC} className={`fa-${heartClass} fa-heart`}></i>
                </button>
            </div>

            <div className="small-btns-container absolute full-width">
                <button onClick={handleAddToCart} className={`btn pointer add-to-cart-btn-small ${productsArray.includes(id) ? "disabled" : ""}`}>
                    {productsArray.includes(id) ? "Added" : "Cart"}
                    <i className={`fa-solid ${productsArray.includes(id) ? "fa-check" : "fa-plus"}`}></i>
                </button>

                <button onClick={handleAddToFav} className={`add-to-fav-btn-small btn pointer ${favArray.includes(id) ? "disabled" : ""}`}>
                    {favArray.includes(id) ? "Added" : "Favorites"}
                    <i style={heartClass === "regular" ? styleHeartBC : styleHeartAC} className={`fa-${heartClass} fa-heart`}></i>
                </button>
            </div>
        </div>
    );
}