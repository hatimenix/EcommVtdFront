import React, { Fragment, useEffect, useState } from 'react'
import LayoutOne from '../../layouts/LayoutOne';
import axiosClient, { linkImage } from '../../axios-client';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const [User, setUser] = useState([]);

    const [selectedImage, setSelectedImage] = useState()
    const [image, setImage] = useState()


    useEffect(() => {
        axiosClient.get('/auth/user/').then(({ data }) => {
            setUser(data);
        });
    }, []);

    const navigate = useNavigate()

    return (
        <Fragment>

            <LayoutOne >

                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4" style={{height:"90%"}}>
                                    <div className="card-body text-center">
                                        <img src={image ? image : linkImage+User.image} alt="avatar"
                                            className="rounded-circle img-fluid" style={{ width: "150px", height: '150px' }} />
                                        <h5 className="my-3">{User.first_name} {User.last_name}</h5>
                                        <p className="text-muted mb-1">{User.rue}</p>
                                        <p className="text-muted mb-4">{`${User.pays}, ${User.ville} ${User.code_postal}`} </p>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4" style={{height:"90%"}}>
                                    <div className="card-body" style={{height:"90%"}}>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Nom complet</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{User.first_name} {User.last_name}</p>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Mail</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{User.email}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Telephone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{User.tel}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Date de naissance</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{User.birthday}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Sexe</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{User.gender}</p>
                                            </div>
                                        </div>
                                        <div className='col-sm-12 text-end'>
                                            <button type="button" class="btn btn-sm btn-outline-success mb-2" onClick={()=>{
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