import React from 'react'

function Productt({product}) {

    let priceAfterOffer = (Math.floor((product.price - (product.price * (product.offer / 100))) * 100) / 100).toFixed(2);
    return (
        <a href={`#/product/${product.id}`}>
            <div className="product-offer absolute top left">{product.offer !== 0 ? `${product.offer}% OFF` : ""}</div>
            <div className="image-container full-width flex align-items"><img className="full-height" src={product.srcs.split(" ")[0]} alt={product.title} title={product.summary} /></div>
            <p className="product-summary">{product.summary}</p>
            <p className="product-price">{product.offer !== 0 ? priceAfterOffer + "EGP" : ""}</p>
            <p className="product-price-offer" style={product.offer !== 0 ? {textDecoration: "line-through"} : {textDecoration: "none", fontSize: "1.3rem"}}>{product.price.toFixed(2)}EGP</p>
            <div className="rate-container">
                <div className="flex align-items">
                    <i className="fa-solid fa-star" style={{color: "orange"}}></i>
                    <p className="evaluation">{`${product.evaluation}/5`}</p>
                </div>
                <p className="evaluation-count">{`from: ${product.evaluationCount}`}</p>
            </div>
        </a>
    )
}

export default Productt