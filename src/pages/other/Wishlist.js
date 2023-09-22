import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { addToCart, initCart } from "../../store/slices/cart-slice";
import { deleteFromWishlist, deleteAllFromWishlist, initFavoris } from "../../store/slices/wishlist-slice"
import axiosClient, { linkImage } from "../../axios-client";

const Wishlist = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const server = linkImage
  // console.log("voici la wishlist", wishlistItems);


  function getfav() {
    try {
      // fetch panier
      axiosClient.get(`favoris/?search=${localStorage.getItem("cu")}`)
        .then((res) => {
          dispatch(initFavoris(res.data))
        });

    } catch (error) {
      console.error('Error fetching categories:', error);
    }

  }


  function getpan() {
    try {
      // fetch panier
      axiosClient.get(`panier/?search=${localStorage.getItem("cu")}`)
        .then((res) => {
          dispatch(initCart(res.data))
        });

    } catch (error) {
      console.error('Error fetching categories:', error);
    }

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
            { label: "Favoris", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Votre liste de favoris</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Nom Du Produit</th>
                            <th>Prix Unitaire</th>
                            <th>AJOUTER AU PANIER</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              wishlistItem.price,
                              wishlistItem.discount
                            );
                            const finalProductPrice = (
                              wishlistItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);
                            const cartItem = cartItems.find(
                              item => item.id === wishlistItem.id
                            );
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/articles/" +
                                      wishlistItem.id_art
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        // process.env.PUBLIC_URL +
                                        server +
                                        wishlistItem.image[0]
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/articles/" +
                                      wishlistItem.id_art
                                    }
                                  >
                                    {wishlistItem.titre}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {currency.currencySymbol +
                                          finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {currency.currencySymbol +
                                          finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {currency.currencySymbol +
                                        finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-wishlist-cart">
                                  {wishlistItem.affiliateLink ? (
                                    <a
                                      href={wishlistItem.affiliateLink}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      {" "}
                                      Acheter maintenant{" "}
                                    </a>
                                  ) : wishlistItem.variation &&
                                    wishlistItem.variation.length >= 1 ? (
                                    <Link
                                      to={`${process.env.PUBLIC_URL}/product/${wishlistItem.id}`}
                                    >
                                      Select option
                                    </Link>
                                  ) : wishlistItem.stock &&
                                    wishlistItem.stock > 0 ? (
                                    <button
                                      onClick={() => {
                                        dispatch(addToCart(wishlistItem))


                                        // actualiser panier
                                        setTimeout(() => {
                                          getpan()
                                        }, 500);
                                      }
                                      }
                                      className={
                                        cartItem !== undefined &&
                                          cartItem.quantity > 0
                                          ? "active"
                                          : ""
                                      }
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem.quantity > 0
                                      }
                                      title={
                                        wishlistItem !== undefined
                                          ? "AJOUTER AU PANIER"
                                          : "DEJA AJOUTE"
                                      }
                                    >
                                      {cartItem !== undefined &&
                                        cartItem.quantity > 0
                                        ? "DEJA AJOUTE"
                                        : "AJOUTER AU PANIER"}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Out of stock
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(deleteFromWishlist(wishlistItem.id_fav))
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
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
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/"}
                        >
                          Continuer l'achat
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => dispatch(deleteAllFromWishlist())}>
                          Vider la liste de favoris
                        </button>
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
                      Aucun article trouvé dans la liste de souhaits <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Ajoutez des articles maintenant
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

export default Wishlist;
