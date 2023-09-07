import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist, initFavoris } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { setProperties } from "../../store/slices/propertiesSlice";
import { fetchFavori, fetchProperties } from "../../services/fetchData";
import { Link } from "react-router-dom"; // Add this import

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const properties = useSelector((state) => state.propertie.properties);
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(""); // Initialize with an empty string
  const [selectedSize, setSelectedSize] = useState("");   // Initialize with an empty string


  useEffect(() => {
    fetchProperties()
      .then((prop) => {
        dispatch(setProperties(prop));
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, [dispatch]);


  const [selectedProperty, setSelectedProperty] = useState(null);
  const [productStock, setProductStock] = useState(product.stock);
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProperty ? selectedProperty.couleur : "",
    selectedProperty ? selectedProperty.taille : ""
  );

  // Function to handle property selection
  const handlePropertyChange = (property) => {
    setSelectedProperty(property);
    setProductStock(property.stock);
    setQuantityCount(1);
  };

  // Filter properties based on the current product's article ID
  const filteredProperties = properties.filter(
    (property) => property.article === product.id_art
  );

  // Group properties by their key (e.g., taille, couleur)
  const groupProperties = () => {
    const groupedProps = {};
    if (filteredProperties) {
      filteredProperties.forEach((property) => {
        for (const [key, value] of Object.entries(property)) {
          if (
            key !== "id_pro" &&
            key !== "article" &&
            typeof value === "string" &&
            !value.includes("Out of Stock")
          ) {
            if (!groupedProps[key]) {
              groupedProps[key] = [];
            }
            if (
              !groupedProps[key].includes(value) &&
              !value.includes("DEFAULT VALUE")
            ) {
              groupedProps[key].push(value);
            }
          }
        }
      });
    }
    return groupedProps;
  };

  // Get the grouped properties
  const groupedProps = groupProperties();

  return (
    <div className="product-details-content ml-70">
      <h2>{product.titre}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <>
            <span>{currency.currencySymbol + product.prix_vente}</span>{" "}
            <span className="old">
              {currency.currencySymbol + product.price}
            </span>
          </>
        ) : (
          <span>{currency.currencySymbol + product.price} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>
      {product.categorie ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {/* Render a single category */}
            <li>
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                {product.categorie}
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="product-properties"> {/* Add the CSS class */}
        {/* Render product properties */}
        {Object.entries(groupedProps).map(([key, values]) => (
          <div key={key} className="pro-details-meta">
            <span>{key}:</span> {values.join(", ")}
          </div>
        ))}
      </div>

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
                  quantityCount < productStock - productCartQty
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
              onClick={() =>
                {dispatch(addToCart({
                  ...product,
                  quantity: quantityCount,
                  selectedProductColor: selectedColor ? selectedColor : product.selectedProductColor ? product.selectedProductColor : null,
                  selectedProductSize: selectedSize ? selectedSize : product.selectedProductSize ? product.selectedProductSize : null
                }))

              //reloading page
    window.location.reload();
              }
              }
              disabled={productCartQty >= productStock}
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
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() =>{ dispatch(addToWishlist(product))
                               //reloading page
    window.location.reload();
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
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

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
      </div>
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
