import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axiosClient from "../../axios-client";
import cogoToast from "cogo-toast";
import { fetchPanier } from "../../services/fetchData";
import { initCart } from "../../store/slices/cart-slice";

const Checkout = () => {
  let cartTotalPrice = 0;

  const navigate = useNavigate()
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  //commande data
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [pays, setPays] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState();
  const [telephone, setTelephone] = useState("");
  const [total, setTotal] = useState(0);
  const [addresse, setAddresse] = useState("");
  const [a_domicile, setA_domicile] = useState(true);
  const [email, setEmail] = useState("");


  //passage commande
  const Commander = async (totalprice) => {
    const articl = []
    const quantite = {}

    const formData = new FormData();

    // formData.append("article", articl);

    for (let index = 0; index < cartItems.length; index++) {
      articl.push([cartItems[index].id_art]);
      // console.log("idarticle: ", cartItems[index].id_art);
      // quantité de chaque article
      formData.append("article", cartItems[index].id_art);
      quantite[cartItems[index].id_art] = cartItems[index].quantity;
      // console.log("quantites: ", cartItems[index].quantity);

    }

    // console.log("idarticle: ", articl);


    formData.append("quantite", JSON.stringify(quantite))
    formData.append("prenom", prenom);
    formData.append("nom", nom);
    formData.append("pays", pays);
    formData.append("ville", ville);
    formData.append("codePostal", codePostal);
    formData.append("telephone", telephone);
    formData.append("addresse_livraison", addresse);
    formData.append("data_livraison", "12/09/2023");
    formData.append("total", totalprice);
    formData.append("a_domicile", a_domicile);
    formData.append("email", email);
    // formData.append("pointRelais", 1);
    formData.append("customer", localStorage.getItem("cu"));


    axiosClient.post("/commande/", formData).then((res) => {
      // console.log("commande passée avec suces", res.data);
      try {
        // delete paniers
        axiosClient.get(`panier/deleteOrderedCart/?customer=${localStorage.getItem("cu")}&cart=${articl}`)

          .then((res) => {
            // fetch panier
            axiosClient.get(`panier/?search=${localStorage.getItem("cu")}`)
              .then((res) => {
                dispatch(initCart(res.data));
                cogoToast.success("Commande effectuée avec succès", { position: "bottom-left" });
                navigate('/cart')
              });

          })

      } catch (error) {
        console.error('Error fetching categories:', error);
      }

    });


    // console.log("le formdata: ", formData);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Detail de la facture</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Prénom</label>
                          <input onChange={(e) => setPrenom(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Nom</label>
                          <input onChange={(e) => setNom(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Pays</label>
                          <select onChange={(e) => setPays(e.target.value)}>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input

                            onChange={(e) => setAddresse(e.target.value)}
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                          />
                          <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Region / Ville</label>
                          <input onChange={(e) => setVille(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Code Postal / ZIP</label>
                          <input onChange={(e) => setCodePostal(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Telephone</label>
                          <input onChange={(e) => setTelephone(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Addresse Email</label>
                          <input onChange={(e) => setEmail(e.target.value)} type="text" />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Information supplementaire</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Votre commande</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Produit</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              // discountedPrice != null
                              //   ? (cartTotalPrice +=
                              //     finalDiscountedPrice * cartItem.quantity)
                              //   : (cartTotalPrice +=
                              //     finalProductPrice * cartItem.quantity);

                              cartTotalPrice +=
                                finalProductPrice * cartItem.quantity

                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.titre} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                      (
                                        finalDiscountedPrice *
                                        cartItem.quantity
                                      ).toFixed(2)
                                      : currency.currencySymbol +
                                      (
                                        finalProductPrice * cartItem.quantity
                                      ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button onClick={() => {
                        Commander(cartTotalPrice.toFixed(2))
                      }
                      }
                        className="btn-hover">Passer la commande</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
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

export default Checkout;
