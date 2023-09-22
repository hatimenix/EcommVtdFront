
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
import { Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Typography } from '@mui/material';
import LayoutPkg from "../../layouts/LayoutPkg";
import { createPackage } from "../../store/actions/packageActions";

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
    // marginLeft: '300px', // Push the button to the right end
    position: 'fixed',
    bottom: 0,
    left: 0,
};
const ArticlePkg = ({ limit }) => {


    const dispatch = useDispatch();





    const csts = useSelector((state) => state.cst.csts);

    useEffect(() => {
        // Fetch CST data
        dispatch(fetchCst());




    }, [dispatch]);

    console.log("csts gsgs", csts);

    const pkgs = useSelector((state) => state.pkg.pkgs);


    const lots = useSelector((state) => state.lot.lots);




    const iArticles = useSelector((state) => state.article.articles);
    // console.log("lots", lots);

    const storedLotsString = localStorage.getItem("lots");
    let parsedLots

    if (storedLotsString) {
        parsedLots = JSON.parse(storedLotsString);
        console.log("lots", parsedLots);
    } else {
        console.log("lots is not stored in localStorage");
    }



    const location = useLocation();



    const str = location.pathname;
    const arr = str.split('/');
    const lastSubstring = arr[arr.length - 1];
    const lastCharacter = parseInt(lastSubstring.slice(-1));
    console.log("lastCharacter Id", lastCharacter);



    // const pkgs = useSelector((state) => state.pkg.pkgs);
    // console.log("pkgs", pkgs);


    console.log("pkgs", localStorage.getItem("pkgs"));

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa", localStorage.getItem("articles"));
    const storedPkgsString = localStorage.getItem("pkgs");
    let parsedPkgs

    if (storedPkgsString) {
        parsedPkgs = JSON.parse(storedPkgsString);
        console.log("pkgs", parsedPkgs);
    } else {
        console.log("pkgs is not stored in localStorage");
    }


    const storedArtsString = localStorage.getItem("articles");
    let parsedArts

    if (storedArtsString) {
        parsedArts = JSON.parse(storedArtsString);
        console.log("articles", parsedArts);
    } else {
        console.log("articles is not stored in localStorage");
    }



    const storedCstsString = localStorage.getItem("csts");
    let parsedCsts

    if (storedCstsString) {
        parsedCsts = JSON.parse(storedCstsString);
        console.log("csts parsed", parsedCsts);
    } else {
        console.log("csts is not stored in localStorage");
    }

    console.log("cstrsttststtss", storedCstsString);



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

    console.log("currentPkg", currentPkg);

    const cstPkg = parsedCsts ? parsedCsts.find(cst => (cst.id === currentPkg.seller)) : null
    console.log("cstPkg", cstPkg);
    let pkgSellers = null
    if (cstPkg) {
        pkgSellers = parsedArts ? parsedArts.filter(article => (article.customer_id === cstPkg.id) && (article.stock != 0)) : null

    }



    console.log("cstPkg", cstPkg);
    console.log("iArticles", iArticles);
    console.log("pkgSellers", pkgSellers);


    const listPkg = useSelector((state) => state.lpkg.lpackages)
    const ar_set = listPkg.map(item => item.id_art);

    console.log("listPkg", listPkg);

    console.log("ar_set", ar_set);


    const currentUser = useCurrentUserSelector()



    const lot_length = listPkg.length
    let red_value = 0



    console.log("lot_length", lot_length);


    console.log(" pkgSellers[0].customer_id", pkgSellers[0].customer_id);





    const filteredPkgs = parsedPkgs.filter(pkg => pkg.seller === pkgSellers[0].customer_id);


    console.log("filteredPkgs", filteredPkgs);

    const reductions = filteredPkgs[0].reduction

    console.log("reductions", reductions);

    const red2 = reductions.find(reduction => reduction.nbr_article === 2);
    const red3 = reductions.find(reduction => reduction.nbr_article === 3);
    const red5 = reductions.find(reduction => reduction.nbr_article === 5);



    console.log("Reduction with nbr_article = 2:", red2);


    let red_apply, red = 0


    if (listPkg.length > 0) {
        // perform action
        listPkg.map((item, index) => (
            red_value = parseFloat(red_value) + parseFloat(item.price)
        ))

        if (listPkg.length === 2) {
            red_apply = (red_value * red2.pourcentage) / 100

            red = red_value - red_apply



            console.log("red2222222222222222222", red);
        }


        else if (listPkg.length === 3) {

            red_apply = (red_value * red3.pourcentage) / 100

            red = red_value - red_apply

            console.log("red333333333333333333", red);


        } else if (listPkg.length === 5) {

            red_apply = (red_value * red5.pourcentage) / 100

            red = red_value - red_apply


            console.log("red5555555555555555", red);

        } else {
            red = red_value
        }
    }

    console.log("listPkg", listPkg, currentUser.first_name);

    console.log("parsedLotsparsedLots", parsedLots);

    const sendPkg = (event) => {
        console.log("listPkg", listPkg, currentUser.first_name);


        event.preventDefault();
        const packageData = {
            pack_price: red_value,
            customer_id: currentUser.id,
            pack_articles: ar_set,
        };


        const packageRedData = {
            pack_price: red,
            customer_id: currentUser.id,
            pack_articles: ar_set,
        };

        const isMatchingPackage = listPkg.some(pkg => {
            // Check if the current package in listPkg matches any package in parsedLots
            return parsedLots.some(parsedLot => {
                // Define your matching criteria here. For example, compare pack_price and customer_id.
                return (
                    pkg.pack_price === parsedLot.pack_price &&
                    pkg.customer_id === parsedLot.customer_id
                );
            });
        });


        if (isMatchingPackage) {
            // Stop the click event if a matching package is found
            console.log("Matching package found, click event stopped.");
            return;
        }



        if (listPkg.length > 2) {
            dispatch(createPackage(packageRedData));

        } else {
            dispatch(createPackage(packageData));

        }




    }




    return (
        <Fragment>

            <LayoutPkg >
                <div className="product-area pb-60 section-padding-1">
                    <div className="container">


                        {/* bundleId :     {lastCharacter} */}

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ fontSize: '26px' }}>Acheter des lots</div>
                                <div style={{ fontSize: '15px' }}>Les réductions sur les lots s'appliquent uniquement sur les articles qui sont sans réduction : les réductions ne s'additionnent pas.</div>
                            </div>
                        </div>


                        {pkgSellers && <div className="container-fluid">
                            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> */}

                            <div className="row five-column">
                                <ArticlePkgTwo
                                    articles={pkgSellers}
                                    spaceBottomClass="mb-25 "
                                />

                                <div style={containerStyle}>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        {listPkg.length < 2 ? <Typography>{red_value}   €</Typography> : <Typography>
                                            <Typography sx={{ textDecoration: 'line-through' }}>{red_value} €</Typography>
                                        </Typography>}

                                        &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;

                                        {listPkg.length >= 2 && <Typography>{red}   €</Typography>}
                                    </div>
                                    <Container maxWidth="lg">
                                        <List style={{ display: 'flex', flexDirection: 'row' }} disablePadding >




                                            {listPkg.length > 0 &&
                                                listPkg.map((item, index) => (
                                                    <ListItem sx={{ width: "10%" }} key={index} style={listItemStyle} disableGutters>
                                                        <ListItemAvatar style={avatarStyle}>
                                                            <Avatar src={item.images[0].image} />
                                                            {/* Replace "item.imageUrl" with the URL of the image you want to display */}
                                                        </ListItemAvatar>                                                    {/* Replace "item.name" with the property you want to display */}
                                                    </ListItem>
                                                ))}


                                        </List>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button onClick={sendPkg} variant="contained" style={{ color: 'white', backgroundColor: "#008080" }}>
                                                Acheter un lot
                                            </Button>
                                        </div>
                                    </Container>
                                </div>

                            </div>

                        </div>}
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
