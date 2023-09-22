import PropTypes from "prop-types";
import React, { Fragment } from "react";

const ArticleRating = ({ ratingValue }) => {
    const maxRating = 5;
    const filledStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - filledStars >= 0.5;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
        stars.push(<i className="fa fa-star yellow" key={i}></i>);
    }

    if (hasHalfStar) {
        stars.push(<i className="fa fa-star-half-o yellow" key={filledStars}></i>);
    }

    const emptyStarsCount = maxRating - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
        stars.push(<i className="fa fa-star-o" key={filledStars + (hasHalfStar ? 1 : 0) + i}></i>);
    }

    return <Fragment>{stars}</Fragment>;
};

ArticleRating.propTypes = {
    ratingValue: PropTypes.number
};

export default ArticleRating;