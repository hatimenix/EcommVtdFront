import React, { Fragment, useState } from "react";
import LayoutOne from "../../../layouts/LayoutOne";
import django from "../GestionArticles/django.png";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { color } from "framer-motion";
import large_box from "../GestionArticles/Icons/large_box.png";
import medium_box from "../GestionArticles/Icons/medium_box.png";
import small_box from "../GestionArticles/Icons/small_box.png";
import DropDown from "../GestionArticles/DropDown"

import "./style_newArticle.css";

function NewArticle() {
  const [imageListe, setimageListe] = useState([]);

  const [openCategories, setOpenCategories] = useState(false);

  const handleChangeImage = (e) => {
    const image = e.target.files;
    const selectedImage = Array.from(image);
    const ArrayImage = selectedImage.map((file) => {
      return URL.createObjectURL(file);
    });
    setimageListe([...imageListe, ArrayImage]);
  };


  const [level,setLevel]=useState(0)
  const [listCat, setlistCat] = useState([
    {id:1, titre: 'Cat1', level: 0, parentId:0 },
    {id:2, titre: 'Cat2', level: 0, parentId:0 },
    {id:3, titre: 'Cat3', level: 0, parentId:0 },
    {id:4, titre: 'Cat4', level: 0, parentId:0 },
    {id:5, titre: 'Cat5', level: 0, parentId:0 },
    {id:6, titre: 'Cat6', level: 0, parentId:0 },
    {id:7, titre: 'Cat11', level: 1, parentId:1 },
    {id:8, titre: 'Cat21', level: 1, parentId:2 },
    {id:9, titre: 'Cat31', level: 1, parentId:1 },
    {id:10, titre: 'Cat41', level: 1, parentId:2 },
    {id:11, titre: 'Cat51', level: 1, parentId:1 },
    {id:12, titre: 'Cat61', level: 1, parentId:3 },
    {id:13, titre: 'Cat12', level: 2, parentId:1 },
    {id:14, titre: 'Cat22', level: 2, parentId:3 },
    {id:15, titre: 'Cat32', level: 2, parentId:3 },
    {id:16, titre: 'Cat42', level: 2, parentId:3 },
    {id:17, titre: 'Cat52', level: 2, parentId:1 },
    {id:18, titre: 'Cat62', level: 2, parentId:1 }
  ])

  const [activeMenu, setactiveMenu] = useState('main')

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
                marginLeft: 1,
                minHeight: "200px",
                border: "1px dashed gray",
              }}
            >
              {imageListe.length === 0 && (
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

              {imageListe &&
                imageListe.map((val, key) => {
                  return (
                    <div
                      key={key}
                      className="col-xl-2 col-lg-3  col-md-4 col-sm-5 col-xs-6"
                      style={{
                        position: "relative",
                      }}
                    >
                      <img
                        src={val}
                        className="rounded"
                        style={{
                          height: "100%",
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
                          right: "5%",
                          top: "2%",
                          borderRadius: "50%",
                        }}
                        onClick={() => {
                          setimageListe(imageListe.filter((e) => e !== val));
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

              {imageListe.length > 0 && imageListe.length < 6 && (
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
                <div className="input col-md-6">
                  <input
                    type="text"
                    className="input-lg"
                    name=""
                    id=""
                    placeholder="Titre"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                    }}
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
                    placeholder="Description"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                    }}
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
                    name=""
                    id=""
                    placeholder="Catégorie"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenCategories(!openCategories)}
                  />
                  {openCategories && (
                    <div
                      className="col-12 mt-1"
                      style={{
                        position: "absolute",
                        background: "white",
                        maxHeight: "350px",
                        overflow: "auto",
                        boxShadow: "2px 2px 100px gray",
                        width: "96%"
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-end m-1 p-1" style={{
                        background: "none",
                      }}>
                        <FaTimes
                          style={{
                            fontSize: 20,
                            cursor: "pointer",
                            transition: ".4s linear",
                            // background: "transparent",
                            borderRadius: '50%',
                            color: 'black'
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
                          onClick={() => setOpenCategories(!openCategories)}
                        />
                      </div>
                      {/* <button onClick={()=>setLevel(1)}>1</button>
                      {listCat
                      .filter(e=>e.level === level)
                      .map((val)=>{
                        return(
                          <DropDownMenu>
                            {val.id}
                           { val.titre}

                           {val.level}
                           {val.parentId}
                          </DropDownMenu>
                        )
                      })} */}
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
                    id=""
                    placeholder="Stock"
                    style={{
                      borderBottom: "1px solid gray",
                      background: "#7070700f",
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
                <div className="input col-md-6">
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
                    }}
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
                        id="small"
                        style={{ height: "20px", accentColor: "#a46cdc" }}
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
                        id="medium"
                        style={{ height: "20px", accentColor: "#a46cdc" }}
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
                        id="large"
                        style={{ height: "20px", accentColor: "#a46cdc" }}
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          <DropDown />
        </div>
      </LayoutOne>
    </Fragment>
  );
}

export default NewArticle;



function DropDownMenu(props,{id}) {
  return (
    <li>
      <span>{props.id}</span>
      {props.children}
      <strong style={{marginTop:'5px'}}>{props.level} & {props.parentId}</strong>
      <button>up</button>
    </li>
  )
}


function DropDownItem() {
  return (
    <div>NewArticle</div>
  )
}
