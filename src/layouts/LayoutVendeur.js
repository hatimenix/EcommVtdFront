import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderSix from "../wrappers/header/HeaderSix";
import FooterOne from "../wrappers/footer/FooterOne";
import ScrollToTop from "../components/template/scroll-to-top"

const LayoutVendeur = ({ children }) => {
  return (
    <Fragment>
      <HeaderSix layout="container-fluid" />
      {children}
      <FooterOne spaceTopClass="pt-100" spaceBottomClass="pb-70" />
      <ScrollToTop/>
    </Fragment>
  );
};

export default LayoutVendeur;

LayoutVendeur.propTypes = {
  children: PropTypes.node
};
