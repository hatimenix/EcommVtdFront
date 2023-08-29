import PropTypes from "prop-types";


const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {/* {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )} */}

      <div className="product-fixed-image">
        {product.images ? (
          <img
            src={process.env.PUBLIC_URL + product.images.image[0]}
            alt=""
            className="img-fluid"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.shape({})
};

export default ProductImageFixed;
