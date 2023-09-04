import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchArticleById, fetchArticlesByCategory } from "../../services/fetchData";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "./productslider/ProductDescriptionTab";
import ProductImageDescription from "./productslider/ProductImageDescription";
import RelatedProductSlider from "./productslider/RelatedProductSlider";

const ProductTabRight = () => {
  let { articleId } = useParams();
  let { pathname } = useLocation();
  const [detailsarticle, setDetailsArticle] = useState(null);
  const dispatch = useDispatch();
  const currentArticle = useSelector((state) => state.article.articleDetail);
  const allArticles = useSelector((state) => state.article.articles);
  const [filteredArticles,setFilteredArticles] = useState([])

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  // Ensure that currentCategory is correctly assigned or handle null values
  const currentCategory = currentArticle ? currentArticle.categorie : null;

  // Define an array to store filtered related articles
  // let filteredArticles = [];

  useEffect(() => {
    // Fetch related articles by category if the current category is available
    if (currentCategory) {
      // Filter articles based on related_article IDs and category
      const filtered = allArticles.filter((article) =>
         article.categorie === currentCategory
        
      );
      console.log("useeffect articles:", filtered)
      setFilteredArticles(filtered)
    }
  }, [dispatch, currentCategory, currentArticle, allArticles, articleId]);
  console.log("actual article:", currentArticle)
  console.log("actualcat:", currentCategory)
  console.log("filtered articles:", filteredArticles)
  // console.log("id of articles:", related_articles)
  return (
    <div>
      {currentArticle ? (
        <Fragment>
          <SEO
            titleTemplate="Product Page"
            description="Product page of flone react minimalist eCommerce template."
          />

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
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={currentArticle}
              galleryType="rightThumb"
            />

            {/* product description tab */}
            <ProductDescriptionTab
              spaceBottomClass="pb-90"
              productFullDesc={currentArticle.description}
            />
        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          product={currentArticle}
        />
            
          </LayoutOne>
        </Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductTabRight;
