import React, { Fragment, useEffect, useState } from 'react'
import LayoutOne from '../../layouts/LayoutOne';
import axiosClient, { linkImage } from '../../axios-client';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/ContextProvider';
import defaultImage from '../../../src/assets/image/default-image.png'


function Profile() {
    const { user } = useStateContext();
    const navigate = useNavigate()

    return (
        <Fragment>

            <LayoutOne >

                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4" style={{ height: "90%" }}>
                                    <div className="card-body text-center">
                                        <img src={user.image ? linkImage + user.image : defaultImage} alt="avatar"
                                            className="rounded-circle img-fluid" style={{ width: "150px", height: '150px', objectFit:'cover' }} />
                                        <h5 className="my-3">{user.first_name} {user.last_name}</h5>
                                        {!user.rue && !user.pays && !user.ville && !user.code_postal
                                            ?
                                            <p className=" mb-4" style={{
                                                color: 'lightgray'
                                            }}>Adresse non spécifiée</p>
                                            :
                                            <>
                                                <p className="text-muted mb-1">{user.rue}</p>
                                                <p className="text-muted mb-4">{`${user.pays}, ${user.ville} ${user.code_postal}`} </p>
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4" style={{ height: "90%" }}>
                                    <div className="card-body" style={{ height: "90%" }}>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nom complet</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user.first_name} {user.last_name}</p>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Mail</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Téléphone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user.tel ? user.tel : <span className=" mb-4" style={{
                                                    color: 'lightgray'
                                                }}>Téléphone non spécifié</span>}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Date de naissance</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user.birthday ? user.birthday : <span className=" mb-4" style={{
                                                    color: 'lightgray'
                                                }}>Date de naissance non spécifiée</span>}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Sexe</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{user.gender}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-12 text-end'>
                                            <button type="button" class="btn btn-sm btn-outline-success mb-2" onClick={() => {
                                                navigate('/gestion-profil')
                                            }}>Modifier</button>
                                        </div>
                                    </div>

                                </div>
                                {/* <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mb-4 mb-md-0">
                                            <div className="card-body">
                                                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                                                </p>
                                                <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>
                                                <div className="progress rounded" style={{ height: "5px" }}>
                                                    <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="80"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </LayoutOne>
        </Fragment>
    )
}

export default Profile