import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../../components/swiper";
import SectionTitle from "../../../components/section-title/SectionTitle";
import ProductGridSingle from "../../../components/product/ProductGridSingle";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { fetchArticleById } from "../../../services/fetchData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const settings = {
  loop: false,
  slidesPerView: 4,
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};

const RelatedProductSlider = ({ spaceBottomClass, category }) => {
  const { articleId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const articleDetail = useSelector((state) => state.article.articleDetail);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const allArticles = useSelector((state) => state.article.articles);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (articleDetail) {
      const currentCategory = articleDetail.categorie;
      if (currentCategory) {
        const filtered = allArticles.filter(
          (article) =>
            article.categorie === currentCategory && article.id_art !== articleDetail.id_art
        );
        setFilteredArticles(filtered);
      }
    }
  }, [articleDetail, allArticles]);

  const correspondingSeller = articleDetail
    ? allArticles.find((article) => article.customer_id === articleDetail.customer_id)
    : null;

  let lotArticles = null;

  if (correspondingSeller !== null) {
    lotArticles = allArticles ? allArticles.filter((ar) => ar.customer_id === correspondingSeller.id) : null;
  }
  const lotArticlesLength = lotArticles !== null ? lotArticles.length : 0;

  console.log("lotArticlesLength", lotArticlesLength);

  const matchingPkgs = lotArticles
    ? lotArticles.filter((article) => matchingPkgs.some((pkg) => article.customer_id === pkg.seller))
    : [];

  console.log("matchingPkgs", matchingPkgs);

  let reduction = 0;
  let firstMatchingPackage;

  if (matchingPkgs.length > 0) {
    firstMatchingPackage = matchingPkgs[0];
    reduction = firstMatchingPackage.reduction || null;

    console.log("reduction of the first matching package:", reduction);
  } else {
    console.log("No matching packages found.");
  }

  console.log("reduction", reduction);

  const maxPercentage = Array.isArray(reduction)
    ? reduction.reduce((max, item) => (item.pourcentage > max ? item.pourcentage : max), 0)
    : 0;

  console.log("maxPercentage", maxPercentage);

  return (
    <div className={clsx("related-product-area", spaceBottomClass)}>
      {articleDetail ? (
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
                    <ProductGridSingle product={product} currency={currency} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}
        </div>
      ) : (
        ""
      )}
      {firstMatchingPackage && articleDetail.stock > 0 ? (
        <Card
          sx={{ maxWidth: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardContent style={{ flex: "1" }}>
            <Typography color="textSecondary" gutterBottom variant="h5" component="div">
              {lotArticlesLength} Articles disponibles
            </Typography>
            <Typography variant="body2">Acheter un lot</Typography>
            <Typography variant="h6">
              Jusqu'à {maxPercentage ? maxPercentage : 0} % de réduction
            </Typography>
          </CardContent>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <CardActions>
              <Button
                onClick={() => navigate(`/bundles/${firstMatchingPackage.id_red}`)}
                style={{ color: "white", backgroundColor: "#008080" }}
                size="small"
              >
                Acheter
              </Button>
            </CardActions>
          </div>
        </Card>
      ) : null}
    </div>
  );
};

RelatedProductSlider.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default RelatedProductSlider;
