import PropTypes from "prop-types";


const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
        <div className="product-img-badges">
            <span className="pink">-100%</span>
         
        </div>
      

      <div className="product-fixed-image">
          <img
            src={process.env.PUBLIC_URL +"" }
            alt=""
            className="img-fluid"
          />
       
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.shape({})
};

export default ProductImageFixed;
