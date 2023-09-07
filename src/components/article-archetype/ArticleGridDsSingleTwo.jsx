import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../assets/css/CustomCarousel.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solIc } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regIc } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { fetchLikeCounts } from '../../store/slices/favoriteSlice';
import { BsShieldCheck } from 'react-icons/bs';
import ArticleModal from './article-modal-view/ArticleModal';
import fadeAnimationHandler from './animationHandler/fadeAnimationHandler';
import { Button } from 'react-bootstrap';
import { fetchUser } from '../../store/slices/userSlice';
import { useCurrentUserSelector } from '../../store/selectors/selectors';


const ArticleGridDsSingleTwo = ({
    article,
    cartItem,
    wishlistItem,
    compareItem,
    spaceBottomClass,
    colorClass,
    titlePriceClass,

}) => {
    const [hovered, setHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();

    const [likeCount, setLikeCount] = useState(0);
    const [heartSolid, setHeartSolid] = useState(true);
    const currentUser = useCurrentUserSelector()

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);


    const csts = useSelector((state) => state.cst.csts);


    const toggleLike = () => {
        if (heartSolid) {
            setLikeCount(likeCount + 1);
        } else {
            setLikeCount(likeCount - 1);
        }
        setHeartSolid(!heartSolid);
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/article-likes-count/`)
            .then(response => {
                const likesCounts = response.data;
                if (article.id_art in likesCounts) {
                    setLikeCount(likesCounts[article.id_art]);
                }
            })
            .catch(error => {
                console.error('Error fetching likes count:', error);
            });
    }, [article.id_art]);



    const handleLikeClick = () => {
        setIsLiked(prevLiked => !prevLiked);
        likeCount++
    };


    const [modalShow, setModalShow] = useState(false);


    const isOutOfStock = article.stock <= 0;

    const correspondingSeller = csts.find(c => c.id === article.customer_id);

    if (!correspondingSeller) {
        return null;
    }

    const avatarStyle = {
        position: 'absolute',
        top: '00px',
        left: '10px',
        width: '40px',
        height: '40px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '0px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
    };


    const sellerNameStyle = {
        position: 'absolute',
        top: '10px',
        right: '140px',
        fontSize: '12px',
    };

    const maxLength = 20; // Set your desired maximum length

    const text = article.titre;
    const shouldShowTooltip = text.length > maxLength;

    const tcTitle = shouldShowTooltip ? `${text.slice(0, maxLength)}...` : text;




    const tooltipContent = shouldShowTooltip ? (
        <Tooltip >
            {text}
        </Tooltip>
    ) : null;


    // Function to track the clicked article
    function trackArticleClick(articleId, customerId) {
        fetch(`http://127.0.0.1:8000/tracked-articles/track_article_click/?article_id=${articleId}&customer_id=${customerId}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Article click tracked successfully');
                } else {
                    console.error('Error tracking article click');
                }
            })
            .catch((error) => {
                console.error('Error tracking article click:', error);
            });
    }


    return (
        <Fragment>
            <div
                className={clsx('product-wrap-2', spaceBottomClass, colorClass, { 'out-of-stock': isOutOfStock })}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div style={avatarStyle}>
                    <img src={correspondingSeller.image} alt={correspondingSeller.name} width="40" height="40" />

                </div>
                <div style={sellerNameStyle}>{correspondingSeller.first_name}</div>

                <div style={{ marginTop: '50px' }} className="product-img">
                    <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art} onClick={() => trackArticleClick(article.id_art, currentUser.id)}>
                        <Carousel
                            autoPlay={false}
                            showArrows={false}
                            showIndicators={true}
                            showStatus={false}
                            showThumbs={false}
                            selectedItem={hovered ? 1 : 0}
                            animationHandler={fadeAnimationHandler} // Use the custom animation handler
                            className="carousel"
                        >
                            {article.images.map((image, index) => (
                                <div key={index} className="slide">
                                    <img style={{ width: "200px", height: "260px" }}
                                        src={image.image}
                                        alt={article.titre}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </Link>






                    <div className="product-action-2">
                        {'product.affiliateLink' ? (
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                title="Buy now"
                            >
                                {" "}
                                <i className="fa fa-shopping-cart"></i>{" "}
                            </a>
                        ) : 'product.variation' && 1 >= 1 ? (
                            <Link
                                to={`${process.env.PUBLIC_URL}/product/${1}`}
                                title="Select options"
                            >
                                <i className="fa fa-cog"></i>
                            </Link>
                        ) : 1 && 1 > 0 ? (
                            <button
                                onClick={() => console.log()}
                                className={
                                    cartItem !== undefined && 1 > 0
                                        ? "active"
                                        : ""
                                }
                                disabled={cartItem !== undefined && 1 > 0}
                                title={
                                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                                }
                            >
                                {" "}
                                <i className="fa fa-shopping-cart"></i>{" "}
                            </button>
                        ) : (
                            <button disabled className="active" title="Out of stock">
                                <i className="fa fa-shopping-cart"></i>
                            </button>
                        )}

                        <button onClick={() => setModalShow(true)} title="Quick View">
                            <i className="fa fa-eye"></i>
                        </button>

                        <button
                            className={compareItem !== undefined ? "active" : ""}
                            disabled={compareItem !== undefined}
                            title={
                                compareItem !== undefined
                                    ? "Added to compare"
                                    : "Add to compare"
                            }
                            onClick={() => console.log()}
                        >
                            <i className="fa fa-retweet"></i>
                        </button>
                    </div>
                </div>


                {isOutOfStock && (
                    <div className="out-of-stock-container">
                        <div className="out-of-stock-icon">
                            <i className="fa fa-ban"></i>
                        </div>  &nbsp; &nbsp;
                        <div style={{ textAlign: 'center' }} className="out-of-stock-text">En rupture de stock</div>

                    </div>
                )}

                {!isOutOfStock && (
                    <div className="full-of-stock-container">
                        <div className="full-of-stock-icon">
                            <i style={{ color: "white" }} className="fa fa-ban"></i>
                        </div>  &nbsp; &nbsp;
                        <div className="full-of-stock-text"></div>

                    </div>
                )}


                <div className="product-content-2">
                    <div className={`title-price-wrap-2 ${titlePriceClass ? titlePriceClass : ''}`}>
                        <div className="title-likes-row"   >



                            <h3 className={isOutOfStock ? "article-title out-of-stock-text-reg" : "article-title"}>
                                <Link to={process.env.PUBLIC_URL + '/articles/' + article.id_art}
                                    onClick={() => trackArticleClick(article.id_art, currentUser.id)} // Pass the customer ID


                                >

                                    {shouldShowTooltip ? (
                                        <OverlayTrigger placement="top" overlay={tooltipContent}>
                                            <span>{tcTitle}</span>
                                        </OverlayTrigger>
                                    ) : (
                                        <span>{text}</span>
                                    )}

                                </Link>
                            </h3>

                            {true && (
                                <div className="heart-count-container">
                                    <FontAwesomeIcon
                                        icon={heartSolid ? regIc : solIc}
                                        className="heart-icon"
                                        onClick={toggleLike}
                                    />
                                    &nbsp;
                                    <span className="wishlist-count">{likeCount}</span>
                                </div>
                            )}
                        </div>
                        <div className="price-2">
                            {article.unit_prix !== undefined ? (
                                <span>{parseFloat(article.unit_prix).toFixed(2)} £</span>
                            ) : (
                                <span>Price not available</span>
                            )}
                        </div>
                        <div className="price-sell">
                            {article.prix_vente !== undefined ? (
                                <span>{parseFloat(article.prix_vente).toFixed(2)} £ incl. <BsShieldCheck /></span>
                            ) : (
                                <span>Price not available</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>


            <ArticleModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                article={article}
                product={article}

            />
        </Fragment>
    );
};

ArticleGridDsSingleTwo.propTypes = {
    cartItem: PropTypes.shape({}),
    compareItem: PropTypes.shape({}),
    wishlistItem: PropTypes.shape({}),
    article: PropTypes.shape({
        id_art: PropTypes.number.isRequired,
        titre: PropTypes.string.isRequired,
        unit_prix: PropTypes.string,
        stock: PropTypes.number.isRequired,

        images: PropTypes.arrayOf(
            PropTypes.shape({
                image: PropTypes.string.isRequired
            })
        ).isRequired
    }),
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    titlePriceClass: PropTypes.string,
};

export default ArticleGridDsSingleTwo;
