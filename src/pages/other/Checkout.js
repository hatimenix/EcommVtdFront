import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { Breadcrumb } from "react-bootstrap";
import axiosClient from "../../axios-client";
import cogoToast from "cogo-toast";
import { fetchPanier } from "../../services/fetchData";
import { initCart } from "../../store/slices/cart-slice";
import Map from "./map/map";

import React from 'react'
import { Button, InputGroup, Modal } from 'react-bootstrap';
import { AiOutlineLock } from 'react-icons/ai';
import visa from './visa.png'
import mastercard from './shopping.png'
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md'
import { initCommande } from "../../store/slices/commande-slice";

const Checkout = () => {
  let cartTotalPrice = 0;

  const navigate = useNavigate()
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  //=========================manipulation de paiement========================
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState()
  const [numCard, setNumCard] = useState()
  const [expDate, setExpDate] = useState()
  const [securityCode, setSecurityCode] = useState()

  const [listPaiement, setListPaiement] = useState([])

  const styles = `
.my-modal {
    max-width: 470px;
    margin: 2% auto;
    padding: 1px;
}
,
.mycard {
    position: relative;
    display: flex;
    width: 395px;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #23406f;
    background-clip: border-box;
    border: 1px solid #23406f;
    border-radius: 7px;
  }

`;


  function formatMonthYear(e) {
    const input = e.target;
    let value = input.value;

    // Remove any characters that are not numbers or slashes
    value = value.replace(/[^0-9/]/g, '');

    // Ensure that there's a slash after two digits for the month
    if (value.length >= 2 && value.indexOf('/') === -1) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    // Limit the input to "mm/yyyy" format
    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    input.value = value;
  }
  function validateInput(e) {
    const input = e.target;
    const value = input.value;

    // Remove any non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');

    // Limit the input to exactly 4 digits
    if (numericValue.length > 4) {
      input.value = numericValue.slice(0, 4);
    } else {
      input.value = numericValue;
    }
  }

  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');

  const handleCardNumberChange = (e) => {
    const input = e.target;
    const value = input.value;

    // Remove non-numeric characters and spaces
    const numericValue = value.replace(/\D/g, '');

    // Add a space after every 4 digits
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Limit the input to 19 characters (16 digits + 3 spaces)
    if (formattedValue.length > 24) {
      setCardNumber(formattedValue.slice(0, 24));
    } else {
      setCardNumber(formattedValue);
    }

    // Detect card type based on the first four digits
    detectCardType(numericValue.slice(0, 4));
  };

  const detectCardType = (firstFourDigits) => {
    if (firstFourDigits.startsWith('4')) {
      setCardType('Visa');
    } else if (firstFourDigits.startsWith('5')) {
      setCardType('MasterCard');
    } else {
      setCardType('');
    }
  };
  // const stripe = loadStripe('pk_test_51NnjDSAGd0ipJgCDa5PtH2fiPZL8MAyGRAafPnYohGjNG1q2GsO3mIs7X6hhKeFiqyP1TSNqVOZVoieCPctD9ti6002uJdkrAP');

  const [isCardValid, setIsCardValid] = useState(false)
  const stripe = require('stripe')('pk_test_51NnjDSAGd0ipJgCDa5PtH2fiPZL8MAyGRAafPnYohGjNG1q2GsO3mIs7X6hhKeFiqyP1TSNqVOZVoieCPctD9ti6002uJdkrAP');
  const createPaymentMethod = async (cardNumber, expMonth, expYear, cvc) => {
    try {
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
        },
      });

      setIsCardValid(true)
      return true;
    } catch (error) {
      // Handle any errors, e.g., invalid card details
      setIsCardValid(false)
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userId = localStorage.getItem("cu")
    const dateParts = expDate.split('/');
    const month = dateParts[0]; // This will be "09"
    const year = dateParts[1];

    // const { error } = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: {
    //         number: numCard,
    //         exp_month: month,
    //         exp_year: year,
    //         cvc: securityCode,
    //     },
    // });
    createPaymentMethod(numCard, month, year, securityCode);

    if (!isCardValid) {
      return;
    } else {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("numCard", numCard.replace(/\s/g, ""))
      formData.append("expDate", expDate.toString())
      formData.append("securityCode", securityCode)
      formData.append("customer", userId)
      console.log(name, numCard, expDate, securityCode, userId)
      try {
        axiosClient.post(`paiement/`, formData).then(() => {
          // setMessage('')
          // toast.success('Profil modifié avec succès', {
          //     position: toast.POSITION.TOP_CENTER,
          //     autoClose: 4000,
          // });
          console.log('ok')
        })
      } catch (err) {

      }
    }

  };


  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [index, setIndex] = useState(-1);
  const [listArticle, setlistArticle] = useState([])
  const [listImageArticle, setlistImageArticle] = useState([])
  const slides = listImageArticle.map((img, i) => ({
    src: img.image,
    key: i,
  }));
  //================== fin paiement========================



  //================ map modal ===================

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Function to open the modal
  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  // Function to close the modal
  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };
  //=================== fin map modal ===============


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
    const quantity = []

    const formData = new FormData();

    // formData.append("article", articl);

    for (let index = 0; index < cartItems.length; index++) {
      articl.push([cartItems[index].id_art]);
      quantity.push([cartItems[index].quantity]);
      // console.log("idarticle: ", cartItems[index].id_art);
      // quantité de chaque article
      formData.append("article", cartItems[index].id_art);
      quantite[cartItems[index].id_art] = cartItems[index].quantity;
      // console.log("quantites: ", cartItems[index].quantity);

    }

    formData.append("vendeur", cartItems[0].vendeur);
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

        // diminuer le stock
        axiosClient.get(`articles/decrementeProductStock/?article=${articl}&quantity=${quantity}`)

          .then((res) => {
            /// delete paniers
            axiosClient.get(`panier/deleteOrderedCart/?customer=${localStorage.getItem("cu")}&cart=${articl}`)

              .then((res) => {
                // fetch panier
                axiosClient.get(`panier/?search=${localStorage.getItem("cu")}`)
                  .then((res) => {
                    dispatch(initCart(res.data));

                    // fetch commande
                    axiosClient.get(`commande/?search=${localStorage.getItem("cu")}`)
                      .then((res) => {
                        dispatch(initCommande(res.data));
                        cogoToast.success("Commande effectuée avec succès", { position: "bottom-left" });
                        navigate('/cart')
                      });
                  });

              })


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
                      {/* <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Company Name</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Pays</label>
                          <select onChange={(e) => setPays(e.target.value)}>
                            <option>Selectionner un Pays</option>
                            <option>Maroc</option>
                            <option>Espagne</option>
                            <option>Bahrain</option>
                            <option>France</option>
                            <option>Bresil</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Addresse</label>
                          <input

                            onChange={(e) => setAddresse(e.target.value)}
                            className="billing-address"
                            placeholder="numero de l'immeuble et nom de la rue"
                            type="text"
                          />
                          {/* <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          /> */}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Region / Ville</label>
                          <input onChange={(e) => setVille(e.target.value)} type="text" />
                        </div>
                      </div>
                      {/* <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Code Postal / ZIP</label>
                          <input onChange={(e) => setCodePostal(e.target.value)} type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Telephone</label>
                          <input onChange={(e) => setTelephone(e.target.value)} type='number' />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Addresse Email</label>
                          <input type="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6 " >
                        <div className="billing-info mb-20">

                          <div className="card-body" onClick={handleShow} style={{ cursor: 'pointer' }}>
                            <br></br>
                            <div className='row'>
                              <div className="col-sm-9">
                                <p class="h4" className="mb-0">Ajoute une méthode de paiement</p>
                                <img style={{ width: '30px', marginRight: 4 }} src={visa} />
                                <img style={{ width: '30px' }} src={mastercard} />

                              </div>
                              <div className="col-sm-3 text-end">
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                              </div>
                            </div>

                          </div>
                          <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            dialogClassName="my-modal"
                          >
                            <Modal.Header style={{ borderBottom: 'none', justifyContent: 'center', position: 'relative' }} closeButton>
                              <Modal.Title >Informations de paiement</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >

                              <div className='row p-2'>
                                <h3>Détails de la carte</h3>
                                <div className="col-sm-11">

                                  <p class="h4" className="mb-0">Les informations liées à ta carte sont chiffrées de manière sécurisée</p>

                                  <img style={{ width: '30px', marginRight: 4 }} src={visa} />
                                  <img style={{ width: '30px' }} src={mastercard} />

                                </div>
                                <div className="col-sm-1 text-end">
                                  <AiOutlineLock style={{ fontSize: "20px", color: "gray" }} />
                                </div>
                              </div>
                              <div className="mx-4 my-2 p-1 mb-4 " style={{ border: "1px solid #ebebeb", borderRadius: "5px" }}>
                                <div>
                                  <form>
                                    <div className='p-2'>
                                      <label className='p-2'>Nom figurant sur la carte</label>
                                      <input onChange={(e) => setName(e.target.value)} placeholder='Saisis votre nom et prénom' type="text" className="form-control-sm h-50" style={{
                                        borderTop: "none",
                                        borderRight: "none",
                                        borderLeft: "none",
                                        borderRadius: "0",
                                        borderBottom: "1px solid lightgray",
                                        outline: "none",
                                        backgroundColor: "#f8f9fa57",
                                        "::placeholder": {
                                          color: "lightgray",
                                        }
                                      }} />
                                    </div>
                                    <div className='p-2'>
                                      <label className='p-2'>Numéro de carte bancaire</label>
                                      <div style={{ position: 'relative' }}>
                                        <input
                                          onChange={(e) => {
                                            setNumCard(e.target.value);
                                            handleCardNumberChange(e);
                                          }}
                                          placeholder='Par ex : 1234 1234 1234 1234'
                                          type="text"
                                          className="form-control-sm h-50"
                                          style={{
                                            borderTop: "none",
                                            borderRight: "none",
                                            borderLeft: "none",
                                            borderRadius: "0",
                                            borderBottom: "1px solid lightgray",
                                            outline: "none",
                                            backgroundColor: "#f8f9fa57",
                                            "::placeholder": {
                                              color: "lightgray",
                                            }
                                          }}
                                          value={cardNumber}
                                        />

                                        <span style={{ position: 'absolute', right: 10, top: 2, fontSize: 20 }}>
                                          {cardType === "Visa" ? <img style={{ width: '25px' }} src={visa} />
                                            : cardType === 'MasterCard'
                                              ? <img style={{ width: '25px' }} src={mastercard} />
                                              : <BsFillCreditCard2BackFill style={{ color: "lightgray" }} />}
                                        </span>
                                      </div>

                                    </div>
                                    <div className='row p-2 mb-2'>
                                      <div className='col-6'>
                                        <label className='p-2'>Date d'expiration</label>
                                        <input type="text"
                                          placeholder="mm/yyyy"
                                          className="form-control-sm h-50" style={{
                                            borderTop: "none",
                                            borderRight: "none",
                                            borderLeft: "none",
                                            borderRadius: "0",
                                            borderBottom: "1px solid lightgray",
                                            outline: "none",
                                            backgroundColor: "#f8f9fa57",
                                            "::placeholder": {
                                              color: "lightgray",
                                            }
                                          }}
                                          onChange={(e) => setExpDate(e.target.value)}
                                          onInput={(e) => formatMonthYear(e)}
                                        />
                                      </div>
                                      <div className='col-6'>
                                        <label className='p-2'>Code de sécurité</label>
                                        <input
                                          placeholder='Par ex : 123 ' pattern="[0-9]{4}" type="text" className="form-control-sm h-50" style={{
                                            borderTop: "none",
                                            borderRight: "none",
                                            borderLeft: "none",
                                            borderRadius: "0",
                                            borderBottom: "1px solid lightgray",
                                            outline: "none",
                                            backgroundColor: "#f8f9fa57",
                                            "::placeholder": {
                                              color: "lightgray",
                                            }
                                          }}
                                          onChange={(e) => setSecurityCode(e.target.value)}
                                          onInput={(e) => validateInput(e)} />
                                      </div>

                                    </div>


                                  </form>
                                </div>

                              </div>
                              <div className='mb-2'>
                                <Button onClick={handleSubmit} style={{ width: '100%', backgroundColor: "teal", border: "none" }} >
                                  Utiliser cette carte
                                </Button>
                              </div>
                              <div>
                                <Button size='' style={{ width: '100%', color: "teal", backgroundColor: "transparent", border: "none" }} onClick={handleClose}>
                                  Annuler
                                </Button>
                              </div>

                            </Modal.Body>

                          </Modal>
                        </div>
                      </div>



                    </div>

                    {/* <div className="additional-info-wrap">
                      <h4>Information supplementaire</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div> */}

                    <div className="col-lg-6 col-md-6">
                      <p>Options de livraison</p>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                        <label class="form-check-label" for="flexRadioDefault2">
                          Envoi à domicile
                        </label>
                      </div>

                      <div class="form-check" onClick={openMapModal}>
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Envoi au point relais
                        </label>
                      </div>
                      <div className="billing-info mb-20">

                        <Modal
                          show={isMapModalOpen}
                          onHide={closeMapModal}
                          backdrop="static"
                          keyboard={false}
                          dialogClassName="my-modal"
                        >
                          <Modal.Header style={{ borderBottom: 'none', justifyContent: 'center', position: 'relative' }} closeButton>
                            <Modal.Title >Point de retrait et de dépôt</Modal.Title>
                          </Modal.Header>
                          <Modal.Body >
                            <Map />

                            <div>
                              <Button size='' style={{ width: '100%', color: "teal", backgroundColor: "transparent", border: "none" }} onClick={closeMapModal}>
                                Annuler
                              </Button>
                            </div>

                          </Modal.Body>

                        </Modal>

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
                            <li className="your-order-shipping">Expédition</li>
                            <li>Expédition gratuite</li>
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
                      {
                        (!nom || !prenom || !pays || !ville || !codePostal || !telephone || !addresse || !email)
                          ?
                          <button title="Veuillez remplir tous les champs obligatoires"
                            className="btn-hover" disabled>Passer la commande</button>
                          :
                          <button onClick={() => {
                            Commander(cartTotalPrice.toFixed(2))
                          }
                          }
                            className="btn-hover">Passer la commande</button>
                      }
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
