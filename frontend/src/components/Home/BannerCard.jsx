import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './BannerCard.css';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const BannerCard = () => {
  const images = [
    "https://rocket-chainsaw.b-cdn.net/wp-content/uploads/2018/05/Red-Dead-Redemption-2-New-Logo.jpg",
    "https://sm.ign.com/t/ign_es/screenshot/default/got-keyart-80677_3tev.1280.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202311/1717/827d78b1eb9155e1383cc43bafeb4c900eb7157bf8b1a65a.jpg"
  ];

  return (
    <div className="banner-container w-full h-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCard;
