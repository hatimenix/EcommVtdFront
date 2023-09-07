import PropTypes from "prop-types";

import SectionTitle from "../SectionTitle";
import { resetSelectedCategory, selectCategory, setCategories } from "../../store/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../../store/slices/articlesSlice";
import { useEffect, useState } from "react";
import { fetchArticles, fetchArticlesByCategory, fetchCategories, fetchCst, fetchSellers } from "../../services/fetchData";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import ArticleGridDsTwo from "./ArticleGridDsTwo";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import { useLocation, useParams } from "react-router-dom";
import { fetchUser, setUser } from "../../store/slices/userSlice";
import { useArticleSelector, useCategorySelector, useCurrentUserSelector, usePropsSelectore, useRecSelector } from "../../store/selectors/selectors";

const ArticlePkg__ = ({ limit }) => {


    const { bundleId } = useParams();


    console.log("bundle Id", bundleId);

    const location = useLocation();



    const str = location.pathname;
    const arr = str.split('/');
    const lastSubstring = arr[arr.length - 1];
    const lastCharacter = parseInt(lastSubstring.slice(-1));



    return (
        <div className="product-area pb-60 section-padding-1">
            <div className="container-fluid">




                {/* <FeatureIconTwo spaceTopClass="pt-70" spaceBottomClass="pb-60" /> */}


                bundleId :     {lastCharacter}
            </div>
        </div>
    );
};

ArticlePkg__.propTypes = {

    limit: PropTypes.number
};

export default ArticlePkg__;
