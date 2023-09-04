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
import { useLocation } from "react-router-dom";

function NewArticle() {
  const location = useLocation();

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
  const [booster, setBooster] = useState(false);

  useEffect(() => {
    const list = [];

    axiosClient.get("/categories/").then((res) => {
      setListCategories(res.data);
    });

    axiosClient.get(`/articles/${location.state.id_art}/`).then((res) => {
      setListArticles(res.data);
      setColis(res.data.forme_colis);
    });
    axiosClient
      .get(`/article-images/?search=${location.state.id_art}`)
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          list.push(res.data[index].image);
          setSelectedImageList(list);
          setimageListe(list);
        }
      });
  }, []);

  const handleChangeImage = (e) => {
    const image = e.target.files;
    const selectedImage = Array.from(image);
    const ArrayImage = selectedImage.map((file) => {
      return URL.createObjectURL(file);
    });
    setimageListe([...imageListe, selectedImage]);
    setSelectedImageList([...selectedImageList, ArrayImage]);
  };

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
    if (booster) {
      formData.append("is_booster", booster);
    }
    formData.append("customer_id", 2);

    axiosClient.patch(`/articles/${location.state.id_art}/`, formData);

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
        console.log('newImagesToAdd : ',newImagesToAdd);
        const formData = new FormData()
        for (let index = 0; index < newImagesToAdd.length; index++) {
            formData.append("article", location.state.id_art);
            formData.append("image", newImagesToAdd[index][0]);
            axiosClient.post(`/article-images/`,formData)            
        }
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

  const AddArticle = () => {
    const img = [];
    const formData = new FormData();
    formData.append("titre", titre_Article);
    formData.append("code_art", "A007");
    formData.append("description", description);
    formData.append("categorie_id", idCat);
    formData.append("stock", stock);
    formData.append("prix_vente", prix_Vente);
    formData.append("unit_prix", prix_Vente);
    formData.append("forme_colis", colis);
    formData.append("is_booster", booster);
    formData.append("customer_id", 2);

    for (let index = 0; index < imageListe.length; index++) {
      img.push([imageListe[index]]);
    }

    axiosClient.post("/articles/", formData).then((res) => {
      imageListe.map((val) => {
        const formData = new FormData();
        formData.append("article", res.data.id_art);
        formData.append("image", val[0]);
        axiosClient.post("/article-images/", formData);
      });
    });
    // console.log(titre_Article, ' ', description, ' ', idCat, ' ', stock, ' ', prix_Vente, ' ', colis, ' ', booster);
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

  return (
    <Fragment>
      <LayoutOne onClick={() => setOpenCategories(!openCategories)}>
        <div className="container">
          <h3>Vendre un article</h3>
          {/* Ajout des images */}
          <div className="bg-gray p-4 m-3 rounded">
            <div className="mb-5 font-mono">
              <span style={{ fontFamily: "cursive", color: "gray" }}>
                Ajoutez jusqu'à 6 images
              </span>
            </div>
            {/* {images.map((val, key) => {
              return (<img src={val} />)
            })} */}
            <div
              className="row gy-1"
              style={{
                minHeight: "200px",
                border: "1px dashed gray",
              }}
            >
              {selectedImageList.length === 0 && (
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
                          const newList = imageListe;
                          const deleteItemImageListe = newList.splice(key,1)
                          setSelectedImageList(selectedImageList.filter((e) => e !== val));
                          setimageListe(newList)
                        }}
                      />
                    </div>
                  );
                })}

              {/* <div className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6">
                <img
                  src={django}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6">
                <img
                  src={django}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6">
                <img
                  src={django}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6">
                <img
                  src={django}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6">
                <img
                  src={django}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6">
                <img
                  src={django}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div> */}
              {/*               
              {imageListe && imageListe.map((val, key) => {
                return (
                  <div
                    key={key}
                    className="col-lg-3 col-md-3"
                    style={{
                      position: 'relative',
                      paddingLeft: 3,
                      paddingRight: 3,
                      background:'black',
                    }}>
                    <img
                      src={val}
                      className="rounded"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <AiFillCloseCircle style={{
                      position: 'absolute',
                      fontSize: 30,
                      cursor: 'pointer',
                      left: "80%",
                      top: "5%",
                      color: "#c7c4c4",
                    }}
                      onClick={() => {
                        setimageListe(imageListe.filter(e => e !== val))
                      }} />
                  </div>
                )
                // <div
                //   className="col-lg-2 col-md-3 col-sm-6 my-1"
                //   style={{
                //     position: 'relative',
                //     paddingLeft: 3,
                //     paddingRight: 3
                //   }}>
                //   <img
                //     key={key}
                //     src={val}
                //     className="rounded"
                //     style={{
                //       height: "100%",
                //       width: "100%",
                //       objectFit: "contain",
                //     }}
                //   />
                //   <AiFillCloseCircle style={{
                //     position: 'absolute',
                //     fontSize: 30,
                //     cursor: 'pointer',
                //     left: "80%",
                //     top: "5%",
                //     color: "#c7c4c4",
                //   }} />
                // </div>
              })} */}

              {selectedImageList.length > 0 && selectedImageList.length < 6 && (
                // <div
                //   className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6"
                //   style={{
                //     height:'20%',
                //     // width:'100%'
                //   }}
                // >
                //   <button
                //     className="btn btn-md btn-outline-success"
                //     style={{ position: "relative", cursor: "pointer" }}
                //   >
                //     <AiOutlinePlus style={{ fontSize: 22 }} />
                //     <input
                //       type="file"
                //       multiple
                //       onChange={handleChangeImage}
                //       style={{
                //         position: "absolute",
                //         width: "100%",
                //         height: "100%",
                //         top: 0,
                //         left: 0,
                //         opacity: 0,
                //       }}
                //       accept="image/*"
                //     />
                //   </button>
                // </div>
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
              {/* {myImages()} */}
              {/* {images && images.map((val, key) => {
              <div
                key={key}
                className="col-lg-2 col-md-3 col-sm-6 my-1"
                style={{
                  position: 'relative',
                  paddingLeft: 3,
                  paddingRight: 3
                }}>
                <img
                  src={val}
                  className="rounded"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <AiFillCloseCircle style={{
                  position: 'absolute',
                  fontSize: 30,
                  cursor: 'pointer',
                  left: "80%",
                  top: "5%",
                  color: "#c7c4c4",
                }} />
              </div>
              })} */}
              {/*
               */}
            </div>
            {/* <div
              className="d-flex flex-row max"
              style={{ height: "200px", border: "1px dashed gray" }}
            >
              <div className="border h-100" style={{ width: "20%" }}>
                <img
                  className="rounded "
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={logo512}
                />
              </div>
              <div className="border h-100" style={{ width: "20%" }}>
                <img
                  className="rounded "
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={logo512}
                />
              </div>
              <div className="border h-100" style={{ width: "20%" }}>
                <img
                  className="rounded "
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={logo512}
                />
              </div>
              <div className="border h-100" style={{ width: "20%" }}>
                <img
                  className="rounded "
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={logo512}
                />
              </div>
              <div className="border h-100" style={{ width: "20%" }}>
                <img
                  className="rounded "
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={logo512}
                />
              </div>
            </div> */}
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
                  </div>
                </div>

                <div className="row col-12 d-flex align-items-start justify-content-space-between mt-5">
                  <div className="titre col-md-6 d-none d-md-block">
                    <h5 className="capitalize">description</h5>
                  </div>
                  <div className="input col-md-6">
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
                    {/* <input
                    type="text"
                    className="input-lg"
                    name=""
                    id=""
                    placeholder="Titre"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                    }}
                  /> */}
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
                            // onMouseEnter={(e) => {
                            //   e.target.style.scale = 1.2;
                            //   e.target.style.color = "#a749ff";
                            //   e.target.style.boxShadow = "10px 10px 50px #a749ff";
                            //   e.target.style.transform = "rotate(90deg)";
                            //   e.target.style.background = "none";
                            // }}
                            // onMouseLeave={(e) => {
                            //   e.target.style.scale = 1;
                            //   e.target.style.color = "black";
                            //   e.target.style.boxShadow = "none";
                            //   e.target.style.transform = "rotate(-90deg)";
                            //   e.target.style.background = "none";
                            // }}
                            onClick={() => {
                              setOpenCategories(!openCategories);
                              setLevel(0);
                              setTitleCatHeader("");
                            }}
                          />
                        </div>
                        {/* <button onClick={() => setLevel(level)}>1</button> */}
                        <div
                          style={{
                            transition: 0.1,
                            maxHeight: "350px",
                            overflow: "auto",
                          }}
                        >
                          {/* {listCategories
                          .filter(e => e.parent_id === (level ? level : null))
                          .map((val, key) => {
                            return (
                              <div className="test" key={key} onClick={() => {
                                if (checkParentId(val.id_cat)) {
                                  setLevel(val.id_cat)
                                  setTitleCatHeader(val.titre)
                                } else {
                                  setTitleCat(val.titre)
                                  setIdCat(val.id_cat)
                                  setOpenCategories(!openCategories)
                                }
                              }}>
                                <DropDownMenu check={checkParentId(val.id_cat)} id={checkParentId(val.id_cat) && val.id_cat} icon={2}>
                                  <div style={{
                                    height: '50px',
                                    width: '50px',
                                    borderRadius: '50%'
                                  }}>
                                    <img src={val.icon} style={{
                                      height: '100%',
                                      width: '100%',
                                      objectFit: 'contain'
                                    }} />
                                  </div>
                                  {val.titre}
                                </DropDownMenu>
                              </div>
                            )
                          })} */}
                          <DropDownMenu />
                        </div>
                      </div>
                    )}
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
                    <input
                      type="number"
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
                      onChange={(e) => setStock(e.target.value)}
                    />
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
                    <input
                      type="number"
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
                      onChange={(e) => setPrix_Vente(e.target.value)}
                    />
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
                  <div className="titre pt-2 col-8">
                    <h5>
                      Aidez votre article à se vendre plus rapidement en
                      touchant plus d'acheteurs.
                    </h5>
                  </div>
                  <div className="col-4">
                    <div className="row align-items-center">
                      <span className="col ">À partir de 1.34$</span>
                      <input
                        className="col"
                        defaultChecked={listArticles.is_booster}
                        type="checkbox"
                        style={{ height: "30px", accentColor: "#a46cdc" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>

          {/*  */}

          <div className=" m-3">
            <button className="btn-add" onClick={changeImageArticl}>
              Modifier
            </button>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}

export default NewArticle;
