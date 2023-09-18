import React, { Fragment, useEffect, useState } from 'react'
import LayoutOne from '../../layouts/LayoutOne';
import axiosClient, { linkImage } from '../../axios-client';
import axios from 'axios';
import PersonalInfosCmp from './PersonalInfosCmp';
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { BiSolidUserDetail, BiTrendingDown } from "react-icons/bi";
import { BsShieldLockFill } from "react-icons/bs"
import { MdPayment } from "react-icons/md"
import { Navigate, useNavigate, useHistory } from 'react-router-dom';
import SecurityProfile from './SecurityProfile';
import Reduction from './Reduction';
import { useStateContext } from '../../context/ContextProvider';
import Paiement from './Paiement/Paiement';
import defaultImage from '../../../src/assets/image/default-image.png'


const LinkItems = [
    { name: "Détail profil", icon: BiSolidUserDetail, path: "/gestion-profil" },
    { name: "Mot de passe & Sécurité", icon: BsShieldLockFill, path: "/mot-de-passe-et-sécurité" },
    { name: "Paiements", icon: MdPayment, path: "/paiement" },
    { name: "Réduction sur les lots", icon: BiTrendingDown, path: "/réduction-sur-les-lots" },

]; 




function ProfileSide() {
    const { user } = useStateContext();
    const [selectedImage, setSelectedImage] = useState()
    const [image, setImage] = useState()

    const [selectedLink, setSelectedLink] = useState("/gestion-profil");

    const handleChangeImage = (e) => {
        const image = e.target.files[0]
        setSelectedImage(image)
    }

    // Authentification
    useEffect(() => {
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage))
        }
        else {
            setSelectedImage()
        }
    }, [selectedImage]);

    const [uploaded, setUploaded] = useState(null)
    const [reloadPage, setReloadPage]=useState(false)
    const saveImage = () => {    
        const formData = new FormData()
        formData.append('image', selectedImage)
        axiosClient.put('/user_image_update/' + user.id + '/', formData, {
            onUploadProgress: (data) => {
                setUploaded(Math.round((data.loaded / data.total) * 100));
            },
        })
        .then(() => {
            // axiosClient.get('/customers/' + user.id + '/').then(res => {
            //     setImage(res.data.image)
            //     setUploaded(null)
            // })
            
        setSelectedImage()

        window.location.reload()
        })
    }

    const handleLinkClick = (path) => {
        setSelectedLink(path);
    };

    const renderComponent = () => {
        if (selectedLink === "/gestion-profil") {
            return <PersonalInfosCmp />;
        }
        if (selectedLink === "/mot-de-passe-et-sécurité") {
            return <SecurityProfile />;
        }
        if (selectedLink === "/réduction-sur-les-lots") {
            return <Reduction />;
        }
        if (selectedLink === "/paiement") {
            return <Paiement />;
        }

    };

    return (
        <Fragment>
            {/* <SEO
    titleTemplate="Home"
    description="Home page."
  /> */}
            <LayoutOne >
                {/* breadcrumb */}
                {/* <Breadcrumb 
        pages={[
          {label: "Home", path: process.env.PUBLIC_URL + "/" },
          {label: "Cart", path: process.env.PUBLIC_URL + pathname }
        ]} 
      /> */}
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5">
                        {/* <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">User</a></li>
                  <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                </ol>
              </nav>
            </div>
          </div> */}

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <img src={image ? image : user.image ? linkImage + user.image : defaultImage} alt="avatar"
                                                className="rounded-circle img-fluid" style={{ width: "150px", height: '150px',objectFit:'cover' }} />
                                            {selectedImage && image &&
                                                <div
                                                    className="close"
                                                    style={{ position: 'absolute', top: 0, right: 0, fontSize: 20, cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setSelectedImage()
                                                        setImage()
                                                    }}>
                                                    <AiOutlineClose />
                                                </div>
                                            }
                                        </div>
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
                                        <div className="d-flex justify-content-center mb-2">
                                            {uploaded
                                                ?
                                                <button className="btn btn-sm btn-outline-primary" style={{
                                                    width: '150px'
                                                }} type="button" disabled>
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                </button>
                                                :
                                                <button type="button" className="btn btn-sm btn-outline-primary" style={{ position: 'relative', cursor: 'pointer' }}>
                                                    <span>Choisissez une photo</span>
                                                    <input type="file" name="" id="" style={{ cursor: 'pointer', position: 'absolute', left: 0, top: 0, height: '100%', opacity: 0 }} onChange={handleChangeImage} accept='image/*' />
                                                </button>}
                                            {selectedImage &&
                                                <div style={{ marginLeft: 5 }}>
                                                    <button className="btn btn-sm btn-outline-success" onClick={saveImage}>
                                                        <AiOutlineCheck />
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 mb-lg-0">
                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush rounded-3">
                                            {/* <li  className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <BiSolidUserDetail style={{fontSize:25}}/>
                                                <p className="mb-0">Détail profil</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <BsShieldLockFill style={{fontSize:20}}/>
                                                <p className="mb-0">Mot de passe & Sécurité</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-twitter fa-lg" style={{ color: "#55acee" }}></i>
                                                <p className="mb-0">@mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-instagram fa-lg" style={{ color: "#ac2bac" }}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <i className="fab fa-facebook-f fa-lg" style={{ color: "#3b5998" }}></i>
                                                <p className="mb-0">mdbootstrap</p>
                                            </li> */}
                                            {LinkItems.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item d-flex justify-content-between align-items-center p-3"
                                                    onClick={() => handleLinkClick(item.path)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <item.icon style={{ fontSize: 25 }} />
                                                    <p className="mb-0">{item.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            {renderComponent()}



                        </div>
                    </div>
                </section>
            </LayoutOne>
        </Fragment >
    )
}

export default ProfileSide

