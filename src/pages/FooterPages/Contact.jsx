import React from 'react'
import { Fragment } from 'react'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import contactus from '../../assets/image/contactus.jpg'
function Contact() {
    return (
        <Fragment>
            <SEO
                titleTemplate="About us"
                description="About page of flone react minimalist eCommerce template."
            />

            <LayoutOne>

                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="wrapper">
                                    <div className="row mb-5 mt-5 mx-2 d-flex text-center justify-content-center" style={{ width: "100%" }}>
                                        <div style={{ justifyContent: "center", width: "80%", display: "flex" }}>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-map-marker"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p> 198 West 21th Street, Suite 721 New York NY 10016</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-phone"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="tel://1234567920">+ 1235 2355 98</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-paper-plane"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-globe"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="#">yoursite.com</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row no-gutters mb-100 " style={{ backgroundColor: "#f6f6f8" ,marginLeft:"10%",marginRight:"10%" }}>
                                        <div className="col-md-6">
                                            <div className="contact-wrap w-100 p-md-5 p-4">
                                                <h3 className="mb-4">Contactez-nous</h3>
                                                {/* <div id="form-message-success" className="mb-4">
                                                    Your message was sent, thank you!
                                                </div> */}
                                                <form method="POST" id="contactForm" name="contactForm" className="contactForm">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="label" for="name">Nom complet</label>
                                                                <input type="text"  name="name" id="name" placeholder="Nom complet" style={{
                                                                    borderTop: "none",
                                                                    borderRight: "none",
                                                                    borderLeft: "none",
                                                                    borderRadius: "0",
                                                                    borderBottom: "1px solid lightgray",
                                                                    outline: "none",
                                                                    backgroundColor: "#f8f9fa57"
                                                                }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="label" for="email">Adresse Email</label>
                                                                <input type="email"  name="email" id="email" placeholder="Email" style={{
                                                                    borderTop: "none",
                                                                    borderRight: "none",
                                                                    borderLeft: "none",
                                                                    borderRadius: "0",
                                                                    borderBottom: "1px solid lightgray",
                                                                    outline: "none",
                                                                    backgroundColor: "#f8f9fa57"
                                                                }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-3">
                                                                <label className="label" for="subject">Sujet</label>
                                                                <input type="text"  name="subject" id="subject" placeholder="Sujet" style={{
                                                                    borderTop: "none",
                                                                    borderRight: "none",
                                                                    borderLeft: "none",
                                                                    borderRadius: "0",
                                                                    borderBottom: "1px solid lightgray",
                                                                    outline: "none",
                                                                    backgroundColor: "#f8f9fa57"
                                                                }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-3">
                                                                <label className="label" for="#">Message</label>
                                                                <textarea name="message"  id="message" cols="30" rows="3" placeholder="Entrez votre message" style={{
                                                                    borderTop: "none",
                                                                    borderRight: "none",
                                                                    borderLeft: "none",
                                                                    borderRadius: "0",
                                                                    borderBottom: "1px solid lightgray",
                                                                    outline: "none",
                                                                    backgroundColor: "#f8f9fa57"
                                                                }} ></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <input type="submit" value="Envoyer le message" style={{backgroundColor:'teal' ,borderRadius:'10px',color:"white"}} />
                                                                <div className="submitting"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex ">
                                            <div className="info-wrap img" >
                                                <img style={{ width: "100%", height: "100%" }} src={contactus}></img>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </LayoutOne>
        </Fragment>
    )
}

export default Contact