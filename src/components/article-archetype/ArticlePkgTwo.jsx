import React from 'react';
import PropTypes from 'prop-types';
import ArticleGridDsSingleTwo from './ArticleGridDsSingleTwo';
import ArticlePkgSingleTwo from './ArticlePkgSingleTwo';

const ArticlePkgTwo = ({
    articles,
    categories,
    csts,
    selectedCategory,
    limit,
    spaceBottomClass,
    colorClass,
    titlePriceClass,
}) => {
    const filteredArticles = articles.filter((article) => {
        if (!selectedCategory && !csts) {
            return true;
        }

        const isCategoryMatch = !selectedCategory || article.categorie_id === selectedCategory.id_cat;
        const isCsMatch = !csts || csts.some(cs => cs.id === article.customer_id);

        return isCategoryMatch && isCsMatch;
    });










    return (
        <>

            {filteredArticles.map((article) => (
                <div className="col-xl-4 col-md-6 col-lg-4 col-sm-6" key={article.id_art}>
                    <ArticlePkgSingleTwo
                        article={article}
                        // categories={categories}
                        // limit={limit}
                        spaceBottomClass={spaceBottomClass}
                        colorClass={colorClass}
                        titlePriceClass={titlePriceClass}

                    />
                </div>
            ))}
        </>
    );
};

ArticlePkgTwo.propTypes = {
    articles: PropTypes.array,
    categories: PropTypes.array,
    sellers: PropTypes.array,
    selectedCategory: PropTypes.object,
    limit: PropTypes.number,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    titlePriceClass: PropTypes.string,
};

export default ArticlePkgTwo;
