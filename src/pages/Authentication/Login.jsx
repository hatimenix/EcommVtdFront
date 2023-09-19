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
import { Checkbox, FormControlLabel } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";

const Login = ({ isSeller }) => {

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

        isSeller ? navigate('/nouveau-article') : window.location.reload()

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
  const [isChecked, setIsChecked] = useState(false);
  const [isMailChecked, setIsMailChecked] = useState(false);




  useEffect(() => {
    axiosClient.get('/customers/').then(res => {
      setListCustomers(res.data)
    })
    checkPasswordStrength()

  }, [passwordRegister])

  function update() {
    axiosClient.get('/customers/').then(res => {
      setListCustomers(res.data)
    })
  }
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordColor, setPasswordColor] = useState('');
  const checkPasswordStrength = () => {
    const specialchar = /[@#$%^&+=!*_|èàç()/."';:,?ù]/;
    const minLengthRegex = /^.{8,}$/;
    const startLength = /^.{2,}$/;
    const digitRegex = /\d/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    let missingRequirements = [];

    if (!specialchar.test(passwordRegister)) {
      missingRequirements.push("caractère spécial");
    } else if (!lowercaseRegex.test(passwordRegister)) {
      missingRequirements.push("minuscule");
    } else if (!uppercaseRegex.test(passwordRegister)) {
      missingRequirements.push("majuscule");
    } else if (!digitRegex.test(passwordRegister)) {
      missingRequirements.push("chiffres");
    } else if (!minLengthRegex.test(passwordRegister)) {
      missingRequirements.push("longueur minimale de 8 caractères");
    }

    if (missingRequirements.length > 0) {
      const missingText = `Vous avez besoin de ${missingRequirements.join(", ")} dans votre mot de passe.`;
      setPasswordStrength(missingText);
      setPasswordColor('red');
    } else {
      setPasswordStrength('Le mot de passe est correct!');
      setPasswordColor('green');
    }
    return missingRequirements
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
    if (!isChecked) {
      setMessageRegister(" Veuillez accepter les termes et conditions")
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
    formData.append("policyApproval", true)
    formData.append("recieveMails", isMailChecked)
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
                            <div className="row" >
                              <div style={{marginBottom:"-10px"}} className="form-group col-6">
                                <input  type="password" className="form-control" id="password" placeholder="Mot de passe" onChange={(e) => setPasswordRegister(e.target.value)} style={{ background: '#f8f9fa' }} />
                              </div>
                              <div  style={{marginBottom:"-10px"}} className="form-group col-6">
                                <input type="password" className="form-control" id="confirmpxd" placeholder="Confirmation" onChange={(e) => setConfirmPwd(e.target.value)} style={{ background: '#f8f9fa' }} />
                              </div>
                            </div>
                            <div style={{marginBottom:'15px'}}>
                            {passwordRegister.length > 0 ?
                              <span style={{ alignItems :'left', justifyContent:'left' , fontSize:"12px " , color:passwordColor}} >{`${passwordStrength}`}</span>

                              : ""} 
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

                            <div className="row mb-3">
                              <div className="form-group col-md-6" style={{position:'relative'}}>
                                <select style={{ background: '#f8f9fa', fontSize: "13px" , height:'35px' }} className="custom-select form-control p-2" onChange={(e) => setGender(e.target.value)} id="inputGroupSelect04">
                                  <option selected value="" style={{  fontSize: "13px"  }}>Choisir le genre...</option>
                                  <option style={{  fontSize: "13px"  }} value="Femme">Femme</option>
                                  <option style={{ fontSize: "13px"  }} value="Homme">Homme</option>
                                </select>
                                <MdKeyboardArrowDown style={{
                                  position:'absolute',
                                  top:9,
                                  right:15,
                                  fontSize:18,
                                  color: "gray"
                                }}/>
                              </div>
                            </div>
                            <div className="row mb-3 w-100">
                              <div className=" form-group col-12 " style={{ padding: 0, display: 'flex', alignItems: 'start', textAlign: 'justify' }} >
                                <FormControlLabel
                                  style={{ padding: 0, display: 'flex', alignItems: 'start' }}
                                  value="end"
                                  control={<Checkbox style={{
                                    paddingTop: 4
                                  }} disableRipple checked={isMailChecked} onChange={(e) => setIsMailChecked(e.target.checked)} />}
                                  label={
                                    <span style={{ fontSize: '13px' }}>
                                      Je souhaite recevoir par e-mail des offres personnalisées et les dernières mises à jour d'Elbal
                                    </span>
                                  }
                                  labelPlacement="end"

                                />
                              </div>
                            </div>
                            <div className="row mb-3 w-100">
                              <div className=" form-group col-12 " style={{ padding: 0, display: 'flex', alignItems: 'start', textAlign: 'justify' }} >
                                <FormControlLabel
                                  style={{ padding: 0, display: 'flex', alignItems: 'start' }}
                                  value="end"
                                  control={<Checkbox style={{
                                    paddingTop: 4
                                  }} disableRipple checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />}
                                  label={
                                    <span style={{ fontSize: '13px', textAlign: 'justify' }}>
                                      En t’inscrivant, tu confirmes que tu acceptes les &nbsp;
                                      <Link style={{ color: "#00BFB1" }} to={"/termes-et-conditions"} target='_blank'>
                                        Termes & Conditions d'Elbal</Link>  , avoir lu la   <Link to={"/Politique-de-confidentialité"} target='_blank' style={{ color: "#00BFB1" }}> Politique de confidentialité </Link>
                                      , et avoir au moins 18 ans.
                                    </span>
                                  }
                                  labelPlacement="end"

                                />
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
    </Fragment >
  );
};

export default Login;