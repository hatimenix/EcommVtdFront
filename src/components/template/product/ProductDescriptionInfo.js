import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosClient from "../../../axios-client";
// import { getProductCartQuantity } from "../../helpers/product";
// import Rating from "./sub-components/ProductRating";
// import { addToCart } from "../../store/slices/cart-slice";
// import { addToWishlist } from "../../store/slices/wishlist-slice";
// import { addToCompare } from "../../store/slices/compare-slice";

const ProductDescriptionInfo = ({id_art,

}) => {
  const dispatch = useDispatch();

  const [quantityCount, setQuantityCount] = useState(1);

  const [listArticle, setlistArticle] = useState([])
  useEffect(() => {
    axiosClient.get(`/articles/${id_art}/`).then(res => {
      setlistArticle(res.data);
      console.log('dataaa article : ', res.data);
    })
  }, [])


  return (
    <div className="product-details-content ml-70">
      <h2>{listArticle.titre}</h2>
      <div className="product-details-price">
        <Fragment>
          <span>{listArticle.price}</span>{" "}
          <span className="old">
            {listArticle.price}
          </span>
        </Fragment>

      </div>
      {/* {product.rating && product.rating > 0 ? ( */}
      <div className="pro-details-rating-wrap">
        <div className="pro-details-rating">
          {/* <Rating ratingValue={product.rating} /> */}
        </div>
      </div>
      {/* // ) : (
      //   ""
      // )} */}
      <div className="pro-details-list">
        <p>{listArticle.description}</p>
      </div>

      <div className="pro-details-meta">
        <span>Stock :</span>
        <ul>
          <li >
            {listArticle.stock === 0 ? '-' : listArticle.stock}
          </li>
        </ul>
      </div>

      <div className="pro-details-meta">
        <span>Forme colis :</span>
        <ul>
          <li >
            {listArticle.forme_colis}
          </li>
        </ul>
      </div>

      <div className="pro-details-meta">
        <span>Categories :</span>
        <ul>
          <li >
            {listArticle.categorie}
          </li>
        </ul>
      </div>

      {/* <div className="pro-details-meta">
        <span>Tags :</span>
        <ul>

          <li >
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              something
            </Link>
          </li>

        </ul>
      </div>


      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({})
};

export default ProductDescriptionInfo;
