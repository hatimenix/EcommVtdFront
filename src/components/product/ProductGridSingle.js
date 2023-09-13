import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { fetchCst } from "../../services/fetchData";


const ProductGridSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.prix_vente);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  // const csts = useSelector((state) => state.cst.csts);



//   useEffect(() => {



//         dispatch(fetchCst());






//     }, [dispatch]);




// console.log("cts:", csts)
// const correspondingSeller = csts.find(c => c.id === product.customer_id);

//     if (!correspondingSeller) {
//         return null;
//     }

//     const avatarStyle = {
//         position: 'absolute',
//         top: '00px',
//         left: '10px',
//         width: '40px',
//         height: '40px',
//         backgroundColor: '#fff',
//         borderRadius: '50%',
//         padding: '0px',
//         boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
//         overflow: 'hidden',
//     };


//     const sellerNameStyle = {
//         position: 'absolute',
//         top: '10px',
//         right: '140px',
//         fontSize: '12px',
//     };


  return (
    <Fragment>
      {/* <div style={avatarStyle}>
                    <img src={correspondingSeller.image} alt={correspondingSeller.name} width="40" height="40" />

                </div>
                <div style={sellerNameStyle}>{correspondingSeller.first_name}</div> */}

      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/articles/" + product.id_art}>
            {product?.images?.length ? (
              <img
                src={process.env.PUBLIC_URL + product.images[0].image} // Assuming product.images[0].image is a valid image URL
                className=""
                alt=""
                style={{ width: "200px", hieght: "400px" }}
              />
            ) : (
              <p>No images available</p> // Display a message if there are no images
            )}
          </Link>
          {/* {product.prix_vente || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.prix_vente}%</span>
              ) : (
                ""
              )}
              {product.new ? <span className="purple">New</span> : ""}
            </div>
          ) : (
            ""
          )} */}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {" "}
                  Buy now{" "}
                </a>
              ) : product.properties && product.properties.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/articles/${product.id_art}`}>
                  Select Option
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  {" "}
                  <i className="pe-7s-cart"></i>{" "}
                  {cartItem !== undefined && cartItem.quantity > 0
                    ? "Added"
                    : "Add to cart"}
                </button>
              ) : (
                <button disabled className="active">
                  Out of Stock
                </button>
              )}
            </div>
            <div className="pro-same-action pro-quickview">
              <button title="Quick View" onClick={() => setModalShow(true)}>
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/articles/" + product.id_art}>
              {product.titre}
            </Link>
          </h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + product.unit_prix}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + product.prix_vente}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + product.prix_vente} </span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridSingle;
