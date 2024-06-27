import { useSwiper } from "swiper/react";

export default function SwiperNavBtns(){
    const swiper = useSwiper();
    return (
        <div style={{justifyContent: "center", height: "10%", bottom: "0"}} className= "swiper-nav-btns flex absolute full-width">
            <button className='slider-prev-btn btn pointer' onClick = {() => {swiper.slidePrev()}}><i className="fa-solid fa-chevron-left"></i></button>
            <button className='slider-next-btn btn pointer' onClick = {() => {swiper.slideNext()}}><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    );
};