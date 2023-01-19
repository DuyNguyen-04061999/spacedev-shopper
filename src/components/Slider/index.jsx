import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export const Slider = ({ children, slidesPerView = 1, ...props }) => {
    return (
        <Swiper
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            {...props}
        >
            {React.Children.map(children, (child) => <SwiperSlide>{child}</SwiperSlide>)}
        </Swiper>
    )
}
