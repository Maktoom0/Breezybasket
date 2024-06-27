import { Swiper, SwiperSlide } from 'swiper/react';
import Product from './Product';
import SwiperNavBtns from './SwiperNavBtns'

import './style/products-slider.css'
import 'swiper/css';

export default function ProductsSlider({productsJSON, sliderTitle, seeAll = false, seeAllHref = "/"}){
    // if (productsJSON.length > 10){
    //     productsJSON = productsJSON.splice
    // }


    if (seeAll){ productsJSON = productsJSON.slice(0, 10) }

    const productsElements = productsJSON.map((product) => 
    <SwiperSlide className='product-slide' key={product.id}>
        <Product 
            id={product.id}
            srcs={product.srcs.split(" ")[0]}
            title={product.title}
            summary={product.summary}
            price={product.price}
            offer={product.offer}
            evaluation={product.evaluation}
            evaluationCount={product.evaluationCount}
            quantity={product.quantity}
        />
    </SwiperSlide>
);
    return (
        <div className='slider-container full-width'>
            <div className='flex align-items'>
                <p className='products-slider-title'>{sliderTitle}</p>
                {productsJSON.length > 10 && seeAll ? <a style={{marginLeft: "10px", textDecoration: "underline", color: "purple"}} href={seeAllHref}>See all</a> : <></>}
            </div>      
            <Swiper 
                slidesPerView="auto"
                className='products-slider-container flex full-height'
            >
                {productsElements}
            <SwiperNavBtns />
            </Swiper>

        </div>
    );
};