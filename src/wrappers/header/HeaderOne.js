import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/template/header/Logo";
import NavMenu from "../../components/template/header/NavMenu";
import IconGroup from "../../components/template/header/IconGroup";
import MobileMenu from "../../components/template/header/MobileMenu";
import HeaderTop from "../../components/template/header/HeaderTop";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AiOutlineSearch } from "react-icons/ai";

const HeaderOne = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

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

  return (
    <header className={clsx("header-area clearfix", headerBgClass, headerPositionClass)}>
      <div
        className={clsx(
          "header-top-area",
          headerPaddingClass, top === "visible" ? "d-none d-lg-block" : "d-none",
          borderStyle === "fluid-border" && "border-none"
        )}
      >
        <div className={layout === "container-fluid" ? layout : "container"}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={clsx(
          headerPaddingClass,
          "sticky-bar header-res-padding clearfix",
          scroll > headerTop && "stick"
        )}
      >
        <div >
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-3 col-4 p-3">
              {/* header logo */}
              <Logo imageUrl={process.env.PUBLIC_URL + "/assets/img/logo/logo__.png"} logoClass="logo" />
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block"  >
              {/* Nav menu */}
              <InputGroup style={{ width: '100%', minHeight: '20px', outline: "none", boxShadow: "none", }} size="sm" className="mt-3 myInputGroup">
                <DropdownButton
                  variant="outline-secondary"
                  title="Dropdown"
                  id="input-group-dropdown-1"
                  size="sm"
                >
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
                <InputGroup.Text style={{ backgroundColor: "transparent", borderRight: "none" }}><AiOutlineSearch /></InputGroup.Text>
                <Form.Control className="myInput" style={{ backgroundColor: "transparent", borderLeft: "none" , height: 'fit-content' }} placeholder="Chercher des articles" aria-label="Text input with dropdown button" />
              </InputGroup>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-8 mt-3">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string
};

export default HeaderOne;
