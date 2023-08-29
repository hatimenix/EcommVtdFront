import React, { Fragment, useState, useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { fetchArticleById, fetchArticlesdetails } from "../../services/fetchData";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";

const Articledetails = () => {
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
    

  // useEffect(() => {
  //   // Fetch data and update the state
  //   fetchArticlesdetails(id_art)
  //     .then((articles) => {
  //       setDetailsArticle(articles);
  //       console.log("test:", articles);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching articles:', error);
  //     });
  // }, [dispatch, id_art]);

  // console.log("details:", typeof detailsarticle);

  return (
    <div>
      {articles ? (
        <Fragment>
          <SEO
            titleTemplate="Product Page"
            description="Product Page of flone react minimalist eCommerce template."
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
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={articles}
        />
        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={articles.description}
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={articles.categorie}
        />         */}

          </LayoutOne>    
        </Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    // <div>
    //         {articles ? ( // Check if article is not null before accessing its properties
    //             <>
    //                 <h2>titre = {articles.titre}</h2>
    //                 {/* Display other article details */}
    //                 {/* <h2>Categorie  = {matchingCategory.titre}</h2> */}

    //                 <h3>Images:</h3>
    //                 {articles.images.map((image) => (
    //                     <img
    //                         key={image.id}
    //                         src={image.image}
    //                         alt={`Image ${image.id}`}
    //                         style={{ maxWidth: '100%', marginBottom: '10px', width: "200px" }}
    //                     />
    //                 ))}

    //                 <h3>Prix vente : {articles.prix_vente}</h3>
    //             </>
    //         ) : (
    //             <p>Loading article...</p>
    //         )}
    //     </div>
  );
};

export default Articledetails;
