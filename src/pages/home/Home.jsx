import { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import ArticleGridDs from "../../components/article-archetype/ArticleGridDs";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import CatNav from "../../components/CatNav";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../store/slices/categoriesSlice";
import { fetchArticlesByCategory } from "../../services/fetchData";

const Home = () => {


  const dispatch = useDispatch();

  const params = useParams();
  const articles = useSelector((state) => state.article.articles);

  // useEffect(() => {
  //   dispatch(selectCategory({ id_cat: params.categoryId }));
  // }, [dispatch, params.categoryId]);

  // localStorage.setItem('selectedCategory', JSON.stringify({ id_cat: params.categoryId }));
  // // }, [params.categoryId, dispatch]);



  // console.log("selectedCategory storage : ", JSON.parse(localStorage.getItem('selectedCategory')));


  // useEffect(() => {


  //   if (params.categoryId) {
  //     // const selectedCat = categories.find((category) => category.id_cat === categoryId);
  //     dispatch(selectCategory({ id_cat: params.categoryId }));
  //     dispatch(fetchArticlesByCategory(params.categoryId)); //
  //   }






  // }, [dispatch, params.categoryId]);


  // dispatch(selectCategory({ id_cat: 6 }));


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

        <CatNav />
        <HeroSliderTen />


        <ArticleGridDs />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
