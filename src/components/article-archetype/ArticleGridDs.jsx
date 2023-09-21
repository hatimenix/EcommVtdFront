import PropTypes from "prop-types";

import SectionTitle from "../SectionTitle";
import { resetSelectedCategory, selectCategory, setCategories } from "../../store/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setArticles, setLoadedArticles } from "../../store/slices/articlesSlice";
import { useEffect, useState } from "react";
import { fetchArticles, fetchArticlesByCategory, fetchCategories, fetchCst, fetchSellers } from "../../services/fetchData";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import ArticleGridDsTwo from "./ArticleGridDsTwo";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import { useLocation } from "react-router-dom";
import { fetchUser, setUser } from "../../store/slices/userSlice";
import { useArticleSelector, useCategorySelector, useCurrentUserSelector, usePropsSelectore, useRecSelector } from "../../store/selectors/selectors";
import ArticleMarqueGrid from "./articles-marque/ArticleMarqueGrid";

const ArticleGridDs = ({ limit }) => {






    const dispatch = useDispatch();







    const categories = useSelector((state) => state.categorie.categories);
    const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
    const articles = useSelector((state) => state.article.articles);
    const iArticles = useSelector((state) => state.article.articles);
    const iCategories = useSelector((state) => state.categorie.categories);

    const __articlesRec = useArticleSelector();
    // const __categoriesRec = useCategorySelector();

    const __recs = useRecSelector()


    const __props = usePropsSelectore()








    console.log("props", __props);

    const uniqueArticles = new Set(); // Create a Set to store unique articles
    const targetedCategories = new Set(); // Create a Set to store unique targeted categories

    // If __recs is an array
    if (Array.isArray(__recs)) {
        __recs.forEach(rec => {
            __props.forEach(prop => {

                const correspondingArticle = __articlesRec.find(article => (article.id_art === rec.article) || (article.id_art === prop.article));

                if (correspondingArticle) {
                    // Add the article's id or a unique identifier to the Set
                    uniqueArticles.add(correspondingArticle.id_art);
                    // Add the article's category to the targetedCategories Set
                    targetedCategories.add(correspondingArticle.categorie_id);
                }
            });
        })
    } else {
        console.log('Invalid __recs data.');
    }






    // Convert the Set back to an array of unique articles
    const targetedArticles = Array.from(uniqueArticles).map(id_art => {
        return __articlesRec.find(article => article.id_art === id_art);
    });

    // Now, you can filter articles from __articlesRec based on the targetedCategories
    const articlesWithSameCategory = __articlesRec.filter(article => {
        return targetedCategories.has(article.categorie_id);
    });


    console.log("articlesWithSameCategory", articlesWithSameCategory);

    // const correspondingArticle = __articlesRec.find(article => article.id_art === __recs.article);

    // console.log('art', correspondingArticle);
    const currentuser = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    const userHasTargetedArticles = targetedArticles.length > 0;
    const userHasClickedOnArticle = Array.isArray(__recs) && __recs.some(rec => rec.Customer === currentuser.id);



    const csts = useSelector((state) => state.cst.csts);


    const location = useLocation();



    const str = location.pathname;

    const arr = str.split('/');
    const lastSubstring = arr[arr.length - 1];
    const lastCharacter = parseInt(lastSubstring);


    console.log("lastCharacter", lastCharacter);




    useEffect(() => {
        // Fetch CST data
        dispatch(fetchCst());


        if (lastCharacter === '/') {
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




    const selectedCat = categories.find((category) => category.id_cat === lastCharacter || category.id_cat === catId);


    const cLoc = useLocation()
    const cRoad = cLoc.pathname
    const [catTitle, setCatTitle] = useState(undefined);




    useEffect(() => {
        if (selectedCat !== undefined) {
            setCatTitle(selectedCat.titre)
        }


    }, [selectedCat]);
    console.log(catTitle);




    // console.log('cuser', userData);


    // console.log('current user status ', currentUser.is_seller);


    console.log('TargetedARticles ', targetedArticles);



    const yourProp = currentuser.first_name; // Replace with your actual prop value
    const yourPayload = [/* Your payload data here */]; // Replace with your payload

    dispatch(setUser(yourProp, yourPayload));



    localStorage.getItem("number")




    const parf_cat = articles.filter((art) => art.categorie_id === 7)

    console.log("parf_catparf_cat", parf_cat);


    return (
        <div className="product-area pb-60 section-padding-1">

            {csts && <div className="container-fluid">
                {cRoad !== '/' ?
                    <>
                        <SectionTitle
                            titleText={catTitle ? catTitle : null}
                            // subTitleText="Latest arrivals & offers "
                            // positionClass="text-center"
                            spaceClass="mb-20 mt-40"
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



                {/* <FeatureIconTwo spaceTopClass="pt-70" spaceBottomClass="pb-60" /> */}


                {true ?


                    <>
                        {userHasTargetedArticles && userHasClickedOnArticle && (
                            <>
                                <SectionTitle
                                    titleText="Recommandé pour toi"
                                    // subTitleText="Latest arrivals & offers "
                                    // positionClass="text-center"
                                    spaceClass="mb-20 mt-80"
                                />
                                <div className="row five-column">
                                    <ArticleGridDsTwo
                                        articles={articlesWithSameCategory}
                                        // categories={iCategories}
                                        csts={csts}
                                        limit={limit}
                                        spaceBottomClass="mb-25"
                                    />
                                </div>

                            </>
                        )}




                        <SectionTitle
                            titleText="Recherche par marque"
                            // subTitleText="Latest arrivals & offers "
                            // positionClass="text-center"
                            spaceClass="mb-20 mt-30"
                        />

                        <div className="row five-column">
                            <ArticleMarqueGrid />
                        </div>


                        <SectionTitle
                            titleText="Fil d'actu"
                            // subTitleText="Latest arrivals & offers "
                            // positionClass="text-center"
                            spaceClass="mb-50 mt-30"
                        />

                        <div className="row five-column">
                            <ArticleGridDsTwo
                                articles={iArticles}
                                categories={iCategories}
                                csts={csts}
                                limit={limit}
                                spaceBottomClass="mb-25 "
                            />
                        </div>



                    </>
                    : <p>ijsi</p>





                }
            </div>}

        </div>
    );
};

ArticleGridDs.propTypes = {

    limit: PropTypes.number
};

export default ArticleGridDs;
