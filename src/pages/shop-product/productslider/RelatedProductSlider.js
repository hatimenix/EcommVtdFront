import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../../components/swiper";
import SectionTitle from "../../../components/section-title/SectionTitle";
import ProductGridSingle from "../../../components/product/ProductGridSingle";
import { getProducts } from "../../../helpers/product";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchCst } from "../../../services/fetchData";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const settings = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 4
    }
  }
};


const RelatedProductSlider = ({ spaceBottomClass, product }) => {


  const csts = useSelector((state) => state.cst.csts);

  const pkgs = useSelector((state) => state.pkg.pkgs);


  console.log("pkgs", pkgs);

  let { articleId } = useParams()
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.article.articleDetail);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  // const prods = getArticles(products, category);
  const currentArticle = useSelector((state) => state.article.articleDetail);
  const allArticles = useSelector((state) => state.article.articles);
  const [filteredArticles, setFilteredArticles] = useState([])
  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  // Ensure that currentCategory is correctly assigned or handle null values
  const currentCategory = currentArticle ? currentArticle.categorie : null;
  // const correspondingSeller = csts.find(c => c.id === currentArticle.customer_id);









  useEffect(() => {
    // Fetch CST data
    dispatch(fetchCst());





  }, [dispatch]);



  // Define an array to store filtered related articles
  // let filteredArticles = [];

  useEffect(() => {
    // Fetch related articles by category if the current category is available
    if (currentCategory) {
      // Filter articles based on related_article IDs and category
      const filtered = allArticles.filter((article) =>
        article.categorie === currentCategory && article.id_art !== currentArticle.id_art
      );

      // Check if the current article is in the filtered list
      const currentArticleIndex = filtered.findIndex(article => article.id_art === currentArticle.id_art);

      // If the current article is in the filtered list, remove it
      if (currentArticleIndex !== -1) {
        filtered.splice(currentArticleIndex, 1);
      }

      setFilteredArticles(filtered);
    }
  }, [dispatch, currentCategory, currentArticle, allArticles, articleId]);

  const correspondingSeller = csts ? csts.find(c => c.id === currentArticle.customer_id) : null;

  let lotArticles = null;

  if (correspondingSeller !== null) {
    lotArticles = allArticles ? allArticles.filter(ar => ar.customer_id === correspondingSeller.id) : null;
  }
  const lotArticlesLength = lotArticles !== null ? lotArticles.length : 0;

  console.log("lotArticlesLength", lotArticlesLength);


  const matchingPkgs = pkgs ? pkgs.filter(pkg => {
    return lotArticles ? lotArticles.some(article => article.customer_id === pkg.seller) : false;
  }) : [];

  console.log("matchingPkgs", matchingPkgs);


  let reduction = 0
  let firstMatchingPackage
  if (matchingPkgs.length > 0) {
    firstMatchingPackage = matchingPkgs[0];
    reduction = firstMatchingPackage.reduction;
    console.log("reduction of the first matching package:", reduction);
  } else {
    console.log("No matching packages found.");
  }



  // const articles_lotArray = Array.isArray(csts)
  //   ? csts.map(cstsItem => {
  //     const matchingArticle = allArticles.find(article => article.customer_id === cstsItem.id);
  //     return matchingArticle ? matchingArticle : null;
  //   })
  //   : [];

  // console.log("correspondingSeller", correspondingSeller);

  // console.log("Filtered Articles (prods):", filteredArticles);


  const nav = useNavigate()



  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      {currentArticle ? (

        <>
          {
            firstMatchingPackage ?
              (
                <Card sx={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', }}>
                  <CardContent style={{ flex: '1' }}>
                    <Typography color={"gray"} gutterBottom variant="h9" component="div">
                      {lotArticlesLength} Articles disponibles
                    </Typography>
                    <Typography variant="body2">
                      Acheter un lot
                    </Typography>
                    <Typography variant="h6">
                      Jusqu'a {reduction} % de réduction
                    </Typography>
                  </CardContent>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CardActions>
                      <Button onClick={() => nav(`/bundles/${firstMatchingPackage.id_red}`)} style={{ color: 'white', backgroundColor: "#008080" }} size="small">Acheter</Button>
                      {/* <Link to={process.env.PUBLIC_URL + '/bundles/' + firstMatchingPackage.id_red}>test</Link> */}
                    </CardActions>
                  </div>
                </Card>

              ) : ''

          }





          <div className="container">
            <SectionTitle
              titleText="Related Products"
              positionClass="text-center"
              spaceClass="mb-50"
            />
            {filteredArticles.length > 0 ? (
              <div className="related-articles">
                <Swiper options={settings}>
                  {filteredArticles.map((product) => (
                    <SwiperSlide key={product.id_art}>
                      <ProductGridSingle
                        product={product}
                        currency={currency}
                      // cartItem={
                      //   cartItems.find((cartItem) => cartItem.id === product.id_art)
                      // }
                      // wishlistItem={
                      //   wishlistItems.find(
                      //     (wishlistItem) => wishlistItem.id === product.id_art
                      //   )
                      // }
                      // compareItem={
                      //   compareItems.find(
                      //     (compareItem) => compareItem.id === product.id_art
                      //   )
                      // }
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : null}
          </div>
        </>
      ) : ("")}
    </div>
  );
};
RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default RelatedProductSlider;
