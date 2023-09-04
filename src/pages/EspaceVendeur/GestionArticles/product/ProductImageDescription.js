import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
// import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../../../components/template/product/ProductImageGallery";
import ProductDescriptionInfo from "../../../../components/template/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../../../components/template/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../../../components/template/product/ProductImageFixed";

const ProductImageDescription = ({
  id_art,
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
}) => {
  const currency = useSelector((state) => state.currency);
  // const { cartItems } = useSelector((state) => state.cart);
  // const { wishlistItems } = useSelector((state) => state.wishlist);
  // const { compareItems } = useSelector((state) => state.compare);
  // const wishlistItem = wishlistItems.find(item => item.id === product.id);
  // const compareItem = compareItems.find(item => item.id === product.id);

  // const discountedPrice = getDiscountPrice(product.price, product.discount);
  // const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  // const finalDiscountedPrice = +(
  //   discountedPrice * currency.currencyRate
  // ).toFixed(2);

  return (
    <div className={clsx("shop-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <ProductImageGallery id_art={id_art} product={product} />
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              id_art={id_art}
              // product={product}
              // // discountedPrice={discountedPrice}
              // currency={currency}
              // // finalDiscountedPrice={finalDiscountedPrice}
              // // finalProductPrice={finalProductPrice}
              // cartItems={cartItems}
              // wishlistItem={wishlistItem}
              // compareItem={compareItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default ProductImageDescription;
