import React, { useEffect, useState } from 'react'
import { Button, InputGroup, Modal } from 'react-bootstrap';
import { AiOutlineLock } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md'
import visa from './visa.png'
import mastercard from './shopping.png'
import { useStateContext } from '../../../context/ContextProvider';
import { BsFillCreditCard2BackFill, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';

import Carousel from 'react-elastic-carousel'

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
const deletestyles = `

.my-delete-modal {
    max-width: 550px;
    margin: 10% auto;
    padding: 1px
}
`;
function Paiement() {
    const [show, setShow] = useState(false);
    const { user } = useStateContext();
    const handleShow = () => setShow(true);
    const navigate = useNavigate()

    const [name, setName] = useState()
    const [numCard, setNumCard] = useState()
    const [expDate, setExpDate] = useState()
    const [securityCode, setSecurityCode] = useState()

    const [listPaiement, setListPaiement] = useState([])

    useEffect(() => {
        async function fetchData() {

            const res = await axiosClient.get(`/paiement/?search=${user.id}`);
            if (res.data.length > 0) {
                const paiementData = res.data;
                setListPaiement(paiementData);
            }
        }
        fetchData();
    }, []);

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
    const [errorMessage, setErrorMessage] = useState('')
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
            setErrorMessage(' Carte invalide')
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
            try {
                const formData = new FormData();

                formData.append("name", name);
                formData.append("numCard", numCard.replace(/\s/g, ""))
                formData.append("expDate", expDate.toString())
                formData.append("securityCode", securityCode)
                formData.append("customer", user.id)
                console.log(name, numCard, expDate, securityCode, user.id)

                axiosClient.post(`/paiement/`, formData).then(() => {
                    axiosClient.get('/paiement/').then((res) => {
                        setListPaiement(res.data)
                    })
                })
            } catch (err) {

            }
        }
        setErrorMessage('')
        setName('')
        setCardNumber('')
        setCardType('')
        securityCode('')
        setExpDate('')
        setShow(false);

    };


    const handleClose = () => {
        setErrorMessage('')
        setName('')
        setCardNumber('')
        setCardType('')
        setSecurityCode('')
        setExpDate('')
        setShow(false);
    };

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [index, setIndex] = useState(-1);
    const [listArticle, setlistArticle] = useState([])
    const [listImageArticle, setlistImageArticle] = useState([])
    const slides = listImageArticle.map((img, i) => ({
        src: img.image,
        key: i,
    }));

    // useEffect(() => {
    //     axiosClient.get(`/paiement/`).then(res => {
    //         setlistImageArticle(res.data.filter(e => e.customer === user.id));
    //     })
    // }, [user.id])

    // // swiper slider settings
    // const gallerySwiperParams = {
    //     spaceBetween: 10,
    //     loop: true,
    //     effect: "fade",
    //     fadeEffect: {
    //         crossFade: true
    //     },
    //     thumbs: { swiper: thumbsSwiper },
    //     modules: [EffectFade, Thumbs],
    // };

    const thumbnailSwiperParams = listPaiement.length > 3 ? {
        onSwiper: setThumbsSwiper,
        spaceBetween: 10,
        slidesPerView: 2,
        touchRatio: 0.2,
        freeMode: true,
        loop: true,
        slideToClickedSlide: true,
        navigation: true
    }
        : {
            onSwiper: setThumbsSwiper,
            spaceBetween: 0,
            slidesPerView: listPaiement.length,
            touchRatio: 0.2,
            freeMode: true,
            loop: false,
            slideToClickedSlide: true,
            navigation: true
        }


    const [showTrash, setShowTrash] = useState(false)
    const [alertDelete, setAlertDelete] = useState(false);
    const [deletedId, setDeletedId] = useState()

    const deleteCard = (id) => {
        axiosClient.delete(`/paiement/${id}/`).then(res => {
            setListPaiement(listPaiement.filter(e => e.id !== id))
        })
        setAlertDelete(false);
    }
    return (
        <div className="col-lg-8">
            <div className="row mb-4" >
                <div className="col-md-12">
                    <div className="card mb-md-0">
                        <div className="card-body">
                            <p class="h4" className="mb-0">Options de paiement</p>
                        </div>


                        {/* <div className="product-small-image-wrapper">
                            {listPaiement.length ? (
                                <Swiper options={thumbnailSwiperParams}>
                                    {listPaiement.map((val, key) => (
                                        <SwiperSlide key={key}>
                                            <div key={key} className="px-3 py-1" style={{
                                                width: "50%",
                                                color: 'white',
                                                position: "relative",
                                                display: 'flex',
                                                flexDirection: "column",
                                                wordWrap: "break-word",
                                                backgroundColor: "#23406f",
                                                backgroundClip: "border-box",
                                                border: "1px solid #23406f",
                                                borderRadius: "7px",
                                                margin: "5px"
                                            }}>
                                                <div className="mt-3"><span className="mr-3" style={{ fontSize: "20px" }}>{val.numCard.replace(/(\d{4})/g, '$1 ')}</span></div>
                                                <div className="d-flex justify-content-between card-details mt-3 mb-3">
                                                    <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Card Holder</span><span>{val.name}</span></div>
                                                    <div className="d-flex flex-row">
                                                        <div className="d-flex flex-column" style={{ marginRight: 10 }}><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Expired</span><span>{val.expDate}</span></div>
                                                        <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>CVV</span><span>{val.securityCode}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div key={key} className="col-6 px-3 py-1" style={{
                                                width: "50%",
                                                color: 'white',
                                                position: "relative",
                                                display: 'flex',
                                                flexDirection: "column",
                                                wordWrap: "break-word",
                                                backgroundColor: "#23406f",
                                                backgroundClip: "border-box",
                                                border: "1px solid #23406f",
                                                borderRadius: "7px",
                                                margin: "5px"
                                            }}>
                                                <div className="mt-3"><span className="mr-3" style={{ fontSize: "20px" }}>{val.numCard.replace(/(\d{4})/g, '$1 ')}</span></div>
                                                <div className="d-flex justify-content-between card-details mt-3 mb-3">
                                                    <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Card Holder</span><span>{val.name}</span></div>
                                                    <div className="d-flex flex-row">
                                                        <div className="d-flex flex-column" style={{ marginRight: 10 }}><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Expired</span><span>{val.expDate}</span></div>
                                                        <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>CVV</span><span>{val.securityCode}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) :
                                null
                            }
                        </div> */}

                        {listPaiement.length > 0 &&
                            <div className=" d-flex justify-left-center container px-lg-5 px-xl-5 px-md-5">

                                <Carousel
                                    className='d-flex  px-lg-5 px-xl-5 px-md-5'
                                    pagination={listPaiement.length > 1 ? true : false}
                                    showArrows={false}
                                    // enableAutoPlay={true}
                                    // autoPlaySpeed={2000}
                                    style={{
                                        padding: 10
                                    }}
                                >

                                    {listPaiement.map((val, key) => {
                                        return (
                                            <>
                                                <div className='d-flex w-100 px-lg-5 px-xl-5 px-md-5'>
                                                    <div
                                                        onMouseEnter={e => {
                                                            e.target.style.cursor = 'grab'
                                                            setShowTrash(true)
                                                        }}
                                                        onMouseLeave={e => {
                                                            setShowTrash(false)
                                                        }}
                                                        onMouseDown={e => e.target.style.cursor = 'grabbing'}
                                                        onMouseUp={e => e.target.style.cursor = 'grab'}
                                                        key={key} className="col-6 px-3 py-1  " style={{
                                                            width: "100%",
                                                            color: 'white',
                                                            position: "relative",
                                                            display: 'flex',
                                                            flexDirection: "column",
                                                            wordWrap: "break-word",
                                                            background: "linear-gradient(42deg, #001531 0%, rgba(0,54,127,1) 72%, rgba(0,191,177,1) 100%",
                                                            backgroundClip: "border-box",
                                                            borderRadius: "7px",
                                                            margin: "5px",
                                                            zIndex: 1
                                                        }}>
                                                        <div className="mt-3"><span className="mr-3" style={{ fontSize: "20px" }}>{val.numCard.replace(/(\d{4})/g, '$1 ')}</span></div>
                                                        <div className="d-flex justify-content-between card-details mt-3 mb-3">
                                                            <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Card Holder</span><span>{val.name}</span></div>
                                                            <div className="d-flex flex-row">
                                                                <div className="d-flex flex-column" style={{ marginRight: 10 }}><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Expired</span><span>{val.expDate}</span></div>
                                                                <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>CVV</span><span>{val.securityCode}</span></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className='deleteIcon'
                                                            style={{
                                                                position: 'absolute',
                                                                display: [showTrash ? 'block' : 'none'],
                                                                top: 5,
                                                                right: 5,
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => {
                                                                setDeletedId(val.id);
                                                                setAlertDelete(true);
                                                            }}>
                                                            <BsTrash fontSize={22} color='black' />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div key={key} className="col-6 px-3 py-1" style={{
                width: "50%",
                color: 'white',
                position: "relative",
                display: 'flex',
                flexDirection: "column",
                wordWrap: "break-word",
                backgroundColor: "#23406f",
                backgroundClip: "border-box",
                border: "1px solid #23406f",
                borderRadius: "7px",
                margin: "5px"
            }}>
                <div className="mt-3"><span className="mr-3" style={{ fontSize: "20px" }}>{val.numCard.replace(/(\d{4})/g, '$1 ')}</span></div>
                <div className="d-flex justify-content-between card-details mt-3 mb-3">
                    <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Card Holder</span><span>{val.name}</span></div>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column" style={{ marginRight: 10 }}><span style={{ fontSize: "11px", color: "#a1a1a1" }}>Expired</span><span>{val.expDate}</span></div>
                        <div className="d-flex flex-column"><span style={{ fontSize: "11px", color: "#a1a1a1" }}>CVV</span><span>{val.securityCode}</span></div>
                    </div>
                </div>
            </div> */}
                                            </>
                                        )
                                    })}
                                </Carousel>
                            </div>}

                        {/* <div className="card-body">{listPaiement}</div> */}

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
            <div className="card mb-2">
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
            </div>
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
                            {errorMessage &&
                                <div class="alert alert-danger py-2">
                                    <strong className="">Erreur!</strong>{errorMessage}
                                </div>}
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
                        <Button onClick={handleSubmit} style={{ width: '100%', backgroundColor: "teal", border: "none" }} disabled={!name || !numCard || !expDate || !securityCode}>
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


            <style>{deletestyles}</style>
            <Modal
                show={alertDelete}
                onHide={() => setAlertDelete(false)}
                keyboard={false}
                dialogClassName="my-delete-modal"

            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Supprimer l'article
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    êtes-vous sûr ? Vous ne pourrez pas annuler cette action
                    ultérieurement.
                </Modal.Body>
                <Modal.Footer
                    style={{
                        border: "none",
                    }}
                >
                    <Button
                        size='sm'
                        className="btn btn-danger"
                        onClick={() => deleteCard(deletedId)}
                    >
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Paiement