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
import { addToList, deleteFromList } from '../../store/slices/listPkgSlice';
import { fetchCst } from '../../services/fetchData';


const ArticlePkgSingleTwo = ({
    article,
    cartItem,
    wishlistItem,
    compareItem,
    spaceBottomClass,
    colorClass,
    titlePriceClass,

    onAddRemoveArticle

}) => {
    const [hovered, setHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false); // Added state

    const [likeCount, setLikeCount] = useState(0);
    const [heartSolid, setHeartSolid] = useState(true);
    const currentUser = useCurrentUserSelector()

    const listPkg = useSelector((state) => state.lpkg.lpackages)


    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    const [list, setList] = useState([]); // initialize the state with a list


    const csts = useSelector((state) => state.cst.csts);

    useEffect(() => {
        // Fetch CST data
        dispatch(fetchCst());




    }, [dispatch]);

    const toggleLike = () => {
        if (heartSolid) {
            setLikeCount(likeCount + 1);
        } else {
            setLikeCount(likeCount - 1);
        }
        setHeartSolid(!heartSolid);
    };

    useEffect(() => {
        axios.get(`https://el-bal.ma/article-likes-count/`)
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



    const storedCstsString = localStorage.getItem("csts");
    let parsedCsts

    if (storedCstsString) {
        parsedCsts = JSON.parse(storedCstsString);
        console.log("csts parsed", parsedCsts);
    } else {
        console.log("csts is not stored in localStorage");
    }

    console.log("cstrsttststtss", storedCstsString);


    const correspondingSeller = parsedCsts.find(c => c.id === article.customer_id);

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
        fetch(`https://el-bal.ma/tracked-articles/track_article_click/?article_id=${articleId}&customer_id=${customerId}`)
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

    // initialize the state with a list



    const handleAddRemoveArticle = () => {
        if (isAdded || listPkg.find(pkg => (pkg.id_art === article.id_art))) {
            // If it's added, remove it from the list
            setIsAdded(false);
            console.log("article.id_art", article.id_art)
            dispatch(deleteFromList(article.id_art))

        } else {
            // If it's not added, add it to the list
            setIsAdded(true);
            // console.log("article", article);
            dispatch(addToList(article))

        }
    };

    const removeArticle = (article) => {
        setList((prevList) => prevList.filter((item) => item.titre !== article.titre));
    };

    const addArticle = (article) => {
        setList((prevList) => [...prevList, article]);
    };
    // console.log("list", list);

    // console.log("listPkg", listPkg[0].arPkg);
    return (


        <>
            <Fragment >



                <div
                    className={clsx('product-wrap-2', spaceBottomClass, colorClass, { 'out-of-stock': isOutOfStock })}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* <div style={avatarStyle}>
                        <img src={correspondingSeller.image} alt={correspondingSeller.name} width="40" height="40" />

                    </div>
                    <div style={sellerNameStyle}>{correspondingSeller.first_name}</div> */}

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




                    </div>




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

                            <div className="price-sell">
                                {/* <Button style={{ border: "2px solid red", width: "230px", color: 'red' }} variant="contained" disableElevation>
                                    Supprimer
                                </Button>                            </div>

                            <div className="price-sell">
                                <Button style={{ border: "2px solid green", width: "230px", color: 'green' }} variant="contained" disableElevation>
                                    Ajouter
                                </Button>                      
                                */}

                                {/* {console.log("article", article)} */}

                                <Button
                                    style={isAdded || listPkg.find(pkg => (pkg.id_art === article.id_art)) ? { border: '2px solid red', width: '230px', color: 'red' } : { border: '2px solid green', width: '230px', color: 'green' }}
                                    variant="contained"
                                    disableElevation
                                    onClick={handleAddRemoveArticle}
                                >
                                    {isAdded || listPkg.find(pkg => (pkg.id_art === article.id_art)) ? 'Supprimer' : 'Ajouter'}
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>




            </Fragment>

        </>
    );
};

ArticlePkgSingleTwo.propTypes = {
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

export default ArticlePkgSingleTwo;
