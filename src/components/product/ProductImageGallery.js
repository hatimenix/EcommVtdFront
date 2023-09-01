import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import AnotherLightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Swiper, { SwiperSlide } from "../../components/swiper";

const ProductImageGallery = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const slides = product?.images.map((img, i) => ({
    src: process.env.PUBLIC_URL + img.image,
    key: i,
  }));

  // swiper slider settings
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true,
  };

  // Define the desired width and height for your images
  const imageWidth = "200px"; // Adjust this to your preferred width
  const imageHeight = "200px"; // Adjust this to your preferred height

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product?.images?.length ? (
          <Swiper options={gallerySwiperParams}>
            {product.images.map((single, key) => (
              <SwiperSlide key={key}>
                <button className="lightgallery-button" onClick={() => setIndex(key)}>
                  <i className="pe-7s-expand1"></i>
                </button>
                <div className="single-image">
                  <img
                    src={process.env.PUBLIC_URL + single.image}
                    className=""
                    alt=""
                    style={{ width: "600px", height: '800px', objectFit: 'contain' }}

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
        {product?.images?.length ? (
          <Swiper options={thumbnailSwiperParams}>
            {product.images.map((single, key) => (
              <SwiperSlide key={key}>
                <div className="single-image">
                  <img
                    src={process.env.PUBLIC_URL + single.image}
                    className=""
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.shape({}),
};

export default ProductImageGallery;
