import React, { Fragment, useState } from 'react'
import LayoutOne from '../../../layouts/LayoutOne'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Button, Modal } from 'react-bootstrap';
const styles = `
.my-modal {
    max-width: 420px; /* Adjust this value to your preference */
    padding: 10px;
}
`;
function Wallet() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Fragment>

            <LayoutOne >
                <section style={{ backgroundColor: "#eee" }}>
                    <div className="container col-lg-6 py-5" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}>

                        <div className="col-12">
                            <div className="card mb-4" style={{ height: "90%" }}>
                                <div className="card-body mb-3" style={{ height: "90%" }}>
                                    <p className="mb-4"><span className=" font-italic me-1">Informations du compte</span></p>
                                    <div className="row">
                                        <div className="col-sm-5">
                                            <p className="mb-0">Nom du titulaire du compte</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <input placeholder='e.g. Marie Dupont' className="form-control-sm h-50" style={{
                                                borderTop: "none",
                                                borderRight: "none",
                                                borderLeft: "none",
                                                borderRadius: "0",
                                                borderBottom: "1px solid lightgray",
                                                outline: "none",
                                                backgroundColor: "#f8f9fa57"
                                            }}
                                            />

                                        </div>
                                    </div>
                                    <br />

                                    <div className="row">
                                        <div className="col-sm-5">
                                            <p className="mb-0">IBAN</p>
                                        </div>
                                        <div className="col-sm-7">
                                            <input placeholder='FRXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' className="form-control-sm h-50" style={{
                                                borderTop: "none",
                                                borderRight: "none",
                                                borderLeft: "none",
                                                borderRadius: "0",
                                                borderBottom: "1px solid lightgray",
                                                outline: "none",
                                                backgroundColor: "#f8f9fa57"
                                            }}
                                            />

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-body ">
                                    <p class="h4" className="mb-0">Options de paiement</p>
                                </div>
                                <div className="card-body" onClick={handleShow} style={{ cursor: 'pointer' }}>
                                    <div className='row'>
                                        <div className="col-9">
                                            <p class="h4" className="mb-0">Ajouter une nouvelle carte</p>
                                        </div>
                                        <div className="col-3 text-end">
                                            <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 md-row" style={{ display: 'flex', justifyContent: "space-between"}}>
                            <span className='mr-10 col-xs-12 col-md-10' style={{ fontSize: "11px", color: 'gray' , lineHeight:2 }}>Tes données personnelles ne seront jamais partagées, excepté avec notre prestataire de paiement pour les prélèvements, ou dans le cas où nous serions légalement tenus de le faire (autorités fiscales par exemple).</span>
                            <button type="button" className="btn btn-sm btn-outline-success p-2 " style={{ position: 'relative', alignContent: 'top',height:'fit-content' }}>
                                Enregistrer
                            </button>
                        </div>
                    </div>

                </section>
                <style>{styles}</style>
                <Modal

                    size='md'
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    dialogClassName="my-modal"

                >
                    <Modal.Header style={{ justifyContent: 'center', position: 'relative' }} closeButton>
                        <Modal.Title >Adresse de facturation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='p-2 mb-1'>
                            <div className="col-sm-12 mb-2">
                                <p className="mb-0">Nom complet</p>
                            </div>
                            <div className="col-sm-12">
                                <input placeholder='Saisis votre nom et prénom' className="form-control-sm h-50" style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57"
                                }}
                                />

                            </div>
                        </div>
                        <div className='p-2 mb-1'>
                            <div className="col-sm-12 mb-2">
                                <p className="mb-0">Pays</p>
                            </div>
                            <div className="col-sm-12">
                                <input placeholder='Saisis votre pays' className="form-control-sm h-50" style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57"
                                }}
                                />

                            </div>
                        </div>
                        <div className='p-2 mb-1'>
                            <div className="col-sm-12 mb-2">
                                <p className="mb-0">N° et nom de rue</p>
                            </div>
                            <div className="col-sm-12">
                                <input placeholder='e.g. 10 rue du printemps' className="form-control-sm h-50" style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57"
                                }}
                                />

                            </div>
                        </div>
                        <div className='p-2 mb-1 '>
                            <div className="col-sm-12 mb-2">
                                <p className="mb-0">Adresse ligne 2 (facultatif)</p>
                            </div>
                            <div className="col-sm-12">
                                <input placeholder='e.g. Appt.3' className="form-control-sm h-50" style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57"
                                }}
                                />

                            </div>
                        </div>
                        <div className='p-2 mb-3'>
                            <div className="col-sm-12 mb-2">
                                <p className="mb-0">Code postal</p>
                            </div>
                            <div className="col-sm-12">
                                <input placeholder='e.g. 1234' className="form-control-sm h-50" style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57"
                                }}
                                />

                            </div>
                        </div>


                        <div className='mb-2'>
                            <Button style={{ width: '100%', backgroundColor: "teal", border: "none" }} >
                                Sauvegarder
                            </Button>
                        </div>
                        <div>
                            <Button size='' style={{ width: '100%', color: "teal", backgroundColor: "transparent", border: "none" }} onClick={handleClose}>
                                Annuler
                            </Button>
                        </div>

                    </Modal.Body>

                </Modal>
            </LayoutOne>
        </Fragment>

    )
}

export default Wallet