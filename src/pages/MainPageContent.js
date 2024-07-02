import React from 'react'

import TrademarksContainer from '../components/TrademarksContainer'
import ProductsSlider from '../components/ProductsSlider'
import CategoriesContainer from '../components/CategoriesContainer'
import HowToContainer from '../components/HowToContainer'

import products from '../data/products.json'

function MainPageContent() {
  return (
    <>
        <TrademarksContainer />
        <ProductsSlider productsJSON={products.filter((product) => product.offer > 50)} sliderTitle="offers | more than 50%" />
        <ProductsSlider productsJSON={products.filter((product) => product.evaluation === 5)} sliderTitle="5 stars products" />
        <CategoriesContainer />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "spiro spathis")} sliderTitle="spiro spathis | feel the real taste of juice" />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "double dare")} sliderTitle="double dare with its new flavors" />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "tiger")} sliderTitle="tiger & excellence!" />
        <HowToContainer />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "big chips")} sliderTitle="big chips & kettle | the real chips crunch" />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "double x")} sliderTitle="double x" />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "jaguar")} sliderTitle="Jaguar popcorn, puffcorn, cheetos and others!" />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark === "taw taw")} sliderTitle="taw taw | sponge colorful cakes!" />
        <ProductsSlider productsJSON={products.filter((product) => product.trademark !== "spiro spathis" && product.trademark !== "double dare" && product.trademark !== "tiger" && product.trademark !== "big chips" && product.trademark !== "double x" && product.trademark !== "jaguar" && product.trademark !== "taw taw")} sliderTitle="others" />
    </>
  )
}

export default MainPageContent