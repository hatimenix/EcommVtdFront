import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from 'swiper';
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../article-features/ArticleRating";
import Swiper, { SwiperSlide } from "../../../components/swiper";
import { getProductCartQuantity } from "../../../helpers/product";
import { addToCart, initCart } from "../../../store/slices/cart-slice";
import { addToWishlist, initFavoris } from "../../../store/slices/wishlist-slice";
import { addToCompare } from "../../../store/slices/compare-slice";
import axiosClient from "../../../axios-client";
// import { getProductCartQuantity } from "../../helpers/product";
// import { addToCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";
// import { addToCompare } from "../../store/slices/compare-slice";
// import './styleModal.scss'
function ArticleModal({ product, article, currency, discountedPrice, finalProductPrice, finalDiscountedPrice, show, onHide, wishlistItem, compareItem }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();
    // const { cartItems } = useSelector((state) => state.cart);

    // const [selectedProductColor, setSelectedProductColor] = useState(
    //     product.variation ? product.variation[0].color : ""
    // );
    // const [selectedProductSize, setSelectedProductSize] = useState(
    //     product.variation ? product.variation[0].size[0].name : ""
    // );
    // const [productStock, setProductStock] = useState(
    //     product.variation ? product.variation[0].size[0].stock : product.stock
    // );
    // const [quantityCount, setQuantityCount] = useState(1);
    // const productCartQty = getProductCartQuantity(
    //     cartItems,
    //     product,
    //     selectedProductColor,
    //     selectedProductSize
    // );


    //fetch data
    function getfav() {
        try {
            // fetch panier
            axiosClient.get(`favoris/?search=${localStorage.getItem("cu")}`)
                .then((res) => {
                    dispatch(initFavoris(res.data))
                });

        } catch (error) {
            console.error('Error fetching categories:', error);
        }

    }


    function getpan() {
        try {
            // fetch panier
            axiosClient.get(`panier/?search=${localStorage.getItem("cu")}`)
                .then((res) => {
                    dispatch(initCart(res.data))
                });

        } catch (error) {
            console.error('Error fetching categories:', error);
        }

    }

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
        freeMode: true,
        loop: true,
        slideToClickedSlide: true,
        navigation: true
    };

    const onCloseModal = () => {
        setThumbsSwiper(null)
        onHide()
    }


    const maxLength = 160; // Set your desired maximum length

    const text = article.description;
    const shouldShowTooltip = text.length > maxLength;

    const desc = shouldShowTooltip ? `${text.slice(0, maxLength)}...` : text;




    const tooltipContent = shouldShowTooltip ? (
        <Tooltip >
            {text}
        </Tooltip>
    ) : null;


    const properties = useSelector((state) => state.propertie.properties);

    const [selectedColor, setSelectedColor] = useState(""); // Initialize with an empty string
    const [selectedSize, setSelectedSize] = useState("");   // Initialize with an empty string




    const [selectedProperty, setSelectedProperty] = useState(null);
    const [productStock, setProductStock] = useState(product.stock);
    const [quantityCount, setQuantityCount] = useState(1);



    return (
        <Modal show={show} onHide={onCloseModal} className="product-quickview-modal-wrapper">
            <Modal.Header closeButton></Modal.Header>

            <div className="modal-body">
                <div className="row">
                    <div className="col-md-5 col-sm-12 col-xs-12">
                        <div className="product-large-image-wrapper">
                            <Swiper options={gallerySwiperParams}>
                                {article.images &&



                                    article.images.map((image, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <div className="single-image">
                                                    <img
                                                        src={image.image}
                                                        className="img-fluid"
                                                        alt="Product"
                                                        style={{ maxHeight: '400px' }}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                        <div className="product-small-image-wrapper mt-15">
                            <Swiper options={thumbnailSwiperParams}>
                                {article.images &&
                                    article.images.map((img, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <div className="single-image">
                                                    <img
                                                        src={process.env.PUBLIC_URL + img.image}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                            </Swiper>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className="product-details-content quickview-content">
                            <h2>{article.titre}</h2>
                            <div className="product-details-price">
                                {discountedPrice !== null ? (
                                    <Fragment>
                                        <span>
                                            € {article.prix_vente}
                                        </span>{" "}
                                        <span className="old">
                                            € {article.unit_prix}
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span>{currency.currencySymbol + finalProductPrice} </span>
                                )}
                            </div>

                            <div className="pro-details-rating-wrap">
                                <div className="pro-details-rating">
                                    <Rating ratingValue={2} />
                                </div>
                            </div>

                            <div className="pro-details-list">

                                {shouldShowTooltip ? (
                                    <OverlayTrigger placement="top" overlay={tooltipContent}>
                                        <span>{desc}</span>
                                    </OverlayTrigger>
                                ) : (
                                    <span>{text}</span>
                                )}
                            </div>

                            {true ? (
                                <div className="pro-details-size-color">
                                    <div className="pro-details-color-wrap">
                                        <span>Color</span>
                                        <div className="pro-details-color-content">

                                            <label
                                                className={`pro-details-color-content--single `}

                                            >
                                                <input
                                                    type="radio"
                                                    value={10}
                                                    name="product-color"
                                                    checked={

                                                        "checked"

                                                    }

                                                />
                                                <span className="checkmark"></span>
                                            </label>

                                        </div>
                                    </div>
                                    <div className="pro-details-size">
                                        <span>Size</span>
                                        <div className="pro-details-size-content">

                                            <label
                                                className={`pro-details-size-content--single`}

                                            >
                                                <input
                                                    type="radio"
                                                    value={"ddjj"}
                                                    checked={
                                                        "checked"

                                                    }

                                                />
                                                <span className="size-name">
                                                    {"test"}
                                                </span>
                                            </label>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}







                            {product.affiliateLink ? (
                                <div className="pro-details-quality">
                                    <div className="pro-details-cart btn-hover ml-0">
                                        <a
                                            href={product.affiliateLink}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="pro-details-quality">
                                    <div className="cart-plus-minus">
                                        <button
                                            onClick={() =>
                                                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
                                            }
                                            className="dec qtybutton"
                                        >
                                            -
                                        </button>
                                        <input
                                            className="cart-plus-minus-box"
                                            type="text"
                                            value={quantityCount}
                                            readOnly
                                        />
                                        <button
                                            onClick={() =>
                                                setQuantityCount(
                                                    quantityCount < productStock
                                                        ? quantityCount + 1
                                                        : quantityCount
                                                )
                                            }
                                            className="inc qtybutton"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="pro-details-cart btn-hover">
                                        {productStock && productStock > 0 ? (
                                            <button
                                                onClick={() => {
                                                    dispatch(addToCart({
                                                        ...product,
                                                        quantity: quantityCount,
                                                        selectedProductColor: selectedColor ? selectedColor : product.selectedProductColor ? product.selectedProductColor : null,
                                                        selectedProductSize: selectedSize ? selectedSize : product.selectedProductSize ? product.selectedProductSize : null
                                                    }))

                                                    // actualiser le favoris
                                                    setTimeout(() => {
                                                        getpan()
                                                    }, 500);
                                                }
                                                }
                                                disabled={quantityCount > productStock || !localStorage.getItem('cu')}
                                            >
                                                {" "}
                                                Add To Cart{" "}
                                            </button>
                                        ) : (
                                            <button disabled>Out of Stock</button>
                                        )}
                                    </div>
                                    <div className="pro-details-wishlist">
                                        <button
                                            className={wishlistItem !== undefined ? "active" : ""}
                                            disabled={wishlistItem !== undefined || !localStorage.getItem('cu')}
                                            title={
                                                wishlistItem !== undefined
                                                    ? "Added to wishlist"
                                                    : "Add to wishlist"
                                            }
                                            onClick={() => {
                                                dispatch(addToWishlist(product))

                                                // actualiser le favoris
                                                setTimeout(() => {
                                                    getfav()
                                                }, 500);
                                            }}
                                        >
                                            <i className="pe-7s-like" />
                                        </button>
                                    </div>
                                    <div className="pro-details-compare">
                                        <button
                                            className={compareItem !== undefined ? "active" : ""}
                                            disabled={compareItem !== undefined}
                                            title={
                                                compareItem !== undefined
                                                    ? "Added to compare"
                                                    : "Add to compare"
                                            }
                                            onClick={() => dispatch(addToCompare(product))}
                                        >
                                            <i className="pe-7s-shuffle" />
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

ArticleModal.propTypes = {
    currency: PropTypes.shape({}),
    discountedprice: PropTypes.number,
    finaldiscountedprice: PropTypes.number,
    finalproductprice: PropTypes.number,
    onHide: PropTypes.func,
    product: PropTypes.shape({}),
    show: PropTypes.bool,
    wishlistItem: PropTypes.shape({}),
    compareItem: PropTypes.shape({})
};

export default ArticleModal;