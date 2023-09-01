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
import { FiHelpCircle } from "react-icons/fi";
import { color } from "framer-motion";
import MenuCart from "./sub-components/MenuCart";
import axiosClient, { linkImage } from "../../../axios-client";
import { Image } from "react-bootstrap";
import { Dropdown } from 'react-bootstrap';


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
  const token = localStorage.getItem("ACCESS_TOKEN")
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
  
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const [User, setUser] = useState([]);
  const [image, setImage] = useState()

  useEffect(() => {
    axiosClient.get('/auth/user/').then(({ data }) => {
      setUser(data);
    });

  }, []);

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      {/* <div className="same-style header-search d-none d-lg-block">
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
      </div> */}
      {!token ?
        <>
          <div className="row " style={{ width: "100%%" }}>
            <Button onClick={handleShow} className="col-6" style={{ fontSize: "12px", width: "fit-content", color: "teal", borderColor: "teal", backgroundColor: "transparent" }} size="sm" >SignUp | Login</Button>
            <Button className="col-6 " style={{ fontSize: "12px", width: "fit-content", marginLeft: 5, backgroundColor: "teal", border: "none" }} size="sm" >sell now</Button>
          </div>
          <div className="same-style header-compare " style={{ marginLeft: "6%" }}><FiHelpCircle style={{ fontSize: "20px", color: "gray" }} /></div>
        </> :
        <>
          <div className="d-flex align-items-center mt-2" style={{ marginRight: "6%" }}>
          <div className="same-style header-compare d-none d-lg-block d-md-block">
              <Link to={process.env.PUBLIC_URL + "/compare"}>
                <i className="pe-7s-chat" />
                <span className="count-style">
                  {/* {compareItems && compareItems.length ? compareItems.length : 0} */}
                </span>
              </Link>
            </div>
            <div className="same-style header-compare d-none d-lg-block d-md-block">
              <Link to={process.env.PUBLIC_URL + "/compare"}>
                <i className="pe-7s-bell" />
                <span className="count-style">
                  1
                  {/* {compareItems && compareItems.length ? compareItems.length : 0} */}
                </span>
              </Link>
            </div>
            <div className="same-style header-wishlist d-none d-lg-block d-md-block">
              <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                <i className="pe-7s-like" />
                <span className="count-style">
                  {/* {wishlistItems && wishlistItems.length ? wishlistItems.length : 0} */}
                </span>
              </Link>
            </div>
            <div className="same-style cart-wrap d-none d-lg-block ">
              <button className="icon-cart" onClick={e => handleClick(e)}>
                <i className="pe-7s-shopbag" />
                <span className="count-style">
                  {/* {cartItems && cartItems.length ? cartItems.length : 0} */}
                </span>
              </button>
              <MenuCart />
            </div>
            <div className="same-style cart-wrap d-block d-lg-none">
              <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
                <i className="pe-7s-shopbag" />
                <span className="count-style">
                  {/* {cartItems && cartItems.length ? cartItems.length : 0} */}
                </span>
              </Link>
            </div>
          </div>
          <div className="d-none d-lg-block d-md-block" style={{ marginRight: "6%" }} >
            <Dropdown style={{ height: '10px' }} >
              <Dropdown.Toggle variant="none" id="dropdown-basic" style={{ border: "none", boxShadow: "none", padding: 0 }}>
                <Image roundedCircle
                  src={image ? image : linkImage + User.image}
                  alt="avatar"
                  style={{ width: '30px', height: '30px' }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ fontSize: 12, padding: "1px" }} >
                {/* Dropdown menu items */}
                <Dropdown.Item style={{ backgroundColor: "transparent" }}>
                  <Link to={process.env.PUBLIC_URL + "/profil"}>
                    My account
                  </Link>
                </Dropdown.Item >
                <Link onClick={onLogout}>
                <Dropdown.Item style={{ backgroundColor: "transparent" }}>
                    Logout
                  
                </Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
            {/* <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <Image roundedCircle src={image ? image : linkImage+User.image} alt="avatar"
                                            style={{ width: "30px", height: '30px' }} />
        </button>
        
        <div className="account-dropdown">
          <ul>
          <li>
              <Link to={process.env.PUBLIC_URL + "/profil"}>
                My account
              </Link>
              <Link onClick={onLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div> */}
          </div>
          <div  className="row d-flex align-items-center d-none d-lg-block d-md-block"  style={{ width: "100%%" }}>
            <Button className="col-6 " style={{ fontSize: "12px", width: "70px", height:"fit-content", marginLeft: 6, backgroundColor: "teal", border: "none" }} size="sm" >sell now</Button>
          </div>
          <div className="same-style header-compare  d-flex align-items-center d-none d-lg-block d-md-block " style={{ marginLeft: "6%" }}><FiHelpCircle style={{ fontSize: "20px", color: "gray" }} /></div>
        </>

      }


      <div className="same-style mobile-off-canvas d-block d-lg-none  d-flex align-items-center">
        <button
          className="mobile-aside-button"
          onClick={() => {
            setOffcanvasActive(true);
          }}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
      <OffcanvasMenu
        activeState={offcanvasActive}
        getActiveState={getActiveState}
      />


      <Modal size="md" show={show} onHide={handleClose}>

        <Modal.Body  >
          <Modal.Header style={{ border: 'none' }} closeButton />
          <Login />
        </Modal.Body>
      </Modal>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
