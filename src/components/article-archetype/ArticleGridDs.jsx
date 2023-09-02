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
import { useLocation } from "react-router-dom";

const ArticleGridDs = ({ limit }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categorie.categories);
    const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
    const articles = useSelector((state) => state.article.articles);
    const iArticles = useSelector((state) => state.article.articles);
    const iCategories = useSelector((state) => state.categorie.categories);

    const csts = useSelector((state) => state.cst.csts);
    const location = useLocation();

    console.log("all articles : ", articles);


    console.log("current location , ", location.pathname);


    const str = location.pathname;
    const arr = str.split('/');
    const lastSubstring = arr[arr.length - 1];
    const lastCharacter = parseInt(lastSubstring.slice(-1));




    useEffect(() => {
        // Fetch CST data
        dispatch(fetchCst());


        if (str === '/') {
            localStorage.removeItem('selectedCategory');
            dispatch(resetSelectedCategory()); // Reset the selected category in the store as well
        } else

            if (lastCharacter) {
                const isDifferentCategory = !selectedCategory || selectedCategory.id_cat !== lastCharacter;

                if (isDifferentCategory) {
                    dispatch(fetchArticlesByCategory(lastCharacter));
                    dispatch(selectCategory({ id_cat: lastCharacter }));
                }
            }


    }, [dispatch, selectedCategory, lastCharacter]);




    const category = dispatch(selectCategory(selectedCategory));
    let catId = 0

    if (category.payload == null) {
        catId = null;
    } else {
        catId = category.payload.id_cat
    }


    console.log("catId", catId);


    const selectedCat = categories.find((category) => category.id_cat === lastCharacter || category.id_cat === catId);


    const cLoc = useLocation()
    const cRoad = cLoc.pathname

    console.log('current path === ', cRoad);

    const [catTitle, setCatTitle] = useState("");

    useEffect(() => {
        if (selectedCat == undefined) {
            setCatTitle("Catégorie Undefined ")
        } else {
            setCatTitle(selectedCat.titre)
        }
    }, [selectedCat]);
    console.log(catTitle);


    return (
        <div className="product-area pb-60 section-padding-1">
            <div className="container-fluid">




                {/* <FeatureIconTwo spaceTopClass="pt-70" spaceBottomClass="pb-60" /> */}


                {true ?

                    <>
                        <SectionTitle
                            titleText="Recommandé pour toi"
                            // subTitleText="Latest arrivals & offers "
                            // positionClass="text-center"
                            spaceClass="mb-20 mt-80"
                        />



                        {cRoad !== '/' ?
                            <>
                                <SectionTitle
                                    titleText={catTitle}
                                    // subTitleText="Latest arrivals & offers "
                                    // positionClass="text-center"
                                    spaceClass="mb-20"
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
                            </>

                            : <></>

                        }


                        <SectionTitle
                            titleText="Fil d'actu"
                            // subTitleText="Latest arrivals & offers "
                            // positionClass="text-center"
                            spaceClass="mb-20"
                        />

                        <div className="row five-column">
                            <ArticleGridDsTwo
                                articles={iArticles}
                                categories={iCategories}
                                csts={csts}
                                limit={limit}
                                spaceBottomClass="mb-25"
                            />
                        </div>



                    </>
                    : <p>ijsi</p>





                }
            </div>
        </div>
    );
};

ArticleGridDs.propTypes = {

    limit: PropTypes.number
};

export default ArticleGridDs;
