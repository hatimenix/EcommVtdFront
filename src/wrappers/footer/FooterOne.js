import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterCopyright from "../../components/template/footer/FooterCopyright";
import FooterNewsletter from "../../components/template/footer/FooterNewsletter";
import { FaFacebook, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";


const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu
}) => {
  return (
    <footer className={clsx("footer-area", backgroundColorClass, spaceTopClass, spaceBottomClass, extraFooterClass, spaceLeftClass, spaceRightClass)}>
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/logo__.png"
              spaceBottomClass="mb-30"
            />
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>À propos de nous</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={"/a-propos"}>À propos d'Elbal</Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      Notre carière
                    </Link>
                  </li>
                  <li>
                    <Link to={"/contact"}>
                      Contactez-nous
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30 ml-95"
                : "footer-widget mb-30 ml-50"
                }`}
            >
              <div className="footer-title">
                <h3>Plus d'informations</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={"/termes-et-conditions"}>Terms & conditions</Link>
                  </li>
                  <li>
                    <Link to={"/Politique-de-confidentialité"}>
                      Politique de confidentialité
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"
              }`}
          >
            <div
              className={`${sideMenu
                ? "footer-widget mb-30 ml-145"
                : "footer-widget mb-30 ml-75"
                }`}
            >
              <div className="footer-title">
                <h3>Suivez-nous</h3>
              </div>
              <div className=" footer-list" >
                <ul>
                  <li style={{marginRight:7}}>
                    <a
                      href="//www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{ backgroundColor: "white", borderRadius: "50%", width: "30px", height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <FaFacebookF />
                      </div>
                    </a>
                  </li>
                  <li style={{ marginRight:7}}> 
                    <a
                      href="//www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{ backgroundColor: "white", borderRadius: "50%", width: "30px", height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <BsTwitter />
                      </div>
                    </a>
                  </li>
                  <li style={{ marginRight:7}}>
                    <a
                      href="//www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{ backgroundColor: "white", borderRadius: "50%", width: "30px", height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        <FaInstagram />
                      </div>
                    </a>
                  </li>
                  <li style={{ marginRight:7}}>
                    <a
                      href="//www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div style={{ backgroundColor: "white", borderRadius: "50%", width: "30px", height: "30px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaYoutube />
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`${sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
              }`}
          >
            <FooterNewsletter
              spaceBottomClass="mb-30"
              spaceLeftClass="ml-70"
              sideMenu={sideMenu}
            />
          </div>
        </div>


      </div>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterOne;
