import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// const CustomPagination = ({ slidesLength, activeIndex }) => {
//     const dots = Array(slidesLength).fill(null).map((_, index) => (
//       <button
//         key={index}
//         className={`custom-dot ${index === activeIndex ? 'active' : ''}`}
//         onClick={() => console.log(`Clicked dot ${index + 1}`)} // Replace with your logic
//       >
//         {index + 1}
//       </button>
//     ));
  
//     return <div className="custom-pagination">{dots}</div>;
//   };

export default function ProductPage({productsJSON}){
    let { productId } = useParams();
    const product = productsJSON.find(p => p.id === productId);


    return (
        <div className="product-page">
            <div className="product-container full-width">
                <div className="images-slider">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{clickable: true}}
                    >
                        <SwiperSlide>1</SwiperSlide>
                        <SwiperSlide>2</SwiperSlide>
                        <SwiperSlide>3</SwiperSlide>
                        <SwiperSlide>4</SwiperSlide>
                        <SwiperSlide>5</SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
};