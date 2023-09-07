import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import { motion } from "framer-motion";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from '../../axios-client';
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import axios from "axios";
import GoogleLogin from "react-google-login";

const Login = () => {

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
        navigate('/')
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

  //Register
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [gender, setGender] = useState('')
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")

  const [messageRegister, setMessageRegister] = useState('')

  const [listCustomers, setListCustomers] = useState([])

  const isRegisterFormFilled = !emailRegister || !passwordRegister || !firstName || !lastName || !confirmPwd || !gender;

  useEffect(() => {
    axiosClient.get('/customers/').then(res => {
      setListCustomers(res.data)
    })
  }, [])

  function update() {
    axiosClient.get('/customers/').then(res => {
      setListCustomers(res.data)
    })
  }


  //check if the passowrd is valid
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*_|èàç()/."';:,?ù])[0-9a-zA-Z@#$%^&+=!*_|èàç()/."';:,?ù]{8,}$/;
    const specialchar = /[@#$%^&+=!*_|èàç()/."';:,?ù]/;
    const minLengthRegex = /^.{8,}$/;
    const digitRegex = /\d/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    let errors = [];
    if (!minLengthRegex.test(password)) {
      errors.push(' Le mot de passe doit comporter au moins 8 caractères.');
    }
    if (!digitRegex.test(password)) {
      errors.push(' Le mot de passe doit contenir au moins un chiffre.');
    }
    if (!lowercaseRegex.test(password)) {
      errors.push(' Le mot de passe doit contenir au moins une lettre minuscule.');
    }
    if (!uppercaseRegex.test(password)) {
      errors.push(' Le mot de passe doit contenir au moins une lettre majuscule.');
    }
    if (!specialchar.test(password)) {
      errors.push(' Le mot de passe doit contenir au moins un caractère spécial (@#$%^&+=).');
    }
    if (password.length > 20) {
      errors.push(' Le mot de passe ne doit pas dépasser 20 caractères.');
    }
    if (errors.length > 0) {
      setMessageRegister(errors[0]);
      return false;
    }
    return passwordRegex.test(password);
  };

  //register method
  const onRegister = ev => {
    ev.preventDefault()
    if (isRegisterFormFilled) {
      setMessageRegister(' Veuillez remplir tout les champs')
      return
    }
    if (!isPasswordValid(passwordRegister)) {
      return
    }
    if (confirmPwd !== passwordRegister) {
      setMessageRegister(" Veuillez confirmer votre mot de passe")
      return
    }
    const check = listCustomers.filter(row => row.email === emailRegister)
    if (check.length > 0) {
      setMessageRegister(" Cet email existe déjà")
      return
    }
    const formData = new FormData()
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    formData.append("email", emailRegister)
    formData.append("password", passwordRegister)
    formData.append("gender", gender)
    // formData.append("addres", address)
    formData.append("etat", true)

    axiosClient.post('/customers/', formData).then(() => {
      setMessageRegister()
      window.location.reload()
    })
  }

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page"
      />

      <div style={{ position: "relative" }}>
        {/* <div
          className="test"
          style={{
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "70%",
            background: "linear-gradient(to right, #89c2f3, #fdb0ff)",
            opacity: 0.7,
            filter: "blur(60px)",
          }}
        >
        </div> */}
        <div className="login-register-area ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
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
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <motion.h4 initial={{
                            opacity: 0,
                            scale: 0.2
                          }}
                            animate={{
                              opacity: 1,
                              scale: 1
                            }}>Register</motion.h4>
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
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
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
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container" >

                          {messageRegister &&
                            <div class="alert alert-danger py-2">
                              <strong className="">Erreur!</strong>{messageRegister}
                            </div>}
                          <div className="login-register-form">
                            <form>
                              <div className="row">
                                <div className="form-group col-6">
                                  <input type="text" className="form-control" id="last_name" placeholder="Nom" onChange={(e) => setLastName(e.target.value)} maxLength={20} style={{ background: '#f8f9fa' }} />
                                </div>
                                <div className="form-group col-6">
                                  <input type="text" className="form-control" id="first_name" placeholder="Prenom" onChange={(e) => setFirstName(e.target.value)} maxLength={20} style={{ background: '#f8f9fa' }} />
                                </div>
                              </div>

                              <input
                                className="rounded-3"
                                type="email"
                                name="emailRegister"
                                placeholder="Email"
                                onChange={(e) => setEmailRegister(e.target.value)}
                                maxLength={50}
                                style={{
                                  background: '#f8f9fa'
                                }}
                              />
                              <div className="row">
                                <div className="form-group col-6">
                                  <input type="password" className="form-control" id="password" placeholder="Mot de passe" onChange={(e) => setPasswordRegister(e.target.value)} style={{ background: '#f8f9fa' }} />
                                </div>
                                <div className="form-group col-6">
                                  <input type="password" className="form-control" id="confirmpxd" placeholder="Confirmation" onChange={(e) => setConfirmPwd(e.target.value)} style={{ background: '#f8f9fa' }} />
                                </div>
                              </div>

                              {/* <div className="">
                                <input
                                  className="rounded-3"
                                  type="text"
                                  name="addres"
                                  placeholder="address"
                                  maxLength={100}
                                  style={{
                                    background: '#f8f9fa'
                                  }}
                                />
                              </div> */}

                              <div className="row mb-4">
                                <div className="form-group col-md-6">
                                  <select style={{ background: '#f8f9fa', fontSize: "14px" }} className="custom-select form-control p-2" onChange={(e) => setGender(e.target.value)} id="inputGroupSelect04">
                                    <option selected value="">Choisir le genre...</option>
                                    <option value="Femme">Femme</option>
                                    <option value="Homme">Homme</option>
                                  </select>
                                </div>
                              </div>

                              <div className="button-box">
                                <button type="button" className="rounded-3" onClick={onRegister}>
                                  <span>Register</span>
                                </button>
                              </div>
                              <hr style={{ color: 'lightgray' }} />
                              <div className="text-center mb-2">
                                <span>Or sign up with</span>
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
      </div>
    </Fragment >
  );
};

export default Login;