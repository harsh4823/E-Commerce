// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import {Autoplay, EffectFade, Navigation,Pagination} from "swiper/modules";
import {banner} from "../../Utils/index.js";
import {Link} from "react-router-dom";

const slider = () => {

    const colors = ['bg-banner-color1', 'bg-banner-color2', 'bg-banner-color3'];
    return (
        <div className={'py-2 rounded-md'}>
            <Swiper
            grabCursor={true}
            autoplay={
                {
                    delay:2000,
                    disableOnInteraction:false,
                }
            }
            navigation
            modules={[Pagination,EffectFade,Navigation,Autoplay]}
            pagination={{clickable:true}}
            scrollbar={{
                draggable:true,
            }}
            slidesPerView={1}
            >
                {banner.map((item,i) =>(
                    <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}`}>
                            <div className={'flex justify-center items-center'}>
                                <div className={'hidden lg:flex justify-center w-1/2 p-4'}>
                                <div className={'text-center'}>
                                    <h3 className={'text-3xl text-white font-bold'}>
                                        {item.title}
                                        </h3>
                                    <h1 className='text-5xl text-white font-bold mt-2'>
                                        {item.subtitle}
                                        </h1>
                                        <p className={'text-white font-bold mt-4'}>
                                            {item.description}
                                        </p>
                                    <Link
                                        className={'mt-6 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800'}
                                        to={"/products"}>
                                        Shop
                                    </Link>
                                </div>
                            </div>
                            <div className={'w-full flex justify-center lg:w-1/2 p-4 overflow-hidden aspect-[3/2]'}>
                                <img src={item.image} alt={item?.title} className={'h-full w-full pb-4'}/>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default slider;
