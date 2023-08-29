import React, { Fragment, useState } from "react";
import SEO from "../../../components/seo";
import LayoutOne from "../../../layouts/LayoutOne";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { BsEye, BsTrash } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import django from "../GestionArticles/django.png";
import logo512 from "../GestionArticles/logo512.png";

function ListeArticles() {
  const navigate = useNavigate();

  const [displayIconSearch, setDisplayIconSearch] = useState(true);

  const [listProduct, setListProduct] = useState([
    {
      image: "django",
      code: "A0001",
      titre: "titre1",
      description: "Description 1",
      categorie: "categorie1",
      stock: 100,
      prixVente: 20,
      typeColis: "petit",
    },
    {
      image: "logo512",
      code: "A0002",
      titre: "titre1",
      description: "Description 1",
      categorie: "categorie1",
      stock: 100,
      prixVente: 20,
      typeColis: "grand",
    },
    {
      image: "django",
      code: "A0003",
      titre: "titre1",
      description: "Description 1",
      categorie: "categorie1",
      stock: 100,
      prixVente: 20,
      typeColis: "moyen",
    },
  ]);
  return (
    <Fragment>
      {/* <SEO
      titleTemplate="Home"
      description="Home page."
    /> */}
      <LayoutOne>
        {/* breadcrumb */}
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Cart", path: process.env.PUBLIC_URL + pathname }
          ]} 
        /> */}
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <Fragment>
              <div
                className="d-flex justify-content-end btn-hover"
                // style={{ display: "flex", justifyContent: "end" }}
              >
                <button
                  className="py-2 px-3 bg-white border-1"
                  onClick={() => {
                    navigate("/nouveau-article");
                  }}
                >
                  Nouveau article
                </button>
              </div>
              <div className="col-sm-12 my-3">
                <div className="row align-items-center ">
                  <div className="col-sm-6">
                    <h3 className="cart-page-title">Mes articles</h3>
                  </div>
                  <div className="col-sm-1 d-none d-sm-block"></div>
                  <div
                    className="col-sm-5"
                    style={{ position: "relative" }}
                  >
                    <input
                      className="input"
                      type="text"
                      name=""
                      id=""
                      placeholder="Recherche"
                      style={
                        {
                          paddingLeft:30
                        }
                      }
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = "5px 5px 50px gray";
                        e.target.style.paddingLeft = "10px";
                        setDisplayIconSearch(false)
                        
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.paddingLeft = "30px";
                        setDisplayIconSearch(true)
                      }}
                    />
                    <AiOutlineSearch
                      style={{
                        fontSize: 18,
                        display: displayIconSearch ? "block" : "none",
                        left: 20,
                        top: 13,
                        position: "absolute",
                        color: "gray",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div>
                  <div className="table-content table-responsive cart-table-content border-r-4">
                    <table className="col-12 ">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Code</th>
                          <th>Titre</th>
                          <th>description</th>
                          <th>categorie</th>
                          <th>stock</th>
                          <th>prix de vente</th>
                          <th>type colis</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listProduct.map((val, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                <img
                                  src={django}
                                  style={{ height: "50px", width: "50px" }}
                                />
                              </td>
                              <td>#{val.code}</td>
                              <td>{val.titre}</td>
                              <td>{val.description}</td>
                              <td>{val.categorie}</td>
                              <td>{val.stock}</td>
                              <td>{val.prixVente}</td>
                              <td>{val.typeColis}</td>
                              <td className="p-0">
                                <div className="d-flex flex-row justify-content-center space-x-6">
                                  <BsEye
                                    style={{ cursor: "pointer", fontSize: 20 }}
                                  />
                                  <LiaEdit
                                    style={{
                                      cursor: "pointer",
                                      marginInline: 4,
                                      fontSize: 20,
                                    }}
                                  />
                                  <BsTrash
                                    style={{
                                      cursor: "pointer",
                                      fontSize: 18,
                                      marginTop: 2,
                                    }}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Fragment>
            {/* <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
}

export default ListeArticles;
