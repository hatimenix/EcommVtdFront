import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../../components/seo";
import LayoutOne from "../../../layouts/LayoutOne";
import Breadcrumb from "../../../wrappers/breadcrumb/Breadcrumb";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "./product/ProductDescriptionTab";
import ProductImageDescription from "./product/ProductImageDescription";

const DetailsArtice = () => {
  let { pathname } = useLocation();
  let { id } = useParams();

  const location = useLocation();
  //   const { products } = useSelector((state) => state.product);
  //   const product = products.find(product => product.id === id);

  return (
    <Fragment>
      {/* <SEO
        titleTemplate="Product Page"
        description="Product page of flone react minimalist eCommerce template."
      /> */}

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        {/* product description with image */}
        <ProductImageDescription
          id_art={location.state.id_art}
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          //   product={product}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          id_art={location.state.id_art}
          spaceBottomClass="pb-90"
          //   productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default DetailsArtice;
