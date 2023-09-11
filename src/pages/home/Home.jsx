import { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ArticleGridDs from "../../components/article-archetype/ArticleGridDs";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import CatNav from "../../components/nav-archetype/NavState";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../store/slices/categoriesSlice";
import { fetchArticlesByCategory } from "../../services/fetchData";
import NestedNav from "../../components/nav-archetype/NavState";
import ArticleGridDsBoosted from "../../components/article-archetype/ArticleGridDsBoosted";

const Home = () => {


  const dispatch = useDispatch();

  const params = useParams();
  const articles = useSelector((state) => state.article.articles);



  return (
    <Fragment>
      <SEO
        titleTemplate="Home"
        description="Home page."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >

        <NestedNav />
        <HeroSliderTen />


        <ArticleGridDs />
        <ArticleGridDsBoosted/>
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
