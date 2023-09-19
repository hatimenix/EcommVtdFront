import PropTypes from "prop-types";
import SectionTitle from "../SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCst } from "../../services/fetchData";
import ArticleGridDsTwo from "./ArticleGridDsTwo";
import { fetchUser } from "../../store/slices/userSlice";

const ArticleGridDs = ({ limit }) => {
    const dispatch = useDispatch();
    const initialDisplayedArticles = 10; // Initial number of articles to display
    const [displayedArticles, setDisplayedArticles] = useState(
        () => parseInt(localStorage.getItem("displayedArticles")) || initialDisplayedArticles
    );

    const iArticles = useSelector((state) => state.article.articles);
    const iCategories = useSelector((state) => state.categorie.categories);
    const currentuser = useSelector((state) => state.user);
    const csts = useSelector((state) => state.cst.csts);

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchCst());
    }, [dispatch]);

    useEffect(() => {
        const isInfiniteScrollEnabled = localStorage.getItem("infiniteScrollEnabled") === "true";

        if (isInfiniteScrollEnabled) {
            // Add a scroll event listener to trigger loadMoreArticles
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [displayedArticles]);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            displayedArticles < iArticles.length
        ) {
            // When the user has scrolled near the bottom and there are more articles to load
            setDisplayedArticles(displayedArticles + 10);
        }
    };

    const toggleInfiniteScroll = () => {
        // Toggle the infinite scroll flag in localStorage
        const isInfiniteScrollEnabled = localStorage.getItem("infiniteScrollEnabled") === "true";
        localStorage.setItem("infiniteScrollEnabled", !isInfiniteScrollEnabled);

        // If infinite scroll is enabled, add the scroll event listener
        if (!isInfiniteScrollEnabled) {
            window.addEventListener("scroll", handleScroll);
        } else {
            window.removeEventListener("scroll", handleScroll);
        }
    };

    const displayedArticleList = iArticles.slice(0, displayedArticles);

    return (
        <div className="product-area pb-60 section-padding-1">
            <div className="container-fluid">
                <SectionTitle titleText="Fil d'actu" spaceClass="mb-50 mt-30" />
                <button onClick={toggleInfiniteScroll}>Toggle Infinite Scroll</button>
                <div className="row five-column">
                    <ArticleGridDsTwo
                        articles={displayedArticleList}
                        categories={iCategories}
                        csts={csts}
                        limit={limit}
                        spaceBottomClass="mb-25"
                    />
                </div>
            </div>
        </div>
    );
};

ArticleGridDs.propTypes = {
    limit: PropTypes.number,
};

export default ArticleGridDs;
