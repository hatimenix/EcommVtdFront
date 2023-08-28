import React, { Fragment, useEffect, useState } from 'react'
import LayoutOne from '../../layouts/LayoutOne';
import axiosClient from '../../axios-client';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PersonalInfosCmp() {
    const [User, setUser] = useState([]);
    const [listVendeurs, setListVendeurs] = useState([])
    const [message, setMessage] = useState()

    // const [firstName, setFirstName] = useState()
    // const [lastName, setLastName] = useState()
    // const [codeP, setCodeP] = useState()
    // const [rue, setRue] = useState()
    // const [ville, setVille] = useState()
    // const [pays, setPays] = useState()
    // const [tel, setTel] = useState()
    // const [birthday, setBirthday] = useState()

    //get the inputs values
    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === "file" ? target.files[0] : target.value;
        setUser({ ...User, [name]: value });
    };
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z]+(?:-[a-zA-Z]+)?\.[a-zA-Z]{2,}$/;
    const codepRegex = /^(\d{3})$|(\d{6})$|([A-Z]\d{4}[A-Z]{3})$|(\d{4})$|(\d{4})$|(?:FI)*(\d{5})$|(?:AZ)*(\d{4})$|(\d{5})$|(?:BB)*(\d{5})$|(\d{4})$|(\d{4})$|(\d{4})$|(\d{3}\d?)$|([A-Z]{2}\d{2})$|([A-Z]{2}\d{4})$|(\d{8})$|(\d{6})$|([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]) ?(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$|(\d{4})$|(\d{7})$|(\d{6})$|(\d{4})$|(?:CP)*(\d{5})$|(\d{4})$|(\d{4})$|(\d{4})$|(\d{5})$|(\d{5})$|(?:FI)*(\d{5})$|(\d{5})$|(\d{4})$|(\d{6})$|(?:SEOUL)*(\d{6})$|(\d{5})$|(\d{6})$|(\d{5})$|(\d{4})$|(\d{5})$|(\d{5})$|(\d{10})$|(\d{3})$|(\d{5})$|(\d{5})$|([A-Z]\d{2}[A-Z]{2})|([A-Z]\d{3}[A-Z]{2})|([A-Z]{2}\d{2}[A-Z]{2})|([A-Z]{2}\d{3}[A-Z]{2})|([A-Z]\d[A-Z]\d[A-Z]{2})|([A-Z]{2}\d[A-Z]\d[A-Z]{2})|(GIR0AA)$|(\d{5})$|(\d{7})$|([A-Z]\d{2}[A-Z]{2})|([A-Z]\d{3}[A-Z]{2})|([A-Z]{2}\d{2}[A-Z]{2})|([A-Z]{2}\d{3}[A-Z]{2})|([A-Z]\d[A-Z]\d[A-Z]{2})|([A-Z]{2}\d[A-Z]\d[A-Z]{2})|(GIR0AA)$|(\d{5})$|(\d{4}(\d{4})?)$|(\d{4})$|(\d{5})$|(\d{6})$|(\d{5})$|(\d{6})$|(?:SEOUL)*(\d{6})$|(\d{5})$|(\d{5})$|(\d{5})$|(\d{6})$|(\d{4})$|(\d{7})$|(97500)$|(\d{9})$|(\d{7})$|(96940)$|(\d{4})$|((97|98)(4|7|8)\d{2})$|(\d{6})$|(\d{6})$|(\d{6})$|(\d{5})$|(\d{5})$|(?:SE)*(\d{5})$|(\d{6})$|(STHL1ZZ)$|(?:SI)*(\d{4})$|(\d{5})$|4789\d$|(\d{5})$|(?:CP)*(\d{4})$|([A-Z]\d{3})$|(TKCA 1ZZ)$|(\d{5})$|(\d{6})$|(\d{6})$|(\d{4})$|(\d{5})$|(\d{5})$|(986\d{2})$|(\d{5})$|(\d{4})$|(\d{5})$|(\d{5})$|([A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/i;

    useEffect(() => {
        axiosClient.get('/auth/user/').then(({ data }) => {
            setUser(data);
        });
        axiosClient
            .get("/customers/")
            .then((res) => setListVendeurs(res.data));
    }, []);


    // const isEmpty = () => {
    //     return !User.last_name || !User.first_name || !User.email;
    // };
    //edit form submit
    const handleSubmit = (event) => {
        console.log(User.id)
        // if (!emailRegex.test(User.email)) {
        //     setMessage("Veuillez entrer un email valide.");
        //     return;
        // }
        // if (User.code_postal && !codepRegex.test(User.code_postal)) {
        //     setMessage("Veuillez entrer un code postal valide.");
        //     return;
        // }

        const formData = new FormData();
        //formData.append("password", user.password);
        formData.append("first_name", User.first_name);
        formData.append("last_name", User.last_name);
        formData.append("tel", User.tel);
        if(User.birthday)formData.append("birthday", User.birthday);
        formData.append("pays", User.pays);
        formData.append("ville", User.ville);
        formData.append("rue", User.rue);
        formData.append("code_postal", User.code_postal);

        // if (User.first_name.trim() === "" || User.first_name.trim() === "" || (User.ville && User.ville.trim() === "") || (User.rue && User.rue.trim() === "") || (User.code_postal && User.code_postal.trim() === "")) {
        //     setMessage("Veuillez remplir les champs correctement");
        //     return;
        // }

        // const newList = listVendeurs.filter((e) => e.id !== User.id);
        // if (newList.length > 0) {
        //     const check = newList.find((obj) => {
        //         return obj.email === User.email.trim();
        //     });
        //     if (check) {
        //         window.scrollTo(0, 0);
        //         return setMessage("Ce mail existe déjà !");
        //     }
        // }

        try {
            axiosClient.put(`/user_update/${User.id}/`, formData).then(() => {
                setMessage('')
                toast.success('Profil modifié avec succès', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose:4000,
                });
            })
        } catch (err) {

        }
    };
    const handleCategoryChange = selectedCategoryId => {
        // Handle the selected category ID here
        console.log('Selected Category ID:', selectedCategoryId);
      };

    return (
        <div className="col-lg-8">
            <div className="card mb-4 pb-2">
                <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">Mes informations</span></p>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Nom</p>
                        </div>
                        <div className="col-sm-9">
                            <input placeholder='Entrez votre nom' defaultValue={User.last_name} name='last_name' type="text" onChange={handleInputChange} id="last_name" className="form-control-sm h-50" style={{
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
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Prenom</p>
                        </div>
                        <div className="col-sm-9">
                            <input placeholder='Entrez votre prénom' defaultValue={User.first_name} name='first_name' type="text" onChange={handleInputChange} id="first_name" className="form-control-sm h-50" style={{
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
                    {/* <br />
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Mail</p>
                        </div>
                        <div className="col-sm-9">
                        <input placeholder='Entrez votre mail' defaultValue={User.email}  type="email" id="email" className="form-control form-control-sm h-50"  style={{border:"none"}}/>
                        </div>
                    </div> */}
                    <br />
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9" >
                            <input placeholder='Numéro' defaultValue={User.tel} type="tel" name='tel' onChange={handleInputChange} id="tel" className="form-control-sm h-50" style={{
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
                    <br />
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Date de naissance</p>
                        </div>
                        <div className="col-sm-9">
                            <input defaultValue={User.birthday} name='birthday' onChange={handleInputChange} type="date" id="birthday" className="form-control-sm h-50" style={{
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

                </div>
            </div>
            <div className="row ">
                <div className="col-md-12 ">
                    <div className="card mb-4 mb-md-0 pb-2">
                        <div className="card-body">
                            <p className="mb-4"><span className="text-primary font-italic me-1">Mon emplacement</span></p>
                            <div className="row align-items-center"> {/* Use 'align-items-center' to vertically align items */}
                                <div className="col-md-2 mb-2 mb-md-0"> {/* Use 'col-md-2' to make the columns stack on small screens */}
                                    <p className="mb-0">Pays</p>
                                </div>
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <input placeholder='Entrez votre pays' defaultValue={User.pays} name="pays" onChange={handleInputChange} type="text" id="pays" className="form-control-sm h-50" style={{
                                        borderTop: "none",
                                        borderRight: "none",
                                        borderLeft: "none",
                                        borderRadius: "0",
                                        borderBottom: "1px solid lightgray",
                                        outline: "none",
                                        backgroundColor: "#f8f9fa57"
                                    }} />
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-2 mb-2 mb-md-0">
                                    <p className="mb-0">Ville</p>
                                </div>
                                <div className="col-md-3">
                                    <input placeholder='Entrez votre ville' defaultValue={User.ville} name="ville" onChange={handleInputChange} type="text" id="ville" className="form-control-sm h-50" style={{
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

                            <br />

                            <div className="row align-items-center"> {/* Use 'align-items-center' to vertically align items */}
                                <div className="col-md-2 mb-2 mb-md-0"> {/* Use 'col-md-2' to make the columns stack on small screens */}
                                    <p className="mb-0">Rue</p>
                                </div>
                                <div className="col-md-4 mb-2 mb-md-0">
                                    <input placeholder='Entrez votre rue' defaultValue={User.rue} name="rue" onChange={handleInputChange} type="text" id="rue" className="form-control-sm h-50" style={{
                                        borderTop: "none",
                                        borderRight: "none",
                                        borderLeft: "none",
                                        borderRadius: "0",
                                        borderBottom: "1px solid lightgray",
                                        outline: "none",
                                        backgroundColor: "#f8f9fa57"
                                    }} />
                                </div>
                                <div className="col-md-1"></div>
                                <div className="col-md-2 mb-2 mb-md-0">
                                    <p className="mb-0">Code Postal</p>
                                </div>
                                <div className="col-md-3">
                                    <input placeholder='Entrez votre code postale' defaultValue={User.code_postal} name="code_postal" onChange={handleInputChange} type="text" id="code_postal" className="form-control-sm h-50" style={{
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
                        </div>
                    </div>
                    <div className='text-end'>
                    <button type="button" className="btn btn-sm btn-outline-success mt-2 px-3 py-1 " onClick={handleSubmit} style={{ position: 'relative' }}>
                                    Enregistrer
                                </button>
                                
                    </div>
                    <ToastContainer />
                    
                </div>
            </div>
        </div>
    )
}

export default PersonalInfosCmp