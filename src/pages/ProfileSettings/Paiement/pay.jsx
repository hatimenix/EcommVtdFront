import React, { useState } from 'react'
import { Button, InputGroup, Modal } from 'react-bootstrap';
import { AiOutlineLock } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md'
import visa from './visa.png'
import mastercard from './shopping.png'
import { useStateContext } from '../../../context/ContextProvider';
import { FaCcMastercard } from 'react-icons/fa';
import { RiVisaFill } from 'react-icons/ri';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import axios from 'axios';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';


const styles = `
.my-modal {
    max-width: 470px;
    margin: 2% auto;
    padding: 1px;
}

`;
function Paiement() {
    const [show, setShow] = useState(false);
    const { user } = useStateContext();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const [name, setName] = useState()
    const [numCard, setNumCard] = useState()
    const [expDate, setExpDate] = useState()
    const [securityCode, setSecurityCode] = useState()

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
            formData.append("customer", user.id)
            console.log(name, numCard, expDate, securityCode, user.id)
            try {
                axios.post(`http://localhost:8000/paiement/`, formData).then(() => {
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

    return (
        <div className="col-lg-8">
            <div className="row mb-4" >
                <div className="col-md-12">
                    <div className="card mb-md-0">
                        <div className="card-body">
                            <p class="h4" className="mb-0">Options de paiement</p>
                        </div>
                        <div className="card-body" onClick={handleShow} style={{ cursor: 'pointer' }}>
                            <div className='row'>
                                <div className="col-sm-9">
                                    <p class="h4" className="mb-0">Ajouter une nouvelle carte</p>
                                </div>
                                <div className="col-sm-3 text-end">
                                    <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="card mb-2">
                    <div className="card-body">
                        <p class="h4" className="mb-0">Méthodes de versement</p>
                    </div>
                    <div className="card-body" onClick={() => { navigate('/wallet') }} style={{ cursor: 'pointer' }}>
                        <div className='row'>
                            <div className="col-9">
                                <p class="h4" className="mb-0">Ajouter compte bancaire</p>
                            </div>
                            <div className="col-3 text-end">
                                <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                            </div>
                        </div>

                    </div>
                </div> */}
            <style>{styles}</style>
            <script src="https://js.stripe.com/v3/"></script>

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
    )
}

export default Paiement