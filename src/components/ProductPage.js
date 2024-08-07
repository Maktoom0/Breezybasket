import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Rate } from "antd";

import SwiperNavBtns from './SwiperNavBtns'
import ProductsSlider from './ProductsSlider'

import 'swiper/css';
import './style/product-page.css'
import 'swiper/css/pagination'

import {ProductsCartNumberArray, ProductsFavArray } from "./productsCartContext";
import products from '../data/products.json'
import Message from "./Message";

export default function ProductPage({productsJSON, trademarks}){
    let { productId } = useParams();

    const { productsArray, setProductsArray } = useContext(ProductsCartNumberArray);
    const { favArray, setFavArray } = useContext(ProductsFavArray);

    const [commentState, setCommentState] = useState("")
    const [comments, setComments] = useState([])
    const [showComment, setShowComment] = useState(false)
    const [messageNum, setMessageNum] = useState(0)

    const commnetsRef = useRef(null)

    const product = productsJSON.find(product => product.id === productId);

    useEffect(() => {
        try {
            const productsArrayL = localStorage.getItem("productsCartArray"); if (productsArrayL){setProductsArray(JSON.parse(productsArrayL))}
            const productsFavArrayL = localStorage.getItem("productsFavArray"); if (productsFavArrayL){setFavArray(JSON.parse(productsFavArrayL))}
            const comments_ = localStorage.getItem("comments"); if (comments_){setComments(JSON.parse(comments_))}  
        } catch (error) {console.log("error while loading data from localStorage");}
    }, [setProductsArray, setFavArray, setComments])

    useEffect(() => {
        if (comments[productId.split("-")[1]]){setShowComment(true)}
    }, [comments, productId])

    console.log(comments)


    const productTrademark = trademarks.find(trademark => trademark.name === product.trademark)
    const trademarkProducts = productsJSON.filter(product => product.trademark === productTrademark.name)
    const trademarkProductsEvals = trademarkProducts.map(product => product.evaluation)
    const mostRatedProduct = trademarkProducts.find(product => product.evaluation === Math.max(...trademarkProductsEvals))

    let priceAfterOffer = (Math.floor((product.price - (product.price * (product.offer / 100))) * 100) / 100).toFixed(2);
    let mostRatedProductpriceAfterOffer = (Math.floor((mostRatedProduct.price - (mostRatedProduct.price * (mostRatedProduct.offer / 100))) * 100) / 100).toFixed(2);

    const handleAddToCart = () => {
        let updatedProductsArray = [...productsArray, productId];
        setMessageNum(1)
        document.querySelector("#product-page .message").classList.add("message-activated")
        setProductsArray(updatedProductsArray);
        localStorage.setItem("productsCartArray", JSON.stringify(updatedProductsArray));
    }

    const handleAddToFav = () => {
        setMessageNum(2)
        document.querySelector("#product-page .message").classList.add("message-activated")

        let updatedFavArray = [...favArray, productId];
        setFavArray(updatedFavArray);
        localStorage.setItem("productsFavArray", JSON.stringify(updatedFavArray));
    }

    const styleHeartBC = {"fontSize": "1.2rem", "color": "black"}
    const styleHeartAC = {"fontSize": "1.2rem", "color": "red"}

    // localStorage.removeItem("productsCartArray")
    // localStorage.removeItem("productsFavArray")

    const currentProductComments = product.comments.split("|||")

    if (comments[productId.split("-")[1]]){document.querySelector(".your-comment").classList.add("undisplayed")}

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (document.getElementById("comment-input").value !== ""){
            comments[productId.split("-")[1]] = commentState
            setComments(comments)
            localStorage.setItem("comments", JSON.stringify(comments))
            setShowComment(true)
        }

    }

    const handleRemoveComment = () => {
        comments[productId.split("-")[1]] = ""
        setComments(comments)
        setShowComment(false)
        localStorage.setItem("comments", JSON.stringify(comments))
    }

    const handleStarsClick = (event) => {
        event.preventDefault()
        window.scrollTo({
            behavior: "smooth",
            top: commnetsRef.current.offsetTop - 20
        })
    }

    return (
        <div id="product-page">
            <Message>
                {
                    messageNum === 1 
                    ? 
                        <div className= "added-to-cart flex align-items">
                            <p>added product to cart</p>
                            <i className="fa-solid fa-check"></i>
                        </div>

                    :
                    null
                }

                {
                    messageNum === 2
                    ?
                        <div className="added-to-fav flex align-items">
                            <p>added product to favorites</p>
                            <i className="fa-solid fa-check"></i>
                        </div>
                    :
                    null
                }
            </Message>

            <div className="product-page">
                <div className="most-rated-product-container full-width flex align-items justify-content">
                    <a href={`#/trademark-search/${productTrademark.name}/none`} style={{marginLeft: "20px"}} className="full-height"><img className="full-height" src={productTrademark.src} alt={productTrademark.name} /></a>
                    <a className="recommended-product flex align-items full-height" href={`#/product/${mostRatedProduct.id}`}>
                        <div style={{width: "30%"}}>
                            <p style={{fontWeight: "bolder"}}>{mostRatedProduct.title}</p>
                            <p className="mrpsummary">{mostRatedProduct.summary}</p>
                            <div className="flex">
                                <Rate defaultValue={mostRatedProduct.evaluation} allowHalf disabled />
                                <p style={{marginLeft: "20px"}}>{`${mostRatedProduct.evaluation}/5`}</p>
                            </div>
                        </div>
                    <div>
                        <p style={{fontSize: "1.6rem"}}>{mostRatedProduct.offer !== 0 ? mostRatedProductpriceAfterOffer + "EGP" : ""}</p>
                        <p style={mostRatedProduct.offer !== 0 ? {textDecoration: "line-through"} : {textDecoration: "none", fontSize: "1.6rem" ,margin: "5px"}}>
                            {mostRatedProduct.price.toFixed(2)}EGP
                        </p>
                        <p>{mostRatedProduct.offer !== 0 ? <p className="flex" style={{backgroundColor: "red", color: "white", justifyContent: "center"}}>{`${mostRatedProduct.offer}% OFF`}</p> : <></>}</p>
                    </div>

                        <img className="full-height" src={mostRatedProduct.srcs.split(" ")[0]} alt={mostRatedProduct.title} />
                    </a>
            </div>

                <div className="full-width line" style={{height: "1px", borderBottom: "2px black solid"}}></div>
                
                <div className="product-container full-width full-height flex">
                    <div className="images-slider-container flex align-items">
                        <div className="images-slider">
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                slidesPerView={1}
                                autoplay={{delay: 5000}}
                                className="full-height"
                            >
                                {product.srcs.split(" ").map(productSrc => 
                                    <SwiperSlide style={{height: "90%"}}><a className="full-width full-height flex" href={productSrc}><img className="full-height" src={productSrc} alt={product.title} /></a></SwiperSlide>
                                )}
                                <SwiperNavBtns  />
                            </Swiper>
                        </div>
                    </div>

                    <div className="details-container">
                        <p className="product-title">{product.title}</p>
                        <p className="product-summary">{product.summary}</p>
                        <a className="sentence" href={`#/trademark-search/${productTrademark.name}/none`}>{`see ${productTrademark.name} products`}</a>
                        <p className="quantity-sent" style={product.quantity <= 10 && product.quantity !== 0 ? {color: "red"} : {color: "orange"}}>{product.quantity <= 10 ? `Only ${product.quantity} units left` : "In stock"}</p>
                        <p className="product-price" style={{fontSize: "1.6rem"}}>{product.offer !== 0 ? priceAfterOffer + "EGP" : ""}</p>
                        <div className="flex align-items">
                            <p className="product-price-offer" style={product.offer !== 0 ? {textDecoration: "line-through"} : {textDecoration: "none", fontSize: "1.6rem" ,margin: "5px"}}>{product.price.toFixed(2)}EGP</p>
                            {product.offer !== 0 ? <div className="offer-sentence">{`${product.offer}% OFF`}</div> : <></>}
                        </div>
                        <div className="rate-wrapper flex align-items">
                            <div className="rate-cont pointer" onClick={handleStarsClick}><Rate className="pointer" defaultValue={product.evaluation} allowHalf disabled /></div>
                            <p>{`${product.evaluation}/5 | from: ${product.evaluationCount}`}</p>
                        </div>
                        <a href="#/" onClick={handleStarsClick} className="see-comments">see comments</a>
                        <div>
                            <p style={{fontSize: "1.5rem", textTransform: "capitalize", margin: "20px 0px 0px 10px"}}>details</p>
                            {product.details.split("|").map(detail => 
                                <div style={{marginLeft: "20px"}}>
                                    <p style={{fontWeight: "bolder", display: "inline"}}>{`${detail.split(":")[0]} | `}</p>
                                    <p style={{display: "inline"}}>{detail.split(":")[1]}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="btns-container" style={{marginTop: "20px"}}>
                            <button onClick={handleAddToCart} className={`btn pointer flex align-items add-to-cart-btn ${productsArray.includes(productId) ? "disabled" : ""}`}>
                                {productsArray.includes(productId) ? "Already added to cart" : "Add to cart"}
                                <i className={`fa-solid ${productsArray.includes(productId) ? "fa-check" : "fa-plus"}`}></i>
                            </button>

                            <button onClick={handleAddToFav} className={`add-to-fav-btn btn pointer flex align-items ${favArray.includes(productId) ? "disabled" : ""}`}>
                                {favArray.includes(productId) ? "Added to favorites" : "Add to favorites"}
                                <i style={favArray.includes(productId) ? styleHeartAC : styleHeartBC} className={`fa-${favArray.includes(productId) ? "solid" : "regular"} fa-heart`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{height: "1px", borderTop: "1px black solid", marginTop: "10px"}} className="full-width"></div>

            <div className="about-trademark flex align-items full-width">
                <a href={`#/trademark-search/${productTrademark.name}/none`}><img src={productTrademark.src} alt={productTrademark.name} className="full-height" /></a>
                <p style={{width: "70%"}}>{productTrademark.article}</p>
            </div>

            <div style={{height: "1px", borderBottom: "2px black solid"}} className="full-width"></div>

            <div>
                <ProductsSlider productsJSON={products.filter(product_ => product_.id.split("-")[0] === productId.split("-")[0] && product_.trademark !== product.trademark)} sliderTitle="from the same category" />
                <ProductsSlider productsJSON={products.filter(product_ => product_.trademark === product.trademark && product_.id !== productId)} sliderTitle={`other ${product.trademark} products`} />
                <ProductsSlider productsJSON={products.filter(product_ => product_.trademark !== product.trademark && product_.id.split("-")[0] !== product.id.split("-")[0])} sliderTitle={`other products you may like`} />
            </div>


            {/* Comments */}

            <p ref={commnetsRef} style={{textTransform: "capitalize", fontSize: "2rem", marginLeft: "10px"}}>comments</p>
            <div className="flex" style={{justifyContent: "center"}}>
                <div className="comments">
                    <div className="your-comment">
                        <form>
                            <p>your comment</p>
                            <input id="comment-input" placeholder="Type your comment..." onChange={(event) => {setCommentState(event.target.value)}} value={commentState} />
                            <button className="btn pointer" onClick={handleCommentSubmit}>submit <i className="fa-solid fa-check"></i></button>
                        </form>
                    </div>

                    {showComment 
                    ? 
                        <div className="your-comments-previewer">
                            <div className="up-sec flex align-items justify-content">
                                <div className="flex align-items">
                                    <div className="image-cont"><img className="full-width" src="https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/you.jpg" alt="User" title="You" /></div>
                                    <p style={{fontSize: "1.2rem"}}>You</p>
                                    <p style={{color: "gray"}}>4 weeks ago</p>
                                </div>
                                <button className="big-remove-btn btn pointer" onClick={handleRemoveComment}>remove <i className="fa-solid fa-trash"></i></button>
                                <button className="small-remove-btn btn pointer" onClick={handleRemoveComment}><i className="fa-solid fa-trash"></i></button>
                            </div>

                            <div className="main-sec">
                                <p>{comments[productId.split("-")[1]]}</p>
                                <div className="flex">
                                    <Rate defaultValue={product.evaluation} allowHalf disabled />
                                    <p style={{marginLeft: "10px"}}>{`${product.evaluation}/5`}</p>
                                </div>
                            </div>
                        </div>
                    :
                    null
                }

                    {currentProductComments.map((comment, index) => 
                        { 
                            return <div>
                            <div className="comment" id={index}>
                                <div className="up-sec flex align-items">
                                    <div><img className="full-width" src="https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/user.webp" alt="User" title="User" /></div>
                                    <p style={{fontSize: "1.2rem"}}>User</p>
                                    <p style={{color: "gray"}}>2 months ago</p>
                                </div>

                                <div className="main-sec">
                                    <p>{comment}</p>
                                    <div className="flex">
                                        <Rate defaultValue={product.evaluation} allowHalf disabled />
                                        <p style={{marginLeft: "10px"}}>{`${product.evaluation}/5`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    )}
                </div>
            </div>
        </div>
    );
};