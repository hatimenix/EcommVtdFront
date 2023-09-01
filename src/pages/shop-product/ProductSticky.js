import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchArticleById} from "../../services/fetchData";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescriptionSticky from "../../wrappers/product/ProductImageDescriptionSticky";

const ProductSticky = () => {
  let { id_art, articleId } = useParams();
  let { pathname } = useLocation();
  const [detailsarticle, setDetailsArticle] = useState(null); // Initialize as null
  const dispatch = useDispatch();
  const  articles  = useSelector((state) => state.article.articleDetail);
  const  categories  = useSelector((state)=> state.article.categorie);
  console.log("current article:", articles)
  console.log("current cat:", categories)

    
useEffect(() => {
        dispatch(fetchArticleById(articleId));
    }, [dispatch, articleId]);
    

  return (
    <div>
      {articles ? (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* product description with image */}
        <ProductImageDescriptionSticky
          spaceTopClass="mt-100"
          spaceBottomClass="mb-100"
          product={articles}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={articles.description}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={articles.categorie}
        />
      </LayoutOne>
        </Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

ProductSticky.propTypes = {
  location: PropTypes.shape({})
};

export default ProductSticky;
