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


  const [selectedOption, setSelectedOption] = useState('Articles');
  const [searchText, setSearchText] = useState('');

  const handleDropdownChange = (selectedValue) => {
    setSelectedOption(selectedValue);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // Perform search based on selectedOption and searchText
    if (selectedOption === 'Articles') {
      // Search by articles
    } else if (selectedOption === 'Customers') {
      // Search by customers
    }
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
            <div className="col-xl-6 col-lg-6 d-none d-lg-block mt-2"  >
              {/* Nav menu */}
              <InputGroup style={{ width: '100%', minHeight: '20px', outline: "none", boxShadow: "none", }}>
                <DropdownButton
                  variant="outline-secondary"
                  title={selectedOption}
                  id="input-group-dropdown-1"
                  size="sm"
                  onSelect={(eventKey, event) => handleDropdownChange(eventKey)}
                >
                  <Dropdown.Item eventKey="Articles">Articles</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="Customers">Customers</Dropdown.Item>
                </DropdownButton>
                <InputGroup.Text style={{ backgroundColor: "transparent", borderRight: "none" }}><AiOutlineSearch onClick={handleSearch} /></InputGroup.Text>
                <Form.Control
                  style={{ backgroundColor: "transparent", borderLeft: "none", boxShadow: "none", height: 'fit-content', outline: "none", borderColor: "#dee2e6" }}
                  placeholder={`Chercher des ${selectedOption.toLowerCase()}`}
                  aria-label="Text input with dropdown button"
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
              </InputGroup>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-3 d-none d-md-block d-xl-none d-lg-none" ></div>
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
