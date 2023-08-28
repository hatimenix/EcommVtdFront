import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ArticleGridDs from "../../components/article-archetype/ArticleGridDs";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";

const Home = () => {
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
        <HeroSliderTen />

        <ArticleGridDs />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
