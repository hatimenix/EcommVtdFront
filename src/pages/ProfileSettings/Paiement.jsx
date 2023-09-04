import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AiOutlineLock } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md'
import visa from './visa.png'
import mastercard from './shopping.png'
function Paiement() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="col-lg-8">
            <div className="row mb-4" >
                <div className="col-md-12">
                    <div className="card mb-md-0">
                        <div className="card-body">
                            <p class="h4" className="mb-0">Options de paiement</p>
                        </div>
                        <div className="card-body" onClick={handleShow} style={{ cursor: 'pointer' }}>
                            <div className='row'>
                                <div className="col-sm-10">
                                    <p class="h4" className="mb-0">Ajouter une nouvelle carte</p>
                                </div>
                                <div className="col-sm-2 text-end">
                                    <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-2">
                <div className="card-body">
                    <p class="h4" className="mb-0">Méthodes de versement</p>
                </div>
                <div className="card-body" style={{ cursor: 'pointer' }}>
                    <div className='row'>
                        <div className="col-sm-10">
                            <p class="h4" className="mb-0">Ajouter compte bancaire</p>
                        </div>
                        <div className="col-sm-2 text-end">
                            <MdKeyboardArrowRight style={{ fontSize: "20px" }} />
                        </div>
                    </div>

                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header  style={{borderBottom:'none', justifyContent:'center'}} closeButton>
                    <Modal.Title >Informations de paiement</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='row p-2'>
                    <h3>Détails de la carte</h3>
                        <div className="col-sm-11">
                            
                            <p class="h4" className="mb-0">Les informations liées à ta carte sont chiffrées de manière sécurisée</p>
                            
                            <img style={{width:'25px' ,marginRight:4}} src={visa}/> 
                            <img style={{width:'25px'}} src={mastercard}/>                            
                            
                        </div>
                        <div className="col-sm-1 text-end">
                            <AiOutlineLock style={{ fontSize: "20px", color: "gray" }} />
                        </div>
                    </div>
                    <div className=" p-4">
                        <div>
                        <form>
                              <input
                                className="rounded-3"
                                name="email"
                                style={{
                                  background: '#f8f9fa'
                                }}
                                type="text" placeholder=''
                              />
                              <input
                                className="rounded-3"
                                name="password"
                                style={{
                                  background: '#f8f9fa'
                                }}
                                placeholder=''
                              />
                              
                            </form>
                        </div>
                           
                          </div>
                    <div className='mb-2'>
                        <Button style={{ width: '100%', backgroundColor: "teal", border: "none" }} >
                            Utiliser cette carte
                        </Button>
                    </div>
                    <div>
                        <Button size='' style={{ width: '100%', color: "teal", backgroundColor: "transparent", border: "none" }} onClick={handleClose}>
                            Annuler
                        </Button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default Paiement