import { Swiper, SwiperSlide } from 'swiper/react';
import Product from './Product';
import SwiperNavBtns from './SwiperNavBtns'

import './style/products-slider.css'
import 'swiper/css';

export default function ProductsSlider({productsJSON, sliderTitle}){
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
            <p className='products-slider-title'>{sliderTitle}</p>      
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