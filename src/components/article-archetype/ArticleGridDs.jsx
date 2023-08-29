import PropTypes from "prop-types";

import SectionTitle from "../SectionTitle";
import { setCategories } from "../../store/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../../store/slices/articlesSlice";
import { useEffect, useState } from "react";
import { fetchArticles, fetchArticlesByCategory, fetchCategories, fetchCst, fetchSellers } from "../../services/fetchData";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import ArticleGridDsTwo from "./ArticleGridDsTwo";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";

const ArticleGridDs = ({ limit }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categorie.categories);
    const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
    const articles = useSelector((state) => state.article.articles);

    const csts = useSelector((state) => state.cst.csts);




    useEffect(() => {


        if (selectedCategory) {
            dispatch(fetchArticlesByCategory(selectedCategory.id_cat));

        }// 

        dispatch(fetchCst());






    }, [dispatch, selectedCategory]);








    return (
        <div className="product-area pb-60 section-padding-1">
            <div className="container-fluid">




                <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />

                <SectionTitle
                    titleText="Updates Hub"
                    subTitleText="Latest arrivals & offers "
                    positionClass="text-center"
                    spaceClass="mb-60"
                />
                <div className="row five-column">
                    <ArticleGridDsTwo
                        articles={articles}
                        categories={categories}
                        csts={csts}
                        selectedCategory={selectedCategory}
                        limit={limit}
                        spaceBottomClass="mb-25"
                    />
                </div>
            </div>
        </div>
    );
};

ArticleGridDs.propTypes = {

    limit: PropTypes.number
};

export default ArticleGridDs;
