
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import SectionTitle from "../SectionTitle";
import { resetSelectedCategory, selectCategory, setCategories } from "../../store/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../../store/slices/articlesSlice";
import { Fragment, useEffect, useState } from "react";
import { fetchArticles, fetchArticlesByCategory, fetchCategories, fetchCst, fetchPackages, fetchSellers } from "../../services/fetchData";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import ArticleGridDsTwo from "./ArticleGridDsTwo";
import HeroSliderTen from "../../wrappers/hero-slider/HeroSliderTen";
import { useLocation } from "react-router-dom";
import { fetchUser, setUser } from "../../store/slices/userSlice";
import { useArticleSelector, useCategorySelector, useCurrentUserSelector, usePropsSelectore, useRecSelector } from "../../store/selectors/selectors";
import ArticleMarqueGrid from "./articles-marque/ArticleMarqueGrid";
import ArticlePkgTwo from "./ArticlePkgTwo";
import LayoutOne from "../../layouts/LayoutOne";

import { makeStyles } from '@mui/styles';
import { Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import LayoutPkg from "../../layouts/LayoutPkg";

const containerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
};

const listItemStyle = {
    padding: '16px',

};

const avatarStyle = {
    marginRight: '16px', // Adjust the margin as needed
};

const buttonStyle = {
    marginLeft: '650px', // Push the button to the right end
};
const ArticlePkg = ({ limit }) => {


    const dispatch = useDispatch();



    const csts = useSelector((state) => state.cst.csts);



    const iArticles = useSelector((state) => state.article.articles);



    const location = useLocation();



    const str = location.pathname;
    const arr = str.split('/');
    const lastSubstring = arr[arr.length - 1];
    const lastCharacter = parseInt(lastSubstring.slice(-1));
    console.log("lastCharacter Id", lastCharacter);



    // const pkgs = useSelector((state) => state.pkg.pkgs);
    // console.log("pkgs", pkgs);


    console.log("pkgs", localStorage.getItem("pkgs"));
    const storedPkgsString = localStorage.getItem("pkgs");
    let parsedPkgs

    if (storedPkgsString) {
        parsedPkgs = JSON.parse(storedPkgsString);
        console.log("pkgs", parsedPkgs);
    } else {
        console.log("pkgs is not stored in localStorage");
    }

    // Retrieve the string from localStorage
    // const pkgs = localStorage.getItem("pkgs");

    // if (pkgs) {
    //     // Parse the JSON string to get the object
    //     const parsedPkgs = JSON.parse(pkgs);

    //     // Now, you can access the object properties and log them
    //     console.log("pkgs parsed", parsedPkgs);
    // } else {
    //     console.log("pkgs is not stored in localStorage");
    // }


    // const pkgs = localStorage.getItem("pkgs")


    const currentPkg = parsedPkgs ? parsedPkgs.find(pkg => (pkg.id_red === lastCharacter)) : null

    const cstPkg = csts ? csts.find(cst => (cst.id === currentPkg.seller)) : null
    console.log("cstPkg", cstPkg);
    let pkgSellers = null
    if (cstPkg) {
        pkgSellers = iArticles ? iArticles.filter(article => (article.customer_id === cstPkg.id) && (article.stock != 0)) : null

    }



    console.log("cstPkg", cstPkg);
    console.log("iArticles", iArticles);
    console.log("pkgSellers", pkgSellers);


    const listPkg = useSelector((state) => state.lpkg.lpackages)


    const sendPkg = () => {
        console.log("listPkg", listPkg);
    }


    const lot_length = listPkg.length
    let red_value = 0

    if (listPkg.length > 0) {
        // perform action
        listPkg.map((item, index) => (
            red_value = parseFloat(red_value) + parseFloat(item.price)
        ))
    }


    console.log("lot_length", lot_length);


    console.log(" pkgSellers[0].customer_id", pkgSellers[0].customer_id);

    const pkgs = useSelector((state) => state.pkg.pkgs);



    const filteredPkgs = pkgs.filter(pkg => pkg.seller === pkgSellers[0].customer_id);


    console.log("filteredPkgs", filteredPkgs);

    const reductions = filteredPkgs.reductions

    console.log("reductions", reductions);


    return (
        <Fragment>

            <LayoutPkg >
                <div className="product-area pb-60 section-padding-1">
                    <div className="container">


                        bundleId :     {lastCharacter}

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ fontSize: '26px' }}>Acheter des lots</div>
                                <div style={{ fontSize: '15px' }}>Les réductions sur les lots s'appliquent uniquement sur les articles qui sont sans réduction : les réductions ne s'additionnent pas.</div>
                            </div>
                        </div>


                        {pkgSellers ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>


                            <ArticlePkgTwo
                                articles={pkgSellers}
                                spaceBottomClass="mb-25 "
                            />

                            <div style={containerStyle}>
                                <Container maxWidth="lg">
                                    <List style={{ display: 'flex', flexDirection: 'row' }} disablePadding>
                                        <ListItem>{red_value} €</ListItem>
                                        {listPkg.length > 0 &&
                                            listPkg.map((item, index) => (
                                                <ListItem sx={{ width: "10%" }} key={index} style={listItemStyle} disableGutters>
                                                    <ListItemAvatar style={avatarStyle}>
                                                        <Avatar src={item.images[0].image} />
                                                        {/* Replace "item.imageUrl" with the URL of the image you want to display */}
                                                    </ListItemAvatar>                                                    {/* Replace "item.name" with the property you want to display */}
                                                </ListItem>
                                            ))}

                                        <ListItem style={buttonStyle}>
                                            <Button onClick={sendPkg} variant="contained" style={{ color: 'white', backgroundColor: "#008080" }}>
                                                Créer un lot
                                            </Button>
                                        </ListItem>
                                    </List>
                                </Container>
                            </div>

                        </div> : <span></span>}
                    </div>
                </div >
            </LayoutPkg>
        </Fragment>
    );
};

ArticlePkg.propTypes = {

    limit: PropTypes.number
};

export default ArticlePkg;
