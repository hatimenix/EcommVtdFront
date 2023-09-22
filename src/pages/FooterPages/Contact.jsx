import React, { useState } from 'react'
import { Fragment } from 'react'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import contactus from '../../assets/image/contactus.jpg'
import { useStateContext } from '../../context/ContextProvider'
import axiosClient from '../../axios-client'
function Contact() {
    const { user } = useStateContext();

    const [message,setMessage]=useState('')
    const [sujet,setSujet]=useState('')

    const handleSubmit = e => {
        e.preventDefault();
        console.log(`${user.last_name} ${user.first_name}`)
        console.log(user.email)
        console.log(sujet)
        console.log(message)

        axiosClient.post('send_contact_email/', {
            name: `${user.last_name} ${user.first_name}`,
            email: user.email,
            subject: sujet,
            message: message,
          })
          .then(() => {
            console.log("ok")

          })
          .catch((err) => {
            const response = err.response;
          })
      };
      

    return (
        <Fragment>
            <SEO
                titleTemplate="A propos de nous"
                description="About page of flone react minimalist eCommerce template."
            />

            <LayoutOne>

                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-12 px-0 w-100 ">
                                    <div className="row mb-5 mt-5 mx-2 d-xl-flex d-none text-center justify-content-center" style={{ width: "100%" }}>
                                        <div style={{ justifyContent: "center", width: "80%", display: "flex" }}>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-map-marker"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p> 5éme étage Immeuble "le 129" quartier Haut Founty , Agadir</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-phone"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="tel://0808628496">+212 8 08 62 84 96</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-paper-plane"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="contact@atexperts.ma">contact@atexperts.ma</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="dbox w-100 text-center">
                                                    <div className="icon d-flex align-items-center justify-content-center">
                                                        <span style={{ color: "#00BFB1", fontSize: "20px" }} className="fa fa-globe"></span>
                                                    </div>
                                                    <div className="text">
                                                        <p><a href="https://atexperts.ma/">https://atexperts.ma</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row no-gutters mb-100  mt-50" style={{ backgroundColor: "#f6f6f8" ,marginLeft:"5%",marginRight:"5%" }}>
                                        <div className="col-md-6 " >
                                            <div className="contact-wrap w-100 p-4 p-lg-5 ">
                                                <h3 className="mb-4">Contactez-nous</h3>
                                                {/* <div id="form-message-success" className="mb-4">
                                                    Your message was sent, thank you!
                                                </div> */}
                                                <form method="POST" id="contactForm" name="contactForm" className="contactForm">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="label" for="name">Nom complet</label>
                                                                <input type="text"  name="name" disabled id="name" value={`${user.last_name} ${user.first_name}`} style={{
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
                                                                <input type="email"  name="email" id="email" value={user.email} disabled style={{
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
                                                                }} 
                                                                onChange={e=>setSujet(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-2">
                                                                <label className="label" for="#">Message</label>
                                                                <textarea name="message" maxLength={350}  id="message" cols="30" rows="3" placeholder="Entrez votre message" style={{
                                                                    resize:'none',
                                                                    borderTop: "none",
                                                                    borderRight: "none",
                                                                    borderLeft: "none",
                                                                    borderRadius: "0",
                                                                    borderBottom: "1px solid lightgray",
                                                                    outline: "none",
                                                                    backgroundColor: "#f8f9fa57"
                                                                }} 
                                                                onChange={e=>setMessage(e.target.value)}></textarea>

                                                                <div style={{
                                                                    display:'flex',
                                                                    justifyContent:'end'
                                                                }}>
                                                                    <span style={{
                                                                        fontSize:10,
                                                                        color:'gray'
                                                                    }}>{message.length}/350
                                                                    </span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <input onClick={handleSubmit} type="submit" value="Envoyer le message" style={{backgroundColor:'teal' ,borderRadius:'10px',color:"white"}} />
                                                                <div className="submitting"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-6 d-flex ">
                                            <div className="info-wrap img" >
                                                <img style={{ width: "100%", height: "100%" }} src="https://img.freepik.com/free-photo/front-view-woman-working-desk-while-wearing-headset-looking-laptop_23-2148434727.jpg?size=626&ext=jpg&ga=GA1.2.1325470212.1692349706&semt=ais"></img>
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