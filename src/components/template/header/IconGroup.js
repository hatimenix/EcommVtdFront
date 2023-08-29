import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import NavMenu from "./NavMenu";
import { useEffect, useState } from "react";
import OffcanvasMenu from "./OffcanvasMenu";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Login from "../../../pages/Authentication/Login";
// import MenuCart from "./sub-components/MenuCart";


const IconGroup = ({ iconWhiteClass }) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [offcanvasActive, setOffcanvasActive] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const getActiveState = state => {
    setOffcanvasActive(state);
  };
  const onLogout = (ev) => {
    ev.preventDefault();
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    navigate('/')
  };
  // const { compareItems } = useSelector((state) => state.compare);
  // const { wishlistItems } = useSelector((state) => state.wishlist);
  // const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
          {!localStorage.getItem('ACCESS_TOKEN') ?
          <>
           <li>
              <Link onClick={handleShow}>Login</Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Register
              </Link>
            </li></> : <li>
              <Link to={process.env.PUBLIC_URL + "/profil"}>
                My account
              </Link>
              <Link onClick={onLogout}>
                Logout
              </Link>
            </li>}
            
            
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {/* {compareItems && compareItems.length ? compareItems.length : 0} */}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {/* {wishlistItems && wishlistItems.length ? wishlistItems.length : 0} */}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {/* {cartItems && cartItems.length ? cartItems.length : 0} */}
          </span>
        </button>
        {/* menu cart */}
        {/* <MenuCart /> */}
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {/* {cartItems && cartItems.length ? cartItems.length : 0} */}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => {
            setOffcanvasActive(true);
          }}
        >
          <i className="pe-7s-menu" />
        </button>
      </div><OffcanvasMenu
        activeState={offcanvasActive}
        getActiveState={getActiveState}
      />
     

      <Modal  size="md" show={show} onHide={handleClose}>
        
        <Modal.Body  >
        <Modal.Header  closeButton/>
            <Login/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
