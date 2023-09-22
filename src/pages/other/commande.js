import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { linkImage } from "../../axios-client";



const Commande = () => {
    const dispatch = useDispatch();
    let { pathname } = useLocation();
    const server = linkImage

    const currency = useSelector((state) => state.currency);
    const commandeList = useSelector((state) => state.commandeList.commandeListItem);
    const articles = useSelector((state) => state.article.articles);
    // console.log("commandeList", articles);


    function convertDate(dateString) {

        // Create a Date object from the given string
        const date = new Date(dateString);

        // Get day, month, year, hours, and minutes components
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Month is zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Format the date as dd/mm/yyyy hh:mm
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

        return formattedDate

    }

    return (
        <Fragment>
            <SEO
                titleTemplate="Wishlist"
                description="Wishlist page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Commande", path: process.env.PUBLIC_URL + pathname }
                    ]}
                />
                <div className="cart-main-area pt-90 pb-100">
                    <div className="container">
                        {commandeList && commandeList.length >= 1 ? (
                            <Fragment>
                                <h3 className="cart-page-title">Votre liste de commandes</h3>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-content table-responsive cart-table-content">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Produit</th>
                                                        <th>Total</th>
                                                        <th>Date de la commande</th>
                                                        <th>Etat de la commande</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {commandeList.map((commandeListItem, key) => {

                                                        const cmdID = commandeListItem.article[0]
                                                        const art = articles.find(item => item.id_art === cmdID)
                                                        // console.log("le log:", art);

                                                        return (
                                                            <tr key={key}>
                                                                {/* 
                                                                <td className="product-thumbnail">
                                                                    <Link
                                                                        to={
                                                                            process.env.PUBLIC_URL +
                                                                            "/articles/" +
                                                                            commandeListItem.id_art
                                                                        }
                                                                    >
                                                                        <img
                                                                            className="img-fluid"
                                                                            src={
                                                                                // process.env.PUBLIC_URL
                                                                                // server +
                                                                                art.images[0].image
                                                                            }
                                                                            alt=" image unavailable"
                                                                        />
                                                                    </Link>
                                                                </td> */}

                                                                <td className="product-name text-center">


                                                                    {commandeListItem.article_titre.map((cmd, ky) => {
                                                                        // console.log('qti', commandeListItem.quantite[`${commandeListItem.article[ky]}`]);
                                                                        return <div class="d-flex justify-content-around">
                                                                            <Link
                                                                                to={
                                                                                    process.env.PUBLIC_URL +
                                                                                    "/articles/" +
                                                                                    commandeListItem.article[ky]
                                                                                }
                                                                            >
                                                                                <div >
                                                                                    {cmd}
                                                                                </div>
                                                                            </Link>
                                                                            <div >
                                                                                X {commandeListItem.quantite[`${commandeListItem.article[ky]}`]}
                                                                            </div>

                                                                        </div>
                                                                    })}



                                                                </td>

                                                                <td className="product-price-cart">
                                                                    {<span className="amount">
                                                                        {currency.currencySymbol +
                                                                            commandeListItem.total}
                                                                    </span>}
                                                                </td>

                                                                <td className="product-wishlist-cart">
                                                                    {
                                                                        convertDate(commandeListItem.date_commande)
                                                                    }
                                                                </td>

                                                                <td className="product-remove">
                                                                    {!commandeListItem.etat ?
                                                                        <div class="spinner-border text-warning" role="status">
                                                                            <span class="sr-only">Loading...</span>
                                                                        </div>
                                                                        :
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16" color="green">
                                                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                                                        </svg>}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="cart-shiping-update-wrapper align-center">
                                            <div className="cart-clear ">
                                                <Link
                                                    to={process.env.PUBLIC_URL + "/"}
                                                >
                                                    Continuer l'achat
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="item-empty-area text-center">
                                        <div className="item-empty-area__icon mb-30">
                                            <i className="pe-7s-like"></i>
                                        </div>
                                        <div className="item-empty-area__text">
                                            Aucun article trouvé dans la liste de mes commande <br />{" "}
                                            <Link to={process.env.PUBLIC_URL + "/"}>
                                                Achetez maintenant
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default Commande;
