
import { EffectFade } from 'swiper';
import Swiper, { SwiperSlide } from "../../components/template/swiper";
import heroSliderData from "../../data/hero-sliders/hero-slider-fourteen.json";
import HeroSliderFourteenSingle from "../../components/template/hero-slider/HeroSliderFourteenSingle.js";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false
};

const HeroSliderFourteen = () => {
  return (
    <div className="slider-area">
      <div className="slider-active-2 nav-style-3">
            <SwiperSlide>
              <HeroSliderFourteenSingle
              />
            </SwiperSlide>
      </div>
    </div>
  );
};

export default HeroSliderFourteen;
