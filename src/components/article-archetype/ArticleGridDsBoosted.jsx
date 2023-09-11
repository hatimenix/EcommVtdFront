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
import { fetchUser } from "../../store/slices/userSlice";
import { useArticleSelector, useCategorySelector, useCurrentUserSelector, useRecSelector } from "../../store/selectors/selectors";
import ArticleGridDsTwoBoosted from "./ArticleGridDsTwoBoosted";

const ArticleGridDsBoosted = ({ limit }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categorie.categories);
    const selectedCategory = useSelector((state) => state.categorie.selectedCategory);
    const articles = useSelector((state) => state.article.articles);
    const boostedArt = useSelector((state) => state.boost.boosts);

    const __articlesRec = useArticleSelector();
    const __categoriesRec = useCategorySelector();

    const __recs = useRecSelector()
    console.log("boostedArt", boostedArt);



let targetedBoostedArticles = []; // Declare it as an empty array
const maxArticles = 4; // Set the maximum number of articles

// If boostedArt is an array
if (Array.isArray(boostedArt)) {
    // Use a Set to store unique articles
    const uniqueArticles = new Set();
    
    boostedArt.forEach(boost => {
        // Iterate through boosted articles
        boost.boosted_articles.forEach(article => {
            // Check if the article's id_art is not in the uniqueArticles set
            if (!uniqueArticles.has(article.id_art) && targetedBoostedArticles.length < maxArticles) {
                // Add the article to the uniqueArticles set and targetedBoostedArticles array
                uniqueArticles.add(article.id_art);
                targetedBoostedArticles.push(article);
            }
        });
    });
} else {
    console.log('Invalid boostedArt data.');
}


    console.log("targetedBoostedArticles", targetedBoostedArticles)
const targetedBoostedArticlesCount = targetedBoostedArticles.length;

console.log(`The count of targetedBoostedArticles is: ${targetedBoostedArticlesCount}`);
    // const correspondingArticle = __articlesRec.find(article => article.id === idToFind);







    const csts = useSelector((state) => state.cst.csts);
    const location = useLocation();



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




    const selectedCat = categories.find((category) => category.id_cat === lastCharacter || category.id_cat === catId);


    const cLoc = useLocation()
    const cRoad = cLoc.pathname
    const [catTitle, setCatTitle] = useState("");




    useEffect(() => {
        if (selectedCat == undefined) {
            setCatTitle("Catégorie Undefined ")
        } else {
            setCatTitle(selectedCat.titre)
        }
    }, [selectedCat]);
    console.log(catTitle);


    const currentuser = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    // console.log('cuser', userData);


    // console.log('current user status ', currentUser.is_seller);


    return (
        <div className="product-area pb-60 section-padding-1">
            <div className="container-fluid">




                {/* <FeatureIconTwo spaceTopClass="pt-70" spaceBottomClass="pb-60" /> */}


                {true ?


                    <>

                      
                        <p>count {targetedBoostedArticlesCount }</p>

                        <SectionTitle
                            titleText="Articles Populaires"
                            // subTitleText="Latest arrivals & offers "
                            // positionClass="text-center"
                            spaceClass="mb-20"
                        />

                        <div className="row five-column">
                            <ArticleGridDsTwoBoosted
                                articles={targetedBoostedArticles}
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

ArticleGridDsBoosted.propTypes = {

    limit: PropTypes.number
};

export default ArticleGridDsBoosted;
