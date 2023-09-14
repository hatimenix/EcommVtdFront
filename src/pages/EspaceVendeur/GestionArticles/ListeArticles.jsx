import React, { Fragment, useState } from "react";
import SEO from "../../../components/seo";
import LayoutOne from "../../../layouts/LayoutOne";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Modal } from "react-bootstrap";
import { BsEye, BsTrash } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import django from "../GestionArticles/django.png";
import logo512 from "../GestionArticles/logo512.png";
import { useEffect } from "react";
import axiosClient, { linkImage } from "../../../axios-client";
import { useCallback } from "react";
import { useStateContext } from "../../../context/ContextProvider";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Alert } from "@mui/material";

function ListeArticles() {
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [displayIconSearch, setDisplayIconSearch] = useState(true);

  const [listArticle, setListArticle] = useState([]);

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user.id) {
      axiosClient.get(`/articles/getArticlesByCostumer/?customer_id=${user.id}`).then((res) => {
        setListArticle(res.data.sort().reverse())
        setIsLoading(false)
      });

    }
  }, [user.id, isLoading]);


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
  // console.log('dataaaaaaaa : ', listArticle.length);

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
                className="d-flex justify-content-end"
              // style={{ display: "flex", justifyContent: "end" }}
              >
                <button
                  className="py-2 px-3"
                  style={{
                    borderRadius: 10,
                    color: '#17b2b0',
                    border: '1px solid #17b2b0',
                    backgroundColor: 'white'
                  }}
                  onMouseEnter={e => {
                    e.target.style.color = 'white'
                    e.target.style.backgroundColor = '#17b2b0'
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = '#17b2b0'
                    e.target.style.backgroundColor = 'white'
                  }}
                  onClick={() => {
                    navigate("/nouveau-article");
                  }}
                >
                  Nouveau article
                </button>
              </div>

              <>
                <div className="col-sm-12 my-3">
                  <div className="row align-items-center ">
                    <div className="col-sm-6">
                      <h3 className="cart-page-title">Mes articles </h3>
                    </div>
                    <div className="col-sm-1 d-none d-sm-block"></div>
                    <div className="col-sm-5 d-flex justify-content-end" style={{ position: "relative" }}>
                      <input
                        className="input"
                        type="text"
                        name=""
                        id=""
                        placeholder="Recherche"
                        style={{
                          paddingLeft: 30,
                          borderRadius: 5,
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.paddingLeft = "10px";
                          setDisplayIconSearch(false);
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.boxShadow = "none";
                          e.target.style.paddingLeft = "30px";
                          setDisplayIconSearch(true);
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        disabled={!isLoading && listArticle.length === 0}
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
                    <div className="table-responsive cart-table-content border-r-4">
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

                          {(isLoading) && (
                            <>
                              <tr>
                                <td><Skeleton style={{
                                  borderRadius: '50%',
                                  height: "50px",
                                  width: "50px",
                                }} /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                                <td><Skeleton /></td>
                              </tr>
                            </>
                          )}
                          {
                            listArticle
                              .filter((row) => {
                                return (
                                  row.code_art.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                  row.titre.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                  row.description.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                  row.categorie.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                  row.stock.toString().includes(search.toString()) ||
                                  row.prix_vente.toString().includes(search.toString()) ||
                                  row.forme_colis.toLowerCase().includes(search.toLocaleLowerCase())
                                );

                              })
                              .map((val, key) => {
                                return (
                                  <>
                                    <tr key={key}>
                                      <td>
                                        {val.images.map((v, k) => {
                                          if (k === 0) {
                                            return (
                                              <img
                                                src={linkImage + v.image}
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
                                        <div className="" style={{
                                          display: 'flex',
                                          justifyContent: 'space-evenly'
                                        }}>
                                          <TbListDetails
                                            style={{
                                              cursor: "pointer",
                                              fontSize: 25,
                                              color: '#6c757d9e'
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
                                              fontSize: 25,
                                              color: '#0f720f9c'
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
                                              marginTop: 2,
                                              fontSize: 25,
                                              color: '#ff000078'
                                            }}
                                            onClick={() => {
                                              setDeleted_id(val.id_art);
                                              setAlertDelete(true);
                                            }}
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                        </tbody>

                        {!isLoading && listArticle.length === 0 && (
                          <tr>
                            <td colSpan={9} style={{
                              padding: 10,
                              fontSize: 20,
                              color: '#14a4a2'
                            }}>
                              <Alert severity="warning" >Votre store est actuellement vide.</Alert>
                            </td>
                          </tr>
                        )}
                        {search && filtredData().length === 0 &&
                          <tr>
                            <td colSpan={9} style={{
                              padding: 10,
                              fontSize: 20,
                              color: '#14a4a2'
                            }}>Il semblerait qu'il n'y ait aucun résultat pertinent associé à votre recherche</td>
                          </tr>
                        }
                      </table>
                    </div>
                  </div>
                </div>
              </>
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
              Supprimer
            </button>
          </Modal.Footer>
        </Modal>
      </LayoutOne>
    </Fragment>
  );
}

export default ListeArticles;
