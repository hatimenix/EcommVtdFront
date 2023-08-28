import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeroSliderFourteenSingle = ({ data }) => {
  return (
    <div
      className="slider-height-5 d-flex align-items-center bg-img"
      style={{ backgroundImage: `url("https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?w=996&t=st=1692353382~exp=1692353982~hmac=d4e0372f478167aa6d133139206110b2e7d1fc325cab5187037a354e2f96ddb6")` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="slider-content-6 slider-animated-1 text-center">
              <h1 className="animated">Espace Vendeur</h1>
              <p className="animated">Subtitle here </p>
              <div className="slider-btn-5 btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL +"/gestion-articles"  }
                >
                  Gerer vos produits
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderFourteenSingle.propTypes = {
  data: PropTypes.shape({})
};

export default HeroSliderFourteenSingle;
