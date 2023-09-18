import React, { Fragment, useEffect, useState } from "react";
import LayoutOne from "../../../layouts/LayoutOne";
import django from "../GestionArticles/django.png";
import { AiFillCloseCircle, AiOutlineExclamationCircle, AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { BiLeftArrowAlt } from "react-icons/bi";
import { color } from "framer-motion";
import large_box from "../GestionArticles/Icons/large_box.png";
import medium_box from "../GestionArticles/Icons/medium_box.png";
import small_box from "../GestionArticles/Icons/small_box.png";
import Paiement from '../../ProfileSettings/Paiement/pay'; // Adjust the path to the Paiement component file as needed
import "./style_newArticle.css";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Paiement from './pay'; // Adjust the path to the Paiement component file as needed

function NewArticle() {
  const { user } = useStateContext();

  const navigate = useNavigate()

  const [imageListe, setimageListe] = useState([]);
  const [selectedImageList, setSelectedImageList] = useState([]);

  const [openCategories, setOpenCategories] = useState(false);

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

  console.log("selected image list : ", selectedImageList);
  console.log("image list : ", imageListe);

  const deleteimg = (i) => {
    setimageListe(imageListe.filter((e) => e !== i));
  };

  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    axiosClient.get("/categories/").then((res) => {
      setListCategories(res.data);
    });
  }, []);

  const [titleCat, setTitleCat] = useState("");
  const [level, setLevel] = useState(0);

  const [titre_Article, setTitre_Article] = useState("");
  const [description, setDescription] = useState("");
  const [idCat, setIdCat] = useState();
  const [stock, setStock] = useState();
  const [prix_Vente, setPrix_Vente] = useState();
  const [colis, setColis] = useState("");
  const [Boosting, setBoosting] = useState(false);
  const [article, setarticle] = useState();
  // const [user, setuser] = useState(false);
  const [boost_type, setboost_type] = useState();
  const [start_date, setstart_date] = useState();
  const [end_date, setend_date] = useState();
  const [boosted_articles, setboosted_articles] = useState([1, 2]);

  const [uploaded, setUploaded] = useState()
  const [to, setTo] = useState(0)
  const [idArticle, setIdArticle] = useState()

  const [name, setname] = useState()
  const [numCard, setnumCard] = useState()
  const [expDate, setexpDate] = useState()
  const [securityCode, setsecurityCode] = useState()
  const [customer, setcustomer] = useState()


  const AddArticle = () => {
    // setUploaded(true)
    const formData = new FormData();
    formData.append("titre", titre_Article);
    formData.append("code_art", "A007");
    formData.append("description", description);
    formData.append("categorie_id", idCat);
    formData.append("stock", stock);
    formData.append("prix_vente", prix_Vente);
    formData.append("unit_prix", prix_Vente);
    formData.append("forme_colis", colis);
    formData.append("Boosting", Boosting);
    formData.append("customer_id", user.id);

    axiosClient.post("/articles/", formData).then((res) => {
      AddImagesArticle(res.data.id_art)
      Boosting && addBoosting(res.data.id_art)
      console.log('idddddddddddddd : ', res.data.id_art)
    });
  };


  const addBoosting = (article_id) => {
    // setUploaded(true)
    const formData = new FormData();
    formData.append("article", article_id);
    formData.append("boost_type", boost_type);
    formData.append("user", user.id);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("boosted_articles", boosted_articles);

    try {
      axiosClient.post("/boosts/", formData).then((res) => {
        console.log('boosting : ', res.data.id)
      });

    }
    catch (error) {
      console.error('Error fetching boosting value:', error);
    }
  };


  const addpaiement = (article_id) => {
    // setUploaded(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("numCard", numCard);
    formData.append("expDate", expDate);
    formData.append("securityCode", securityCode);
    formData.append("customer", user.id);


    try {
      axiosClient.post("/paiement/", formData).then((res) => {
        console.log('paiement : ', res.data.id)
      });

    }
    catch (error) {
      console.error('Error fetching paiement value:', error);
    }
  };


  const AddImagesArticle = (id) => {
    const img = []
    const done = []
    for (let index = 0; index < imageListe.length; index++) {
      img.push([imageListe[index]]);
    }

    for (let index = 0; index < selectedImageList.length; index++) {
      const formData = new FormData();
      formData.append("article", id);
      formData.append("image", imageListe[index][0]);
      axiosClient.post("/article-images/", formData
        // , {
        //   onUploadProgress: (data) => {
        //     setUploaded(Math.round((data.loaded / data.total) * 100))
        //     // console.log(Math.round((data.loaded / data.total) * 100));
        //   }
        // }
      );
      done.push([true])

    }

    // imageListe.map((val) => {
    //   const formData = new FormData();
    //   formData.append("article", id);
    //   formData.append("image", val[0]);
    //   axiosClient.post("/article-images/", formData
    //     // , {
    //     //   onUploadProgress: (data) => {
    //     //     setUploaded(Math.round((data.loaded / data.total) * 100))
    //     //     // console.log(Math.round((data.loaded / data.total) * 100));
    //     //   }
    //     // }
    //   );
    //   done.push([true])

    //   // test.push([key])
    //   // console.log("form Data : ", res.data.id_art, " id : ", val[0]);
    //   // console.log('uploaaaaaaaaaaaad : ',uploaded);
    // });

    axiosClient.get("/article-images/").then(res => {
      console.log('leeeeeeeeeeeength : ', res.data.filter(e => e.article === id).length)
      if (res.data.filter(e => e.article === id)) {
        window.location.href = '/gestion-articles'
        console.log('holla');
      }
    })
  }


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
              <span className="d-flex align-items-center">
                <div
                  style={{
                    marginRight: 10,
                    height: 40,
                    width: 40,
                    // background: "black",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={val.icon}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
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

  useEffect(() => {
    // Fetch the boosting attribute from the backend
    const fetchBoostingValue = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/boosts/', {
          withCredentials: true,
        });
        const data = response.data;
        // Set the boosting state based on the fetched value
        setBoosting(data.boosting);
      } catch (error) {
        console.error('Error fetching boosting value:', error);
      }
    };

    // Call the fetchBoostingValue function to fetch the value
    fetchBoostingValue();
  }, []); // Run this effect only once on component mount

  const [selectedLink, setSelectedLink] = useState("/nouveau-article");

  const renderComponent = () => {

    if (selectedLink === "/paiement") {
      return <Paiement />;
    }
  };
  return (
    <Fragment>
      <LayoutOne onClick={() => setOpenCategories(!openCategories)}>
        <div className="container mt-5">
          <h3>Vendre un article</h3>
          {/* Ajout des images */}
          <div className="bg-gray p-4 m-3 rounded">
            <div className="mb-5 font-mono">
              <span style={{ fontFamily: "cursive", color: "gray", display: 'flex', alignItems: 'center' }}>
                Ajoutez jusqu'à 6 images <AiOutlineExclamationCircle style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: '#80808085',
                  display: [selectedImageList.length === 0 ? 'block' : 'none']
                }} />

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
                        onClick={() => {
                          // deleteimg(key)
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

          {/* titre & description */}
          <div className="bg-gray p-4 m-3 rounded">
            <div className="container">
              <div className="row col-12 d-flex align-items-center justify-content-center">
                <div className="titre col-6 d-none d-md-block">
                  <h5 className="capitalize">titre</h5>
                </div>
                <div className="input col-md-6" style={{
                  position: 'relative'
                }}>
                  <AiOutlineExclamationCircle style={{
                    position: 'absolute',
                    fontSize: 18,
                    color: '#80808085',
                    top: '14px',
                    left: '16px',
                    display: [!titre_Article ? 'block' : 'none']
                  }} />
                  <input
                    type="text"
                    className="input-lg"
                    name=""
                    id=""
                    placeholder="Titre"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      paddingRight: 52,
                      paddingLeft: [!titre_Article ? '25px' : '5px']
                    }}
                    onChange={(e) => setTitre_Article(e.target.value)}
                    maxlength="50"
                    required
                  />
                  <span style={{
                    position: "absolute",
                    right: '16px',
                    top: '10px',
                    color: '#80808085'
                  }}>{titre_Article.length}/50</span>
                </div>
              </div>

              <div className="row col-12 d-flex align-items-start justify-content-space-between mt-5">
                <div className="titre col-md-6 d-none d-md-block">
                  <h5 className="capitalize">description</h5>
                </div>
                <div className="input col-md-6" style={{
                  position: 'relative'
                }}>
                  <AiOutlineExclamationCircle style={{
                    position: 'absolute',
                    fontSize: 18,
                    color: '#80808085',
                    top: '14px',
                    left: '16px',
                    display: [!description ? 'block' : 'none']
                  }} />
                  <textarea
                    class="input"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Description"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      paddingRight: 52,
                      paddingLeft: [!description ? '25px' : '5px']
                    }}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={100}
                    required
                  ></textarea>

                  <span style={{
                    position: "absolute",
                    right: '16px',
                    top: '10px',
                    color: '#80808085'
                  }}>{description.length}/100</span>
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
                  <AiOutlineExclamationCircle style={{
                    position: 'absolute',
                    fontSize: 18,
                    color: '#80808085',
                    top: '14px',
                    left: '16px',
                    display: [!titleCat ? 'block' : 'none']
                  }} />
                  <input
                    type="text"
                    className="input-lg"
                    value={titleCat}
                    name=""
                    id=""
                    placeholder="Catégorie"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      cursor: "pointer",
                      paddingLeft: [!titleCat ? '25px' : '5px']
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
                <div className="input col-md-6"
                  style={{ position: "relative" }}>
                  <AiOutlineExclamationCircle style={{
                    position: 'absolute',
                    fontSize: 18,
                    color: '#80808085',
                    top: '14px',
                    left: '16px',
                    display: [!stock ? 'block' : 'none']
                  }} />
                  <input
                    type="number"
                    min={0}
                    className="input-lg"
                    name=""
                    id=""
                    placeholder="Stock"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      paddingLeft: [!stock ? '25px' : '5px']
                    }}
                    onChange={(e) => setStock(e.target.value)}
                  // maxLength={5}
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
                <div className="input col-md-6" style={{
                  position: 'relative'
                }}>
                  <AiOutlineExclamationCircle style={{
                    position: 'absolute',
                    fontSize: 18,
                    color: '#80808085',
                    top: '14px',
                    left: '16px',
                    display: [!prix_Vente ? 'block' : 'none']
                  }} />
                  <input
                    type="number"
                    min={0}
                    className="input-lg"
                    name=""
                    id=""
                    placeholder="$0.00 Prix de vente"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      paddingLeft: [!prix_Vente ? '25px' : '5px']
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
              <span style={{ fontFamily: "cursive", color: "gray", display: 'flex', alignItems: 'center' }}>
                Sélectionnez la taille de votre colis <AiOutlineExclamationCircle style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: '#80808085',
                  display: [!colis ? 'block' : 'none']
                }} />
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
                      <label for="small" className="d-flex  align-items-center">
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
                        value="Small"
                        id="small"
                        style={{ height: "20px", accentColor: "#a46cdc" }}
                        onChange={(e) => setColis(e.target.value)}
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
                        value="Medium"
                        id="medium"
                        style={{ height: "20px", accentColor: "#a46cdc" }}
                        onChange={(e) => setColis(e.target.value)}
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
                      <label for="large" className="d-flex  align-items-center">
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
                        value="Large"
                        id="large"
                        style={{ height: "20px", accentColor: "#a46cdc" }}
                        onChange={(e) => setColis(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booster */}
          <div className="common-style">
            <div className="mb-3 font-mono">
              <span style={{ fontFamily: "cursive", color: "gray" }}>
                Booster votre produit
              </span>
            </div>
            <div className="container">
              <div className="row col-12">
                <div className="titre pt-2 col-8">
                  <h5>
                    Aidez votre article à se vendre plus rapidement en touchant
                    plus d'acheteurs.
                  </h5>
                </div>
                <div className="col-4">
                  <div className="row align-items-center">
                    <span className="col">À partir de 1.34$</span>
                    <input
                      className="col"
                      type="checkbox"
                      style={{ height: "30px", accentColor: "#a46cdc" }}
                      onChange={() => setBoosting(!Boosting)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boost Fields */}
          {Boosting && (
            <div className="common-style">
              {/* Render the fields for Boost */}
              <div className="form-group">
                <label htmlFor="boost_type">Boost Type</label>
                <input
                  onChange={(e) => setboost_type(e.target.value)}
                  type="text"
                  className="form-control"
                  id="boost_type"
                // Add other props and handlers as needed
                />
              </div>
              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input
                  onChange={(e) => setstart_date(e.target.value)}
                  type="date"
                  className="form-control"
                  id="start_date"
                // Add other props and handlers as needed
                />
              </div>
              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  onChange={(e) => setend_date(e.target.value)}
                  type="date"
                  className="form-control"
                  id="end_date"
                // Add other props and handlers as needed
                />
              </div>
              {/* Add more Boost fields as needed */}
            </div>
          )}

          {/* Payment Fields */}
          {Boosting && (
            <div className="common-style">
              {/* Render the fields for Payment */}
              <div>
                <h1>Paiement</h1>
                {/* Include the Paiement component with the common style */}
                <Paiement />
              </div>
              {/* Add more Payment fields as needed */}
            </div>
          )}

          {/*  */}
          <div className="m-3" style={{
            display: 'flex',
            justifyContent: 'right',
          }}>
            {(selectedImageList.length === 0 || !titre_Article || !description || !titleCat || !stock || !prix_Vente || !colis)
              ?
              <button className="btn-add" title={`Veuillez remplir les champs obligatoires !`} disabled>
                Ajouter
              </button>
              :
              uploaded
                ?
                <button class="btn-loading" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                : <button className="btn-add" onClick={() => {
                  AddArticle()
                }}>
                  Ajouter
                </button>
            }
          </div>
        </div>
      </LayoutOne>
    </Fragment >
  );
}

export default NewArticle;
