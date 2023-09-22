import React, { Fragment, useEffect, useState } from "react";
import LayoutOne from "../../../layouts/LayoutOne";
import django from "../GestionArticles/django.png";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { BiLeftArrowAlt } from "react-icons/bi";
import { color } from "framer-motion";
import large_box from "../GestionArticles/Icons/large_box.png";
import medium_box from "../GestionArticles/Icons/medium_box.png";
import small_box from "../GestionArticles/Icons/small_box.png";

import "./style_newArticle.css";
import axiosClient from "../../../axios-client";
import { useLocation, useNavigate } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import ReactLoading from 'react-loading';
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";
import { MdKeyboardArrowDown } from "react-icons/md";

function NewArticle() {
    const location = useLocation();
    const navigate = useNavigate()

    const { user } = useStateContext()

    const [image, setImage] = useState();
    const [imageListe, setimageListe] = useState([]);
    const [selectedImageList, setSelectedImageList] = useState([]);

    const [openCategories, setOpenCategories] = useState(false);

    const [listArticles, setListArticles] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listImages, setListImages] = useState([]);

    const [titleCat, setTitleCat] = useState("");
    const [level, setLevel] = useState(0);

    const [titre_Article, setTitre_Article] = useState("");
    const [description, setDescription] = useState("");
    const [idCat, setIdCat] = useState();
    const [stock, setStock] = useState();
    const [prix_Vente, setPrix_Vente] = useState();
    const [colis, setColis] = useState("");
    const [Boosting, setBoosting] = useState();
    const [boosters, setBoosters] = useState();
    const [listboost, setlistboost] = useState();

    const [boost_type, setboost_type] = useState();
    const [start_date, setstart_date] = useState();
    const [end_date, setend_date] = useState();


    const [isLoadingImages, setIsLoadingImages] = useState(true)
    const [loadingInputs, setLoadingInputs] = useState(true)

    useEffect(() => {

        if (user.id) {

            axiosClient.get("/categories/").then((res) => {
                setListCategories(res.data);
            });

            axiosClient.get(`/articles/${location.state.id_art}/`).then((res) => {
                setListArticles(res.data);
                setColis(res.data.forme_colis);
                setBoosters(res.data?.Boosting)
                setLoadingInputs(false)

            });
            setBoosting(boosters)
        }
    }, [boosters, user.id]);

    useEffect(() => {
        const list = [];
        axiosClient
            .get(`/article-images/?search=${location.state.id_art}`)
            .then((res) => {
                console.log('reeeeeeeeeeeess dataaaaaaaaaa : ', res.data);
                for (let index = 0; index < res.data.length; index++) {
                    list.push(res.data[index].image);
                    setSelectedImageList(list);
                    setimageListe(list);
                }
                setIsLoadingImages(false)
            });
    }, [])

    const [idBoost, setIdBoost] = useState()
    useEffect(() => {
        axiosClient.get(`/boosts/`).then((res) => {
            if (res.data.filter(e => e.article === location.state.id_art).length !== 0) {

                setIdBoost(res.data.filter(e => e.article === location.state.id_art)[0].id)

                setlistboost(res.data.filter(e => e.article === location.state.id_art));
                setboost_type(res.data.filter(e => e.article === location.state.id_art)[0].boost_type)

                const date1 = new Date(res.data.filter(e => e.article === location.state.id_art)[0].start_date);
                setstart_date(date1.toISOString().replace("T", " ").slice(0, 19))

                const date2 = new Date(res.data.filter(e => e.article === location.state.id_art)[0].end_date);
                setend_date(date2.toISOString().replace("T", " ").slice(0, 19))
                console.log('boost data : ', res.data.filter(e => e.article === location.state.id_art));
            }
        });
    }, [])

    const handleChangeImage = (e) => {
        const image = e.target.files;
        if (image) {
            const selectedImage = Array.from(image);
            const ArrayImage = selectedImage.map((file) => {
                return URL.createObjectURL(file);
            });
            setimageListe([...imageListe, selectedImage]);
            setSelectedImageList([...selectedImageList, ArrayImage]);
        }

    };

    // const handledeleteImage = (e, val) => {
    //   const newList = [];
    //   setSelectedImageList(selectedImageList.filter((e) => e !== val));
    //   setimageListe(imageListe.filter((e) => e !== val));
    //   newList.push(imageListe.filter((e) => e !== val));
    //   // setimageListe(newList)
    // };


    const BoostArtic = () => {
        const formData = new FormData();
        if (boost_type) {
            formData.append("boost_type", boost_type);
        }
        if (start_date) {
            formData.append("start_date", start_date);
        }
        if (end_date) {
            formData.append("end_date", end_date);
        }
        axiosClient.patch(`/boosts/${idBoost}/`, formData);

    }

    const changeImageArticl = () => {
        const formData = new FormData();

        if (titre_Article) {
            formData.append("titre", titre_Article);
        }
        if (description) {
            formData.append("description", description);
        }
        formData.append("code_art", "A007");
        if (idCat) {
            formData.append("categorie_id", idCat);
        }
        if (stock) {
            formData.append("stock", stock);
        }
        if (prix_Vente) {
            formData.append("prix_vente", prix_Vente);
        }
        if (colis) {
            formData.append("forme_colis", colis);
        }
        if (Boosting?.toString()) {
            formData.append("Boosting", Boosting);
        }
        formData.append("customer_id", user.id);

        axiosClient.patch(`/articles/${location.state.id_art}/`, formData);

        BoostArtic()

        if (Boosting?.toString() === "false") {
            axiosClient.delete(`/boosts/${idBoost}/`)
        }

        axiosClient
            .get(`/article-images/?search=${location.state.id_art}`)
            .then((res) => {
                const deleteImages_List = res.data.filter(
                    (e) => !imageListe.includes(e.image)
                );
                console.log("data image : ", deleteImages_List);
                console.log("image list : ", imageListe);
                for (let index = 0; index < deleteImages_List.length; index++) {
                    axiosClient.delete(`/article-images/${deleteImages_List[index].id}/`);
                }
                const newImagesToAdd = []
                for (let index = 0; index < imageListe.length; index++) {
                    // const formData = new FormData()
                    // formData.append("article", location.state.id_art);
                    if (typeof imageListe[index] !== "string") {
                        console.log("image inside function : ", imageListe[index]);
                        newImagesToAdd.push(imageListe[index])
                        // axiosClient.post(`/article-images/`,formData)
                    }
                }
                console.log('newImagesToAdd : ', newImagesToAdd);

                const chList = []
                for (let index = 0; index < newImagesToAdd.length; index++) {
                    const formData = new FormData()
                    formData.append("article", location.state.id_art);
                    formData.append("image", newImagesToAdd[index][0]);
                    axiosClient.post(`/article-images/`, formData)
                    chList.push(newImagesToAdd[index][0])
                    console.log('new images : ', chList);
                }

                navigate('/gestion-articles')

                //   if (res.data.length > imageListe.length) {
                //     console.log("data kbira");
                //   }
                //   if (res.data.length < imageListe.length) {
                //     console.log("data sghira");
                //   }
                //   if (res.data.length === imageListe.length) {
                //     for (let index = 0; index < res.data.length; index++) {
                //       if (res.data[index].image === imageListe[index][0]) {
                //         console.log("identique");
                //       }
                //       console.log(`id ${index} est : ${res.data[index].id}`);
                //       const formData = new FormData();
                //       if (typeof imageListe[index] !== "string") {
                //         console.log("image inside function : ", imageListe[index][0]);
                //         console.log("hado ghaytbdlo : ", res.data[index].id);
                //         formData.append("article", location.state.id_art);
                //         formData.append("image", imageListe[index][0]);
                //         // axiosClient.patch(`/article-images/${res.data[index].id}/`,formData)
                //       }
                //     }
                //   }
            });
    };



    const checkParentId = (id) => {
        const list = listCategories.filter((e) => e.parent_id === id);
        if (list.length > 0) {
            return true;
        }
        return false;
    };

    const [parrentId, setParrentId] = useState();
    const [titleCatHeader, setTitleCatHeader] = useState("");

    const [arrayHeadeTitleCat, setArrayHeadTitleCat] = useState([]);
    const [arrayIdsCat, setArrayIdsCat] = useState([]);

    function DropDownMenu() {
        return listCategories
            .filter((e) => e.parent_id === (level ? level : null))
            .map((val, key) => {
                return (
                    <div
                        className="test"
                        style={{
                            height: "10%",
                            width: "100%",
                            borderTop: "none",
                            borderLeft: "none",
                            borderRight: "none",
                            borderBottom: "1px solid gray",
                            padding: "10px 5px 10px 10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            // background: 'red',
                        }}
                        onClick={() => {
                            if (checkParentId(val.id_cat)) {
                                setLevel(val.id_cat);
                                setTitleCatHeader(val.titre);
                                setArrayHeadTitleCat([...arrayHeadeTitleCat, val.titre]);
                                setArrayIdsCat([...arrayIdsCat, val.id_cat]);
                            } else {
                                setTitleCat(val.titre);
                                setIdCat(val.id_cat);
                                setOpenCategories(!openCategories);
                                setArrayHeadTitleCat([]);
                                setArrayIdsCat([]);
                            }
                        }}
                    >
                        <div>
                            <span>
                                <img
                                    src={val.icon}
                                    style={{
                                        height: "15%",
                                        width: "15%",
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        marginRight: 10,
                                    }}
                                />
                                {val.titre}
                            </span>
                        </div>
                        {checkParentId(val.id_cat) ? (
                            <div>
                                <IoIosArrowForward
                                    style={{
                                        fontSize: 20,
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                );
            });
    }

    function precedentListCat() {
        const array1 = arrayHeadeTitleCat;
        const array2 = arrayIdsCat;

        array1.pop();
        array2.pop();
        setTitleCatHeader(array1[arrayHeadeTitleCat.length - 1]);
        setLevel(array2[arrayIdsCat.length - 1]);
        console.log();
    }

    console.log("Selected Image : ", selectedImageList);
    console.log(
        "List Image : ",
        imageListe
        //   .map((val)=>(val.id))
    );


    const addBoosting = () => {
        const formData = new FormData();
        // Parse article_id to an integer
        const parsedArticleId = parseInt(location.state.id_art);

        formData.append("article", parsedArticleId);
        if (boost_type === undefined) {
            formData.append("boost_type", "Performance");

        }




        formData.append("boost_type", boost_type);
        formData.append("user", parseInt(user.id));
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);

        console.log(parsedArticleId, boost_type, user.id, start_date, end_date);

        try {
            axiosClient.post("/boosts/", formData).then((res) => {
                console.log('boosting : ', res.data.id)
            });
        } catch (error) {
            console.error('Error fetching boosting value:', error);
        }
    };


    const modifyBoosting = () => {
        if (typeof idBoost !== 'undefined') {
            const formData = new FormData();
            const parsedArticleId = parseInt(location.state.id_art);

            formData.append("article", parsedArticleId);

            if (typeof boost_type !== 'undefined') {
                formData.append("boost_type", boost_type);
            }

            formData.append("user", parseInt(user.id));

            if (typeof start_date !== 'undefined') {
                formData.append("start_date", start_date);
            }

            if (typeof end_date !== 'undefined') {
                formData.append("end_date", end_date);
            }

            try {
                axiosClient.patch(`/boosts/${idBoost}/`, formData).then((res) => {
                    console.log('Modified boost with ID:', idBoost);
                });
            } catch (error) {
                console.error('Error modifying boost:', error);
            }
        } else {
            console.error('idBoost is undefined. Cannot modify boost.');
        }
    };



    console.log("Boosting:", Boosting);

    const modify = async () => {
        try {
            await changeImageArticl(); // Assuming changeImageArticl() returns a promise.

            // Check if you have an existing boost (Boosting is true)
            if (Boosting) {
                await modifyBoosting();
                console.log('Modified existing boost.');
            } else {
                await addBoosting();
                console.log('Added a new boost.');
            }

            // Reload the page (if needed)
            // window.location.reload();
        } catch (error) {
            console.error('Error modifying/adding boost:', error);
        }
    };


    return (
        <Fragment>
            <LayoutOne onClick={() => setOpenCategories(!openCategories)}>
                <div className="container mt-5">
                    <h3>Modifier l'article</h3>
                    {/* Ajout des images */}
                    <div className="bg-gray p-4 m-3 rounded">
                        <div className="mb-5 font-mono">
                            <span style={{ fontFamily: "cursive", color: "gray" }}>
                                Ajoutez jusqu'à 6 images
                            </span>
                        </div>
                        <div
                            className="row gy-1"
                            style={{
                                minHeight: "200px",
                                border: "1px dashed gray",
                            }}
                        >


                            {isLoadingImages &&
                                <div
                                    className="d-flex justify-content-center align-items-center hidden"
                                    style={{ width: "100%" }}>
                                    <ReactLoading type="spin" color='#17b2b0' height={100} width={100} />
                                </div>
                            }

                            {!isLoadingImages && selectedImageList.length === 0 && (
                                <div
                                    className="d-flex justify-content-center align-items-center hidden"
                                    style={{ width: "100%" }}
                                >
                                    <button
                                        className="px-3"
                                        style={{
                                            height: "20%",
                                            width: "auto",
                                            background: "white",
                                            border: "1px solid purple",
                                            color: "purple",
                                            borderRadius: "5px",
                                            position: "relative",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <AiOutlinePlus
                                            style={{ fontSize: "18px", marginRight: 5 }}
                                        />
                                        <span className="ml-2" style={{ fontWeight: "lighter" }}>
                                            Télécharger des images
                                        </span>
                                        <input
                                            type="file"
                                            class="custom-file-input"
                                            id="inputGroupFile01"
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                height: "100%",
                                                opacity: 0,
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                                            onMouseLeave={(e) =>
                                                (e.target.style.cursor = "context-menu")
                                            }
                                            onChange={handleChangeImage}
                                            accept="image/*"
                                        />
                                    </button>
                                </div>
                            )}

                            {selectedImageList &&
                                selectedImageList.map((val, key) => {
                                    return (
                                        <div
                                            key={key}
                                            className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-xs-6"
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <img
                                                src={val}
                                                className="rounded"
                                                style={{
                                                    height: "200px",
                                                    width: "100%",
                                                    objectFit: "contain",
                                                }}
                                            />
                                            <AiFillCloseCircle
                                                style={{
                                                    position: "absolute",
                                                    fontSize: 30,
                                                    cursor: "pointer",
                                                    color: "#c7c4c4",
                                                    background: "black",
                                                    right: "8%",
                                                    top: "2%",
                                                    borderRadius: "50%",
                                                }}
                                                onClick={(e) => {
                                                    const newImageList = imageListe
                                                    const deleteItemImageListe = newImageList.splice(key, 1)
                                                    setSelectedImageList(
                                                        selectedImageList.filter((e) => e !== val)
                                                    );
                                                    console.log('new Table : ', newImageList);
                                                    console.log('Splited : ', deleteItemImageListe);
                                                    setimageListe(newImageList)
                                                }}
                                            />
                                        </div>
                                    );
                                })}

                            {selectedImageList.length > 0 && selectedImageList.length < 6 && (
                                <div
                                    className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6 d-flex justify-content-center align-items-center"
                                    style={{
                                        height: "200px",
                                    }}
                                >
                                    <button
                                        className="btn btn-md btn-outline-success"
                                        style={{ position: "relative", cursor: "pointer" }}
                                    >
                                        <AiOutlinePlus style={{ fontSize: 22 }} />
                                        <input
                                            type="file"
                                            onChange={handleChangeImage}
                                            style={{
                                                position: "absolute",
                                                width: "100%",
                                                height: "100%",
                                                top: 0,
                                                left: 0,
                                                opacity: 0,
                                            }}
                                            accept="image/*"
                                        />
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>

                    <>
                        {/* titre & description */}
                        <div className="bg-gray p-4 m-3 rounded">
                            <div className="container">
                                <div className="row col-12 d-flex align-items-center justify-content-center">
                                    <div className="titre col-6 d-none d-md-block">
                                        <h5 className="capitalize">titre</h5>
                                    </div>
                                    <div className="input col-md-6">
                                        {loadingInputs ?
                                            <Skeleton style={{
                                                height: 45
                                            }} />
                                            :
                                            <input
                                                type="text"
                                                className="input-lg"
                                                name="titre"
                                                defaultValue={listArticles.titre}
                                                id="titre"
                                                placeholder="Titre"
                                                style={{
                                                    borderBottom: "1px solid gray",
                                                    background: "#7070700f",
                                                }}
                                                onChange={(e) => setTitre_Article(e.target.value)}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className="row col-12 d-flex align-items-start justify-content-space-between mt-5">
                                    <div className="titre col-md-6 d-none d-md-block">
                                        <h5 className="capitalize">description</h5>
                                    </div>
                                    <div className="input col-md-6">
                                        {loadingInputs ?
                                            <Skeleton style={{
                                                height: 85
                                            }} />
                                            :
                                            <textarea
                                                class="input"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                defaultValue={listArticles.description}
                                                placeholder="Description"
                                                style={{
                                                    borderBottom: "1px solid gray",
                                                    background: "#7070700f",
                                                }}
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></textarea>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-gray p-4 m-3 rounded">
                            <div className="container">
                                <div className="row col-12 align-items-center">
                                    <div className="titre col-md-6 d-none d-md-block">
                                        <h5>Catégorie</h5>
                                    </div>
                                    <div
                                        className="input col-md-6 "
                                        style={{ position: "relative" }}
                                    >
                                        {loadingInputs ?
                                            <Skeleton style={{
                                                height: 45
                                            }} />
                                            :
                                            <>
                                                <input
                                                    type="text"
                                                    className="input-lg"
                                                    value={titleCat ? titleCat : listArticles.categorie}
                                                    name=""
                                                    id=""
                                                    placeholder="Catégorie"
                                                    style={{
                                                        borderBottom: "1px solid gray",
                                                        background: "#7070700f",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        setOpenCategories(!openCategories);
                                                        setLevel(0);
                                                        setTitleCatHeader("");
                                                    }}
                                                />
                                                <MdKeyboardArrowDown style={{
                                                    position: 'absolute',
                                                    fontSize: 25,
                                                    color: '#80808085',
                                                    top: '10px',
                                                    right: '16px',
                                                }} />
                                                {openCategories && (
                                                    <div
                                                        className="col-12 mt-1"
                                                        style={{
                                                            position: "absolute",
                                                            background: "white",
                                                            boxShadow: "2px 2px 100px gray",
                                                            width: "96%",
                                                            zIndex: 999,
                                                        }}
                                                    >
                                                        <div
                                                            className=""
                                                            style={{
                                                                padding: "10px 10px 10px 10px",
                                                                background: "none",
                                                                display: "flex",
                                                                justifyContent: level > 0 ? "space-between" : "end",
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            {level > 0 && (
                                                                <>
                                                                    <BiLeftArrowAlt
                                                                        className="precedent-cat"
                                                                        style={{
                                                                            fontSize: 25,
                                                                            cursor: "pointer",
                                                                            transition: ".4s linear",
                                                                        }}
                                                                        onClick={() => {
                                                                            precedentListCat();
                                                                        }}
                                                                    />
                                                                    <span
                                                                        style={{
                                                                            fontSize: 20,
                                                                        }}
                                                                    >
                                                                        {titleCatHeader}
                                                                    </span>
                                                                </>
                                                            )}
                                                            <LiaTimesSolid
                                                                className="close-cat"
                                                                style={{
                                                                    fontSize: 25,
                                                                    cursor: "pointer",
                                                                    transition: ".4s linear",
                                                                    color: "black",
                                                                }}
                                                                onClick={() => {
                                                                    setOpenCategories(!openCategories);
                                                                    setLevel(0);
                                                                    setTitleCatHeader("");
                                                                }}
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                transition: 0.1,
                                                                maxHeight: "350px",
                                                                overflow: "auto",
                                                            }}
                                                        >
                                                            <DropDownMenu />
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="bg-gray p-4 m-3 rounded">
                            <div className="container">
                                <div className="row col-12 align-items-center">
                                    <div className="titre col-md-6 d-none d-md-block">
                                        <h5>Stock</h5>
                                    </div>
                                    <div className="input col-md-6">
                                        {loadingInputs ?
                                            <Skeleton style={{
                                                height: 45
                                            }} />
                                            :
                                            <input
                                                type="text"
                                                min={0}
                                                className="input-lg"
                                                name=""
                                                defaultValue={listArticles.stock}
                                                id=""
                                                placeholder="Stock"
                                                style={{
                                                    borderBottom: "1px solid gray",
                                                    background: "#7070700f",
                                                }}
                                                onChange={(e) => {
                                                    let inputValue = e.target.value;

                                                    // Remove any non-numeric characters, including decimal points and commas
                                                    inputValue = inputValue.replace(/[^0-9]/g, '');

                                                    // Update the input field value with the sanitized value
                                                    e.target.value = inputValue;

                                                    // Update the stock state with the sanitized value
                                                    setStock(inputValue);
                                                }}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Prix */}
                        <div className="bg-gray p-4 m-3 rounded">
                            <div className="container">
                                <div className="row col-12 align-items-center">
                                    <div className="titre col-md-6 d-none d-md-block">
                                        <h5>Prix de vente</h5>
                                    </div>
                                    <div className="input col-md-6">
                                        {loadingInputs ?
                                            <Skeleton style={{
                                                height: 45
                                            }} />
                                            :
                                            <input
                                                type="text"
                                                min={0}
                                                className="input-lg"
                                                name=""
                                                defaultValue={listArticles.prix_vente}
                                                id=""
                                                placeholder="$0.00 Prix de vente"
                                                style={{
                                                    borderBottom: "1px solid gray",
                                                    background: "#7070700f",
                                                }}
                                                onChange={(e) => {
                                                    let inputValue = e.target.value;

                                                    // Remove any characters that are not digits or dots
                                                    inputValue = inputValue.replace(/[^0-9.]/g, '');

                                                    // Replace commas with dots for consistent decimal handling
                                                    inputValue = inputValue.replace(/,/g, '.');

                                                    // Limit to two decimal places
                                                    const decimalParts = inputValue.split('.');
                                                    if (decimalParts.length > 1) {
                                                        decimalParts[1] = decimalParts[1].slice(0, 2); // Keep only two decimal places
                                                        inputValue = decimalParts.join('.');
                                                    }

                                                    // Update the input field value with the sanitized value
                                                    e.target.value = inputValue;

                                                    // Update the prix_Vente state with the sanitized value
                                                    setPrix_Vente(inputValue);
                                                }}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Colis */}
                        <div className="bg-gray p-4 m-3 rounded">
                            <div className="mb-3 font-mono">
                                <span style={{ fontFamily: "cursive", color: "gray" }}>
                                    Sélectionnez la taille de votre colis
                                </span>
                            </div>
                            <div className="container">
                                <div className="row col-12">
                                    <div className="col-12">
                                        <div
                                            className="d-flex align-items-center my-2"
                                            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                                            onMouseLeave={(e) =>
                                                (e.target.style.cursor = "context-menu")
                                            }
                                        >
                                            <div className="col-11">
                                                <label
                                                    for="small"
                                                    className="d-flex  align-items-center"
                                                >
                                                    <div
                                                        className="div"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            marginRight: 15,
                                                        }}
                                                    >
                                                        <img
                                                            src={small_box}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                                objectFit: "contain",
                                                                opacity: 0.5,
                                                                marginRight: 5,
                                                            }}
                                                        />
                                                    </div>
                                                    Small
                                                </label>
                                            </div>
                                            <div className="col-1 d-flex align-items-end w-2">
                                                {loadingInputs ?
                                                    <Skeleton style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: '50%'
                                                    }} />
                                                    :
                                                    <input
                                                        className=""
                                                        type="radio"
                                                        name="colis"
                                                        checked={colis === "Small" || colis === "on"}
                                                        id="small"
                                                        style={{ height: "20px", accentColor: "#a46cdc" }}
                                                        onChange={(e) => {
                                                            setColis(e.target.value);
                                                            if (e.target.value === "on") {
                                                                setColis("Small");
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <hr />
                                        <div
                                            className="d-flex align-items-center my-2"
                                            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                                            onMouseLeave={(e) =>
                                                (e.target.style.cursor = "context-menu")
                                            }
                                        >
                                            <div className="col-11">
                                                <label
                                                    for="medium"
                                                    className="d-flex  align-items-center"
                                                >
                                                    <div
                                                        className="div"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            marginRight: 15,
                                                        }}
                                                    >
                                                        <img
                                                            src={medium_box}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                                objectFit: "contain",
                                                                opacity: 0.5,
                                                                marginRight: 5,
                                                            }}
                                                        />
                                                    </div>
                                                    Medium
                                                </label>
                                            </div>
                                            <div className="col-1 d-flex align-items-end w-2">
                                                {loadingInputs ?
                                                    <Skeleton style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: '50%'
                                                    }} />
                                                    :
                                                    <input
                                                        className=""
                                                        type="radio"
                                                        name="colis"
                                                        checked={colis === "Medium" || colis === "on"}
                                                        value="Medium"
                                                        id="medium"
                                                        style={{ height: "20px", accentColor: "#a46cdc" }}
                                                        onChange={(e) => {
                                                            setColis(e.target.value);
                                                            if (e.target.value === "on") {
                                                                setColis("Medium");
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <hr />
                                        <div
                                            className="d-flex align-items-center my-2"
                                            onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
                                            onMouseLeave={(e) =>
                                                (e.target.style.cursor = "context-menu")
                                            }
                                        >
                                            <div className="col-11">
                                                <label
                                                    for="large"
                                                    className="d-flex  align-items-center"
                                                >
                                                    <div
                                                        className="div"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            marginRight: 15,
                                                        }}
                                                    >
                                                        <img
                                                            src={large_box}
                                                            style={{
                                                                height: "100%",
                                                                width: "100%",
                                                                objectFit: "contain",
                                                                opacity: 0.5,
                                                                marginRight: 5,
                                                            }}
                                                        />
                                                    </div>
                                                    Large
                                                </label>
                                            </div>
                                            <div className="col-1 d-flex align-items-end w-2">
                                                {loadingInputs ?
                                                    <Skeleton style={{
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: '50%'
                                                    }} />
                                                    :
                                                    <input
                                                        className=""
                                                        type="radio"
                                                        name="colis"
                                                        checked={colis === "Large" || colis === "on"}
                                                        value="Large"
                                                        id="large"
                                                        style={{ height: "20px", accentColor: "#a46cdc" }}
                                                        onChange={(e) => {
                                                            setColis(e.target.value);
                                                            if (e.target.value === "on") {
                                                                setColis("Large");
                                                            }
                                                        }}
                                                    />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booster */}
                        <div className="bg-gray p-4 m-3 rounded">
                            <div className="mb-3 font-mono">
                                <span style={{ fontFamily: "cursive", color: "gray" }}>
                                    Booster votre produit
                                </span>
                            </div>
                            <div className="container">
                                <div className="row col-12">
                                    <div className="titre pt-2 col-9">
                                        <h5>
                                            Aidez votre article à se vendre plus rapidement en
                                            touchant plus d'acheteurs.
                                        </h5>
                                    </div>
                                    <div className="col-3">
                                        <div className="row align-items-center">
                                            <span style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>À partir de 1.34$
                                                {loadingInputs ?
                                                    <Skeleton style={{
                                                        height: 30,
                                                        width: 30,
                                                    }} />
                                                    :
                                                    <input
                                                        className="col"
                                                        type="checkbox"
                                                        defaultChecked={boosters}
                                                        style={{ height: "30px", accentColor: "#a46cdc" }}
                                                        onClick={(e) => setBoosting(!Boosting)}
                                                    />
                                                }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Render the fields for Boost */}
                        {Boosting && (
                            <div className="bg-gray p-4 m-3 rounded">
                                <div className="container">
                                    <div className="form-group row mb-3">
                                        <label htmlFor="boost_type" className="col-sm-4 col-form-label text-right">
                                            Boost Type:
                                        </label>
                                        <div className="col-sm-8">
                                            <select
                                                onChange={(e) => setboost_type(e.target.value)}
                                                value={boost_type}
                                                className="form-control"
                                                id="boost_type"
                                                style={{
                                                    background: "#7070700f",
                                                    border: "none",
                                                    borderBottom: "1px solid gray",
                                                    paddingLeft: "25px",
                                                }}
                                                required // Add the 'required' attribute
                                            >
                                                <option value="Default">---------------------------------------</option>
                                                <option value="Performance">Performance</option>
                                                <option value="Manual">Manual</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <label htmlFor="start_date" className="col-sm-4 col-form-label text-right">
                                            Start Date:
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                onChange={(e) => setstart_date(e.target.value)}
                                                type="datetime-local"
                                                className="form-control"
                                                id="start_date"
                                                value={start_date}
                                                placeholder="Start Date"
                                                style={{
                                                    background: "#7070700f",
                                                    border: "none",
                                                    borderBottom: "1px solid gray",
                                                    paddingLeft: "25px",
                                                }}
                                                required // Add the 'required' attribute
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <label htmlFor="end_date" className="col-sm-4 col-form-label text-right">
                                            End Date:
                                        </label>
                                        <div className="col-sm-8">
                                            <input
                                                onChange={(e) => setend_date(e.target.value)}
                                                type="datetime-local"
                                                className="form-control"
                                                id="end_date"
                                                value={end_date}
                                                placeholder="End Date"
                                                style={{
                                                    background: "#7070700f",
                                                    border: "none",
                                                    borderBottom: "1px solid gray",
                                                    paddingLeft: "25px",
                                                }}
                                                required // Add the 'required' attribute
                                            />
                                        </div>
                                    </div>
                                    {/* Add more Boost fields as needed */}
                                </div>
                            </div>
                        )}

                    </>

                    {/*  */}

                    <div className="m-3" style={{
                        display: 'flex',
                        justifyContent: 'right',
                    }}>
                        {(selectedImageList.length === 0 || !boost_type || !start_date || !end_date)
                            ? (
                                <button className="btn-add" disabled>
                                    Modifier
                                </button>
                            )
                            : (
                                <button className="btn-add" onClick={changeImageArticl}>
                                    Modifier
                                </button>
                            )
                        }

                    </div>
                </div>
            </LayoutOne>
        </Fragment >
    );
}

export default NewArticle;
