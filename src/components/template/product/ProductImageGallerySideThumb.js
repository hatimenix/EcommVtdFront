import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../../components/template/swiper";
import axiosClient from "../../../axios-client";

const ProductImageGalleryLeftThumb = ({ product, thumbPosition }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);

  const [listArticle, setlistArticle] = useState([])
  const [listImageArticle,setlistImageArticle]=useState([])
  useEffect(()=>{
    axiosClient.get(`/articles/30/`).then(res=>{
      setlistImageArticle(res.data.images);
    })
  },[])

  const slides = listImageArticle.map((img, i) => ({
      src: img.image,
      key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    loop: true,
    slideToClickedSlide: true,
    direction: "vertical",
    breakpoints: {
      320: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      640: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      768: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      992: {
        slidesPerView: 4,
        direction: "horizontal"
      },
      1200: {
        slidesPerView: 4,
        direction: "vertical"
      }
    }
  };

  return (
    <Fragment>
      <div className="row row-5 test">
        <div
          className={clsx(thumbPosition && thumbPosition === "left"
              ? "col-xl-10 order-1 order-xl-2"
              : "col-xl-10")}
        >
          <div className="product-large-image-wrapper">
              <div className="product-img-badges">
                  <span className="pink">-10% réduction</span>
              </div>
            
            {listImageArticle.length ? (
              <Swiper options={gallerySwiperParams}>
                {listImageArticle.map((img, key) => (
                  <SwiperSlide key={key}>
                    <button className="lightgallery-button" onClick={() => setIndex(key)}>
                      <i className="pe-7s-expand1"></i>
                    </button>
                    <div className="single-image">
                      <img
                        src={img.image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <AnotherLightbox
                    open={index >= 0}
                    index={index}
                    close={() => setIndex(-1)}
                    slides={slides}
                    plugins={[Thumbnails, Zoom, Fullscreen]}
                />
              </Swiper>
            ) : null}
          </div>
        </div>
        <div
          className={clsx(thumbPosition && thumbPosition === "left"
              ? "col-xl-2 order-2 order-xl-1"
              : "col-xl-2")}
        >
          <div className="product-small-image-wrapper product-small-image-wrapper--side-thumb">
            {listImageArticle.length ? (
              <Swiper options={thumbnailSwiperParams}>
                {listImageArticle.map((img, key) => (
                  <SwiperSlide key={key}>
                    <div className="single-image">
                      <img
                        src={img.image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null }
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGalleryLeftThumb.propTypes = {
  product: PropTypes.shape({}),
  thumbPosition: PropTypes.string
};

export default ProductImageGalleryLeftThumb;
