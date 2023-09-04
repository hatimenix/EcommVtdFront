import React, { Fragment, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import { motion } from "framer-motion";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from '../../axios-client';

const Login = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setIsLoading } = useStateContext()
  const [token, setToken] = useState()
  const [refresh, setRefresh] = useState()

  const [message, setMessage] = useState()
  // let { pathname } = useLocation();

  const isFormFilled = email && password;

  const onSubmit = ev => {

    ev.preventDefault()
    if (!isFormFilled) {
      setMessage(' Veuillez remplir tout les champs')
      return
    }
    // setIsLoading(true)
    const payload = {
      email,
      password,
    }

    axiosClient.post('token/seller/', payload)
      .then(({ data }) => {

        setToken(data.access);
        setRefresh(data.refresh)
        localStorage.setItem("REFRESH_TOKEN", data.refresh)
        localStorage.setItem("ACCESS_TOKEN", data.access)
        localStorage.setItem("ROLE", "vendeur")
        navigate('/espace-vendeur')

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
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [emailRegister, setEmailRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")

  const [messageRegister, setMessageRegister] = useState('')

  const [listSellers, setListSellers] = useState([])

  useEffect(() => {
    axiosClient.get('/sellers/').then(res => {
      setListSellers(res.data)
    })
  }, [])

  function update(){
    axiosClient.get('/sellers/').then(res => {
      setListSellers(res.data)
    })
  }

  const checkEmail = (email) => {
    const check = listSellers.filter(row => row.email === email)
    console.log(check);
  }


  console.log(checkEmail('zedfghn@dd.add'));
  const onRegister = ev => {
    ev.preventDefault()
    if (confirmPwd !== passwordRegister) {
      setMessageRegister(" Veuillez confirmer votre mot de passe")
      return
    }
    const check = listSellers.filter(row => row.email === emailRegister)
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
    formData.append("addres", address)
    formData.append("etat", true)

    axiosClient.post('/sellers/', formData).then(() => {
      setMessageRegister()
      update()
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
        <div
          className="test"
          style={{
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "70%",
            background: "linear-gradient(to right, #053399b3, #1987545e)",
            opacity: 0.7,
            filter: "blur(60px)",
          }}
        >
        </div>
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
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
                        <div className="login-form-container" style={{
                          background: "#ffffff4a",
                          boxShadow: "10px 10px 25px #80808096",
                          borderRadius: "15px",
                        }}>
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
                                  background: '#e8f0fe'
                                }}
                                onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Tapez votre adresse email'
                              />
                              <input
                                className="rounded-3"
                                name="password"
                                style={{
                                  background: '#e8f0fe'
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
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container" style={{
                          background: "#ffffff4a",
                          boxShadow: "10px 10px 25px #80808096",
                          borderRadius: "15px",
                        }}>

                          {messageRegister &&
                            <div class="alert alert-danger py-2">
                              <strong className="">Erreur!</strong>{messageRegister}
                            </div>}
                          <div className="login-register-form">
                            <form>
                              <div className="row">
                                <div className="form-group col-6">
                                  <input type="text" className="form-control" id="last_name" placeholder="Nom" onChange={(e) => setLastName(e.target.value)} style={{ background: '#e8f0fe' }} />
                                </div>
                                <div className="form-group col-6">
                                  <input type="text" className="form-control" id="first_name" placeholder="Prenom" onChange={(e) => setFirstName(e.target.value)} style={{ background: '#e8f0fe' }} />
                                </div>
                              </div>

                              <input
                                className="rounded-3"
                                type="email"
                                name="emailRegister"
                                placeholder="Email"
                                onChange={(e) => setEmailRegister(e.target.value)}
                                style={{
                                  background: '#e8f0fe'
                                }}
                              />
                              <div className="row">
                                <div className="form-group col-6">
                                  <input type="password" className="form-control" id="password" placeholder="Mot de passe" onChange={(e) => setPasswordRegister(e.target.value)} style={{ background: '#e8f0fe' }} />
                                </div>
                                <div className="form-group col-6">
                                  <input type="password" className="form-control" id="confirmpxd" placeholder="Confirmation" onChange={(e) => setConfirmPwd(e.target.value)} style={{ background: '#e8f0fe' }} />
                                </div>
                              </div>

                              <div className="">
                                <input
                                  className="rounded-3"
                                  type="text"
                                  name="addres"
                                  placeholder="address"
                                  style={{
                                    background: '#e8f0fe'
                                  }}
                                />
                              </div>

                              <div className="row mb-4">
                                <div className="form-group col-md-6">
                                  <select style={{ background: '#e8f0fe', fontSize: "14px" }} className="custom-select form-control p-2" onChange={(e) => setGender(e.target.value)} id="inputGroupSelect04">
                                    <option selected>Choisir le genre...</option>
                                    <option value="FEMME">Femme</option>
                                    <option value="HOMME">Homme</option>
                                  </select>
                                </div>
                              </div>

                              <div className="button-box">
                                <button type="button" className="rounded-3" onClick={onRegister}>
                                  <span>Register</span>
                                </button>
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
