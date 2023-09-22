import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import SEO from "../../../components/seo";
import { useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../axios-client";

const LoginMail = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setIsLoading } = useStateContext()
  const [token, setToken] = useState()
  const [refresh, setRefresh] = useState()
  const [message, setMessage] = useState()

  //check if the login form inputs are filled
  const isFormFilled = email && password;

  //login method
  const onSubmit = ev => {
    ev.preventDefault()
    if (!isFormFilled) {
      setMessage(' Veuillez remplir tout les champs')
      return
    }
    const payload = {
      email,
      password,
    }
    axiosClient.post('token/customer/', payload)
      .then(({ data }) => {
        setToken(data.access);
        setRefresh(data.refresh)
        localStorage.setItem("REFRESH_TOKEN", data.refresh)
        localStorage.setItem("ACCESS_TOKEN", data.access)
        window.location.reload()
        
      })
      .catch((err) => {
        const response = err.response;
        console.log(response.data.message)
        if (response.data.message === "Mot de passe incorrect") {
          setMessage(" " + response.data.message);
        }
        else if (response.data.message === "votre compte est désactivé") { setMessage(` ${response.data.message}`); }
        else {
          setMessage(" Email introuvable");
        }
      })
  }
  

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page"
      />
      <div style={{ position: "relative"  }}>
        <div className="login-register-area ">
          <div className="row">
            <div className="col-lg-12 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper p-3 py-5" style={{backgroundColor:"white" , borderRadius:5 }}>
                <Tab.Container defaultActiveKey="login">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <motion.h4 initial={{
                          opacity: 0,
                          scale: 0.2
                        }}
                          animate={{
                            opacity: 1,
                            scale: 1
                          }}>Login</motion.h4>
                      </Nav.Link>
                    </Nav.Item>
                    
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <div className="login-form-container" >
                        {message &&
                          <div class="alert alert-danger py-2">
                            <strong className="">Erreur!</strong>{message}
                          </div>}
                        <div className="login-register-form">
                          <form>
                            <input
                              className="rounded-3"
                              name="email"
                              style={{
                                background: '#f8f9fa'
                              }}
                              onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Tapez votre adresse email'
                            />
                            <input
                              className="rounded-3"
                              name="password"
                              style={{
                                background: '#f8f9fa'
                              }}
                              onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder='Tapez votre mot de passe'
                            />
                            <div className="button-box">
                              <div className="mb-3">
                                <label><Link to={process.env.PUBLIC_URL + "/"}>
                                  Forgot Password?
                                </Link></label>

                              </div>
                              <button onClick={onSubmit} type="submit" className="rounded-3">
                                <span>Login</span>
                              </button>
                            </div>
                            <hr style={{ color: 'lightgray' }} />
                            <div className="text-center mb-2">
                              <span>Or log in with</span>
                            </div>

                            <div className="row justify-content-center">
                              <div className="col-5 py-1 mx-2" style={{ border: '1px solid lightgray', borderRadius: '5px' }}>
                                <div className="d-flex align-items-center justify-content-center">
                                  <div className="form-group">
                                    <FcGoogle style={{ fontSize: 25 }} />
                                  </div>
                                  <div className="form-group" style={{ marginLeft: 5 }}>
                                    <span>Google</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-5 py-1" style={{ border: '1px solid lightgray', borderRadius: '5px' }}>
                                <div className="d-flex align-items-center justify-content-center">
                                  <div className="form-group">
                                    <BsApple style={{ fontSize: 25 }} />
                                  </div>
                                  <div className="form-group " style={{ marginLeft: 5 }}>
                                    <span>Apple</span>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </form>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default LoginMail;