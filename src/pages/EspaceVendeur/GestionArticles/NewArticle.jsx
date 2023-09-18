import React, { Fragment, useEffect, useState } from "react";
import LayoutOne from "../../../layouts/LayoutOne";
import django from "../GestionArticles/django.png";
import { AiFillCloseCircle, AiOutlineExclamationCircle, AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { BiLeftArrowAlt } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { color } from "framer-motion";
import large_box from "../GestionArticles/Icons/large_box.png";
import medium_box from "../GestionArticles/Icons/medium_box.png";
import small_box from "../GestionArticles/Icons/small_box.png";

import "./style_newArticle.css";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

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
  const [stock, setStock] = useState('');
  const [prix_Vente, setPrix_Vente] = useState();
  const [colis, setColis] = useState("");
  const [booster, setBooster] = useState(false);


  const [uploaded, setUploaded] = useState()
  const [to, setTo] = useState(0)
  const [idArticle, setIdArticle] = useState()

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
    formData.append("is_booster", booster);
    formData.append("customer_id", user.id);

    axiosClient.post("/articles/", formData).then((res) => {
      AddImagesArticle(res.data.id_art)
      console.log('idddddddddddddd : ', res.data.id_art)
    });
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
                  style={{ position: "relative", cursor: 'pointer' }}
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
                      paddingLeft: [!titleCat ? '25px' : '5px'],
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
                    type="text"
                    min={0}
                    className="input-lg"
                    name=""
                    id=""
                    placeholder="Stock"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      paddingLeft: !stock ? '25px' : '5px'
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
                    type="text"
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
                    Aidez votre article à se vendre plus rapidement en touchant
                    plus d'acheteurs.
                  </h5>
                </div>
                <div className="col-4">
                  <div className="row align-items-center">
                    <span className="col ">À partir de 1.34$</span>
                    <input
                      className="col"
                      type="checkbox"
                      style={{ height: "30px", accentColor: "#a46cdc" }}
                      onChange={() => setBooster(!booster)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </Fragment>
  );
}

export default NewArticle;
