import React, { Fragment, useState } from "react";
import SEO from "../../../components/seo";
import LayoutOne from "../../../layouts/LayoutOne";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Modal } from "react-bootstrap";
import { BsEye, BsTrash } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import django from "../GestionArticles/django.png";
import logo512 from "../GestionArticles/logo512.png";
import { useEffect } from "react";
import axiosClient from "../../../axios-client";
import { useCallback } from "react";

function ListeArticles() {
  const navigate = useNavigate();

  const [displayIconSearch, setDisplayIconSearch] = useState(true);

  const [listArticle, setListArticle] = useState([]);
  const [emptyListMessage, setEmptyListMessage] = useState("");

  useEffect(() => {
    axiosClient.get("/articles/").then((res) => {
      setListArticle(res.data.filter((e) => e.customer_id === 2));
      if (res.data.filter((e) => e.customer_id === 2).length === 0) {
        setEmptyListMessage("Votre store est vide");
      }
    });
  }, []);

  function update() {
    axiosClient.get("/articles/").then((res) => {
      setListArticle(res.data.filter((e) => e.customer_id === 2));
      if (res.data.filter((e) => e.customer_id === 1).length === 0) {
        setEmptyListMessage("Votre store est vide");
      }
    });
  }

  const [alertDelete, setAlertDelete] = useState(false);
  const [deleted_id, setDeleted_id] = useState();

  const deleteArticle = (id) => {
    axiosClient.delete(`/articles/${id}/`).then(() => {
      setListArticle(listArticle.filter((e) => e.id_art !== id));
    });
    setAlertDelete(false);
  };

  const [search, setSearch] = useState("");

  const filtredData = useCallback(() => {
    return listArticle.filter((row) => {
      return (
        row.code_art.toLowerCase().includes(search.toLocaleLowerCase()) ||
        row.titre.toLowerCase().includes(search.toLocaleLowerCase()) ||
        row.description.toLowerCase().includes(search.toLocaleLowerCase()) ||
        row.categorie.toLowerCase().includes(search.toLocaleLowerCase()) ||
        row.stock.toString().includes(search.toString()) ||
        row.prix_vente.toString().includes(search.toString()) ||
        row.forme_colis.toLowerCase().includes(search.toLocaleLowerCase())
      );
    });
  }, [listArticle, search]);

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
                  <div className="col-sm-5" style={{ position: "relative" }}>
                    <input
                      className="input"
                      type="text"
                      name=""
                      id=""
                      placeholder="Recherche"
                      style={{
                        paddingLeft: 30,
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow = "5px 5px 50px gray";
                        e.target.style.paddingLeft = "10px";
                        setDisplayIconSearch(false);
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.paddingLeft = "30px";
                        setDisplayIconSearch(true);
                      }}
                      onChange={(e) => setSearch(e.target.value)}
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
                    {emptyListMessage ? (
                      <div class="alert alert-danger" role="alert">
                        <span className="display-6">{emptyListMessage}!</span>
                      </div>
                    ) : (
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
                          {filtredData().map((val, key) => {
                            return (
                              <tr key={key}>
                                <td>
                                  {val.images.map((v, k) => {
                                    if (k === 0) {
                                      return (
                                        <img
                                          src={v.image}
                                          style={{
                                            height: "50px",
                                            width: "50px",
                                          }}
                                        />
                                      );
                                    }
                                  })}
                                </td>
                                <td>#{val.code_art}</td>
                                <td>{val.titre}</td>
                                <td>{val.description}</td>
                                <td>{val.categorie}</td>
                                <td>{val.stock}</td>
                                <td>{val.prix_vente}</td>
                                <td>{val.forme_colis}</td>
                                <td className="p-0">
                                  <div className="d-flex flex-row justify-content-center space-x-6">
                                    <BsEye
                                      style={{
                                        cursor: "pointer",
                                        fontSize: 20,
                                      }}
                                      onClick={() => {
                                        navigate("/details-article", {
                                          state: {
                                            id_art: val.id_art,
                                          },
                                        });
                                      }}
                                    />
                                    <LiaEdit
                                      style={{
                                        cursor: "pointer",
                                        marginInline: 4,
                                        fontSize: 20,
                                      }}
                                      onClick={() => {
                                        navigate("/edit-article", {
                                          state: {
                                            id_art: val.id_art,
                                          },
                                        });
                                      }}
                                    />
                                    <BsTrash
                                      style={{
                                        cursor: "pointer",
                                        fontSize: 18,
                                        marginTop: 2,
                                      }}
                                      onClick={() => {
                                        setDeleted_id(val.id_art);
                                        setAlertDelete(true);
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </div>

        <Modal
          size="ld"
          show={alertDelete}
          onHide={() => setAlertDelete(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Supprimer l'article
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            êtes-vous sûr ? Vous ne pourrez pas annuler cette action
            ultérieurement.
          </Modal.Body>
          <Modal.Footer
            style={{
              border: "none",
            }}
          >
            <button
              className="btn btn-danger"
              onClick={() => deleteArticle(deleted_id)}
            >
              delete
            </button>
          </Modal.Footer>
        </Modal>
      </LayoutOne>
    </Fragment>
  );
}

export default ListeArticles;
