import React, { Fragment, useState } from 'react'
import LayoutOne from '../../../layouts/LayoutOne'
import { useStateContext } from '../../../context/ContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import Login from '../../Authentication/Login';
import LoginMail from './LoginMail';
import { useEffect } from 'react';
import './ErrorPage.css'
function EditMail() {
    const [mail, setMail] = useState('');
    const { user } = useStateContext();
    const url = window.location.href;
    const idPattern = /modification_mail\/([^/]+)/;
    const match = url.match(idPattern);

    const navigate = useNavigate()

    const token = localStorage.getItem("ACCESS_TOKEN")

    const handleSubmit = (event) => {


        const formData = new FormData();
        if (mail) {
            formData.append("email", mail);
        }
        try {
            axiosClient.put(`/update_user_email/${user.id}/`, formData).then(() => {
                toast.success('Mail modifié avec succès', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 4000,
                });

                window.location.href = "/profil"

            })
        } catch (err) {

        }

    };
    const [idUser, setidUser] = useState()
    useEffect(() => {
        if (user.id === undefined) {

        }
    }, [user.id])

    console.log("myid user", user.id)
    console.log("myiddd", match[1])

    const deleteToken = (id1, id2) => {
        if (id1 !== id2) {
            localStorage.removeItem("ACCESS_TOKEN")
            localStorage.removeItem("REFRESH_TOKEN")
        }
    }

    return (

        token
            ?
            (parseInt(match[1]) === user.id ?

                <div style={{

                    height: "100vh",
                    background: "#e7e7e7"
                    , display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {/* <div className='px-2' style={{ display: 'flex', flexDirection: 'column', width: "500px" }}>
                        <div className="col-12">
                            <div className="card mb-4" style={{ height: "90 %" }}>
                                <div className="card-body mb-3" style={{ height: "90%" }}>
                                    <p className="mb-4"><span className=" font-italic me-1">Modification de mail</span></p>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <p className="mb-0">Nouveau mail</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <input onChange={(e) => setMail(e.target.value)} placeholder='entrez votre nouveau mail' className="form-control-sm h-50" style={{
                                                borderTop: "none",
                                                borderRight: "none",
                                                borderLeft: "none",
                                                borderRadius: "0",
                                                borderBottom: "1px solid lightgray",
                                                outline: "none",
                                                backgroundColor: "#f8f9fa57"
                                            }}
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 md-row" style={{ display: 'flex', justifyContent: 'end' }}>
                            <button onClick={handleSubmit} type="button" className="btn btn-sm btn-outline-success p-2 " style={{ position: 'relative', alignContent: 'top', height: 'fit-content' }}>
                                Enregistrer
                                <ToastContainer />

                            </button>
                        </div>
                    </div> */}
                    <div className="row mb-100 mt-50" style={{ backgroundColor: "#f6f6f8", marginLeft: "5%", marginRight: "5%", borderRadius: 5 }}>
                        <div className="col-md-8 d-flex " >
                            <div className=" w-100 p-4 p-lg-5 ">
                                <h4 className="mb-4">Modification d'email</h4>

                                <form method="POST" id="contactForm" name="contactForm">
                                    <div className="row">


                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label className="label" for="subject">Nouveau mail</label>
                                                <input onChange={(e) => setMail(e.target.value)} placeholder='entrez votre nouveau mail' className="form-control-sm h-50" style={{
                                                    borderTop: "none",
                                                    borderRight: "none",
                                                    borderLeft: "none",
                                                    borderRadius: "0",
                                                    borderBottom: "1px solid lightgray",
                                                    outline: "none",
                                                    backgroundColor: "#f8f9fa57"
                                                }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input onClick={handleSubmit} type="submit" value="Enregistrer" style={{ backgroundColor: 'teal', borderRadius: '10px', color: "white" }} />
                                                <ToastContainer />
                                                <div className="submitting"></div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-4 " style={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center'
                        }}>
                            <img style={{ width: "200px", height: "200px", objectFit: 'cover', opacity: 0.5 }} src="https://cdn-icons-png.flaticon.com/512/4213/4213980.png" />

                            {/* <div className="info-wrap img" style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center',
                                background:'red',
                                width:'50%',
                                height:'100%'
                            }}>
                            </div> */}
                        </div>
                    </div>
                </div>

                :
                user.id !== undefined && (
                    <>
                        {/* <div style={{

                            height: "100vh",
                            background: "#e7e7e7"
                            , display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <div className="row mb-100 mt-50 " style={{
                            maxWidth:'700px', backgroundColor: "#f6f6f8", marginLeft: "5%", marginRight: "5%", borderRadius: 5 }}>
                                <div className="col-md-9 " style={{
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <div className="py-5" style={{paddingLeft:10}}>
                                        <h4 className=" mb-4" style={{
                                            color:'gray'
                                        }}>
                                        Nous nous excusons pour tout inconvénient, mais il semblerait que l'utilisateur actuel ne corresponde pas au destinataire prévu de l'e-mail.
                                        </h4>

                                    </div>
                                </div>
                                <div className="col-md-3 " style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    
                                    <img style={{ width: "100px", height: "100px", objectFit: 'cover', opacity: 0.5 }} src="https://cdn-icons-png.flaticon.com/512/4213/4213980.png" />


                                </div>
                            </div>
                        </div> */}
                        <div>
                            <div className="page-404">
                                <div className="outer" style={{
                                    background: "#f0f0f0 ",
                                }}>
                                    <div className="middle">
                                        <div className="inner">
                                            <div className="inner-circle"><i className="fa fa-cogs"></i><span>500</span></div>
                                            <span className="inner-status">Oups ! Erreur interne du serveur!</span>
                                            <span className="inner-detail">Malheureusement, nous rencontrons des difficultés pour charger la page que vous recherchez.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {deleteToken(user.id, parseInt(match[1]))}
                        </div>
                    </>
                )
            )

            :
            <div style={{
                width: "100%", height: "100vh",
                background: "linear-gradient(90deg, rgba(0,54,127,0.46775206664697133) 0%, rgba(0,191,177,0.3641106100643382) 100%)"
                , display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div >
                    <LoginMail />

                </div>
            </div>





    )
}

export default EditMail