import React from 'react'
import axiosClient from '../../axios-client';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from '../../context/ContextProvider';

function SecurityProfile() {
    const { user } = useStateContext();
    //password variables
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState()


    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*_|èàç()/."';:,?ù])[0-9a-zA-Z@#$%^&+=!*_|èàç()/."';:,?ù]{8,}$/;
        const specialchar = /[@#$%^&+=!*_|èàç()/."';:,?ù]/;
        const minLengthRegex = /^.{8,}$/;
        const digitRegex = /\d/;
        const lowercaseRegex = /[a-z]/;
        const uppercaseRegex = /[A-Z]/;

        let errors = [];

        if (!minLengthRegex.test(password)) {
            errors.push('Le mot de passe doit comporter au moins 8 caractères.');
        }

        if (!digitRegex.test(password)) {
            errors.push('Le mot de passe doit contenir au moins un chiffre.');
        }

        if (!lowercaseRegex.test(password)) {
            errors.push('Le mot de passe doit contenir au moins une lettre minuscule.');
        }

        if (!uppercaseRegex.test(password)) {
            errors.push('Le mot de passe doit contenir au moins une lettre majuscule.');
        }
        if (!specialchar.test(password)) {
            errors.push('Le mot de passe doit contenir au moins un caractère spécial (@#$%^&+=).');
        }
        if (password.length > 20) {
            errors.push('Le mot de passe ne doit pas dépasser 20 caractères.');
        }

        if (errors.length > 0) {
            setMessage(errors[0]);
            return false;
        }

        return passwordRegex.test(password);
    };
    // change password 
    const handlepwdChange = (e) => {
        e.preventDefault();
        if (!isPasswordValid(newPassword)) {
            return;
        }
        axiosClient
            .put(`/change_password/${user.id}/`, {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            })
            .then((response) => {
                if (response.data.success) {
                    toast.success('Mot de passe modifié avec succès', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 5000,
                    });
                    // setMessage('')
                    // setConfirmPassword('')
                    // setOldPassword('')
                    // setNewPassword('')
                } else {
                    // toast.error('Erreur de modification', {
                    //     position: toast.POSITION.TOP_CENTER
                    // });
                    setMessage(response.data.error);
                }
            })
    };
    return (
        <div className="col-lg-8">
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card mb-4 mb-md-0">
                        <div className="card-body">
                            <p className="mb-4"><span className="text-primary font-italic me-1">Gestion email</span></p>
                            <div className="row">
                                <div className="col-sm-8">
                                    <p class="h4" className="mb-0">{user.email}</p>
                                </div>
                                <div className="col-sm-4 text-end">
                                    <button type="button" class="btn btn-sm btn-outline-success">Modifier</button>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className="card mb-2">
                <div className="card-body">
                    <p className="mb-4"><span className="text-primary font-italic me-1">Mot de passe</span></p>
                    {message &&
                        <div className="alert alert-danger py-2">
                            <strong className="">Erreur! </strong>{" " + message}
                        </div>}
                    <div className="row">
                        <div className="col-sm-4">
                            <p className="mb-0">Ancien mot de passe</p>
                        </div>
                        <div className="col-sm-8">
                            <input
                                placeholder='Entrez lancien mot de passe' onChange={(e) => setOldPassword(e.target.value)} name='oldPassword' type="password" id="oldPassword" className="form-control-sm h-50" style={{
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
                        <div className="col-sm-4">
                            <p className="mb-0">Nouveau mot de passe</p>
                        </div>
                        <div className="col-sm-8">
                            <input placeholder='Entrez le nouveau mot de passe' onChange={(e) => setNewPassword(e.target.value)} name='newPassword' type="password" id="newPassword" className="form-control-sm h-50" style={{
                                borderTop: "none",
                                borderRight: "none",
                                borderLeft: "none",
                                borderRadius: "0",
                                borderBottom: "1px solid lightgray",
                                outline: "none",
                                backgroundColor: "#f8f9fa57"
                            }}
                                value={newPassword} />

                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-sm-4">
                            <p className="mb-0">Confirmer mot de passe</p>
                        </div>
                        <div className="col-sm-8">
                            <input placeholder='Entrez la comfirmation de mot de passe' onChange={(e) => setConfirmPassword(e.target.value)} name='confirmPassword' type="password" id="confirmPassword" className="form-control-sm h-50" style={{
                                borderTop: "none",
                                borderRight: "none",
                                borderLeft: "none",
                                borderRadius: "0",
                                borderBottom: "1px solid lightgray",
                                outline: "none",
                                backgroundColor: "#f8f9fa57"
                            }}
                                value={confirmPassword} />

                        </div>

                    </div>




                </div>

            </div>
            <div className='text-end'>
                <button type="button" onClick={handlepwdChange} className="btn btn-sm btn-outline-success mt-2 px-3 py-1 " style={{ position: 'relative' }}>
                    Enregistrer
                    <ToastContainer />
                </button>
            </div>


        </div>

    )
}

export default SecurityProfile