import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { setProperties } from "../../store/slices/propertiesSlice";
import { fetchProperties } from "../../services/fetchData";

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
  const properties = useSelector((state) => state.properties.properties);
  const dispatch = useDispatch();

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
  const [productStock, setProductStock] = useState(0);
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

      {/* Render product properties */}
      {properties && properties.length > 0 && (
        <div className="pro-details-properties">
          {properties.map((property) => (
            <label
              key={property.id_pro}
              className={`pro-details-property ${
                selectedProperty &&
                selectedProperty.id_pro === property.id_pro
                  ? "selected"
                  : ""
              }`}
              onClick={() => handlePropertyChange(property)}
            >
              {property.couleur} - {property.taille} (
              {property.stock > 0 ? "In Stock" : "Out of Stock"})
            </label>
          ))}
        </div>
      )}

      {/* Rest of your component */}
      {/* ... */}
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
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
