import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../../components/template/swiper";
import axiosClient from "../../../axios-client";
import { useEffect } from "react";

const ProductImageGallery = ({ id_art, product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [listArticle, setlistArticle] = useState([])
  const [listImageArticle, setlistImageArticle] = useState([])
  const slides = listImageArticle.map((img, i) => ({
    src: img.image,
    key: i,
  }));

  useEffect(() => {
    axiosClient.get(`/articles/${id_art}/`).then(res => {
      setlistImageArticle(res.data.images);
    })
  }, [])
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

  const thumbnailSwiperParams = listImageArticle.length > 3 ? {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true
  }
  :{
    onSwiper: setThumbsSwiper,
    spaceBetween: 0,
    slidesPerView: listImageArticle.length,
    touchRatio: 0.2,
    freeMode: true,
    loop: false,
    slideToClickedSlide: true,
    navigation: true
  }

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        <div className="product-img-badges">
          <span className="pink">-10%</span>
        </div>

        {listImageArticle.length ? (
          <Swiper options={gallerySwiperParams}>
            {listImageArticle.map((img, key) => (
              <SwiperSlide key={key}>
                <button className="lightgallery-button" onClick={() => setIndex(key)}>
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="single-image" style={{
                  height: "500px",
                  width: "100%"
                }}>
                  <img
                    src={img.image}
                    className="img-fluid"
                    alt=""
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
                    }}
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
      <div className="product-small-image-wrapper mt-15">
        {listImageArticle.length? (
          <Swiper options={thumbnailSwiperParams}>
            {listImageArticle.map((img, key) => (
              <SwiperSlide key={key}>
                <div className="single-image" style={{
                  height: '100px',
                  width: '100px'
                }}>
                  <img
                    src={img.image}
                    className="img-fluid"
                    alt=""
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) :
          null
        }
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({})
};

export default ProductImageGallery;
