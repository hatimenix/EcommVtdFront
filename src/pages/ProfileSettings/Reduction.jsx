import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Form } from 'react-bootstrap'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { Switch } from '@mui/material';

function Reduction() {
    const [showSecondCard, setShowSecondCard] = useState(false);
    const [listReduction, setListReduction] = useState([])
    const [reductionAtribute, setReductionAtribute] = useState([])
    const { user } = useStateContext();
    const [etatReduction, setEtatReduction] = useState();
    const [reductionId, setReductionId] = useState(null);
    const [reduction2, setReduction2] = useState();
    const [reduction3, setReduction3] = useState();
    const [reduction5, setReduction5] = useState();


    useEffect(() => {
        async function fetchData() {

            const res = await axiosClient.get(`/reduction/?search=${user.id}`);
            if (res.data.length > 0) {
                const reductionData = res.data[0];
                setListReduction(reductionData);
                setEtatReduction(reductionData.etat);
                setReductionId(reductionData.id_red);
                setReductionAtribute(reductionData.reduction);
                setReduction2(reductionData.reduction[0].pourcentage);
                setReduction3(reductionData.reduction[1].pourcentage);
                setReduction5(reductionData.reduction[2].pourcentage);

            } else {
                setEtatReduction(false);
            }
        }
        fetchData();

    }, [reductionId]);

    const update = async () => {
        try {
            const res = await axiosClient.get(`/reduction/?search=${user.id}`);
            if (res.data.length > 0) {
                const reductionData = res.data[0];
                setListReduction(reductionData);
                setEtatReduction(reductionData.etat);
                setReductionId(reductionData.id);
                setReductionAtribute(reductionData.reduction);
            } else {
                setEtatReduction(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSwitchToggle = async () => {
        const formData = new FormData();
        formData.append('etat', !etatReduction);

        if (listReduction.length === 0) {
            // If no existing reduction, create a new one
            formData.append('seller', user.id);
            formData.append('reduction', JSON.stringify([
                {
                    "nbr_article": 2,
                    "pourcentage": "-"
                },
                {
                    "nbr_article": 3,
                    "pourcentage": "-"
                },
                {
                    "nbr_article": 5,
                    "pourcentage": "-"
                }
            ]));
            await axiosClient.post('/reduction/', formData);
        } else {
            console.log(user.id)
            await axiosClient.patch(`/reduction/${reductionId}/`, formData);
        }

        // Update the state after the request is successful
        setEtatReduction(!etatReduction);
        update();

    };
    const reductionTwoArticles = async (e) => {
        const val = e.target.value;
        setReduction2(val);

        const newReduction = [
            {
                nbr_article: 2,
                pourcentage: parseInt(val),
            },
            ...reductionAtribute.slice(1),
        ];

        try {
            const formData = new FormData();
            formData.append('reduction', JSON.stringify(newReduction));
            await axiosClient.patch(`/reduction/${reductionId}/`, formData);
            update();
        } catch (error) {
            console.error('Error updating reduction:', error);
        }
    };

    const reductionThreeArticles = async (e) => {
        const val = e.target.value;
        setReduction3(val);

        const newReduction = [
            reductionAtribute[0],
            {
                nbr_article: 3,
                pourcentage: parseInt(val),
            },
            reductionAtribute[2],
        ];

        try {
            const formData = new FormData();
            formData.append('reduction', JSON.stringify(newReduction));
            await axiosClient.patch(`/reduction/${reductionId}/`, formData);
            update();
        } catch (error) {
            console.error('Error updating reduction:', error);
        }
    };

    const reductionFiveArticles = async (e) => {
        const val = e.target.value;
        setReduction5(val);

        const newReduction = [
            reductionAtribute[0],
            reductionAtribute[1],
            {
                nbr_article: 5,
                pourcentage: parseInt(val),
            },
        ];

        try {
            const formData = new FormData();
            formData.append('reduction', JSON.stringify(newReduction));
            await axiosClient.patch(`/reduction/${reductionId}/`, formData);
            update();
        } catch (error) {
            console.error('Error updating reduction:', error);
        }
    };
    // const reductionTwoArticles = (e) => {

    //     const newReduction = []
    //     setReduction2(e.target.value);

    //     const val = e.target.value

    //     const three = reductionAtribute.filter(e => e.nbr_article === 3)
    //     const five = reductionAtribute.filter(e => e.nbr_article === 5)

    //     newReduction.push({
    //         "nbr_article": 2,
    //         "pourcentage": parseInt(val)
    //     }, three[0], five[0])

    //     const formData = new FormData();
    //     formData.append("reduction", JSON.stringify(newReduction));

    //     axiosClient.patch(`/reduction/49/`, formData)
    //     update()


    // }

    // const reductionThreeArticles = (e) => {

    //     const newReduction = []
    //     setReduction3(e.target.value);

    //     const val = e.target.value

    //     const twoArticle = reductionAtribute.filter(e => e.nbr_article === 2)
    //     const five = reductionAtribute.filter(e => e.nbr_article === 5)

    //     newReduction.push(twoArticle[0], {
    //         "nbr_article": 3,
    //         "pourcentage": parseInt(val)
    //     }, five[0])

    //     const formData = new FormData();
    //     formData.append("reduction", JSON.stringify(newReduction));

    //     axiosClient.patch(`/reduction/49/`, formData)
    //     update()

    // }

    // const reductionFiveArticles = (e) => {

    //     const newReduction = []
    //     setReduction5(e.target.value);
    //     const val = e.target.value

    //     const twoArticle = reductionAtribute.filter(e => e.nbr_article === 2)
    //     const three = reductionAtribute.filter(e => e.nbr_article === 3)

    //     newReduction.push(twoArticle[0], three[0], {
    //         "nbr_article": 5,
    //         "pourcentage": parseInt(val)
    //     })

    //     const formData = new FormData();
    //     formData.append("reduction", JSON.stringify(newReduction));

    //     axiosClient.patch(`/reduction/49/`, formData)
    //     update()

    // }

    console.log('etat : ', etatReduction);

    return (
        <div className="col-lg-8">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-md-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-8 align-items-center">
                                    <p class="h4" className="mb-0">Tes réductions</p>
                                </div>
                                <div className="col-sm-4 text-end">

                                    <div className="form-switch">
                                        <Switch
                                            size='lg'
                                            checked={etatReduction}
                                            onChange={handleSwitchToggle}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        {/* <input
                                            style={{ width: "50px", height: "25px" }}
                                            className="form-check-input"
                                            type="checkbox"
                                            defaultChecked={etatReduction}
                                            id="flexSwitchCheckDefault"
                                            onClick={handleSwitchToggle}
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <span style={{ color: "gray", fontSize: "11px" }}>Tu peux accorder des réductions croissantes en commençant par le nombre d'articles que tu veux. Plus tes réductions seront avantageuses, plus tu vendras. Pour plus d'informations, consulte notre Centre d'aide.</span>
                    </div>
                </div>
            </div>
            {etatReduction && (
                <div className="card mb-2">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3 d-flex align-items-center">
                                <p className="mb-0 ">2 Articles</p>
                            </div>
                            <div className="col-sm-9  ">
                                <Form.Select size='lg' value={reduction2} style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    boxShadow: "none",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57",
                                    fontSize: 17
                                }}
                                    aria-label="Custom"
                                    onChange={reductionTwoArticles}>
                                    <option style={{ fontSize: 17 }} value="0">-</option>
                                    <option style={{ fontSize: 17 }} value="5">5%</option>
                                    <option style={{ fontSize: 17 }} value="10">10%</option>
                                    <option style={{ fontSize: 17 }} value="15">15%</option>
                                    <option style={{ fontSize: 17 }} value="20">20%</option>
                                    <option style={{ fontSize: 17 }} value="25">25%</option>
                                    <option style={{ fontSize: 17 }} value="30">30%</option>
                                    <option style={{ fontSize: 17 }} value="40">40%</option>
                                    <option style={{ fontSize: 17 }} value="50">50%</option>
                                </Form.Select>
                            </div>

                        </div>
                        <hr style={{ color: 'lightgray' }} />
                        <div className="row">
                            <div className="col-sm-3 d-flex align-items-center">
                                <p className="mb-0 ">3 Articles</p>
                            </div>
                            <div className="col-sm-9  ">
                                <Form.Select size='lg' value={reduction3} style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    boxShadow: "none",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57",
                                    fontSize: 17
                                }}
                                    aria-label="Default select example"
                                    onChange={reductionThreeArticles}>
                                    <option style={{ fontSize: 17 }} value="0">-</option>
                                    <option style={{ fontSize: 17 }} value="5">5%</option>
                                    <option style={{ fontSize: 17 }} value="10">10%</option>
                                    <option style={{ fontSize: 17 }} value="15">15%</option>
                                    <option style={{ fontSize: 17 }} value="20">20%</option>
                                    <option style={{ fontSize: 17 }} value="25">25%</option>
                                    <option style={{ fontSize: 17 }} value="30">30%</option>
                                    <option style={{ fontSize: 17 }} value="40">40%</option>
                                    <option style={{ fontSize: 17 }} value="50">50%</option>
                                </Form.Select>
                            </div>

                        </div>
                        <hr style={{ color: 'lightgray' }} />
                        <div className="row">
                            <div className="col-sm-3 d-flex align-items-center">
                                <p className="mb-0 ">5 Articles</p>
                            </div>
                            <div className="col-sm-9  ">
                                <Form.Select size='lg' value={reduction5} style={{
                                    borderTop: "none",
                                    borderRight: "none",
                                    borderLeft: "none",
                                    borderRadius: "0",
                                    boxShadow: "none",
                                    borderBottom: "1px solid lightgray",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa57",
                                    fontSize: 17
                                }}
                                    aria-label="Default select example"
                                    onChange={reductionFiveArticles}>
                                    <option style={{ fontSize: 17 }} value="0">-</option>
                                    <option style={{ fontSize: 17 }} value="5">5%</option>
                                    <option style={{ fontSize: 17 }} value="10">10%</option>
                                    <option style={{ fontSize: 17 }} value="15">15%</option>
                                    <option style={{ fontSize: 17 }} value="20">20%</option>
                                    <option style={{ fontSize: 17 }} value="25">25%</option>
                                    <option style={{ fontSize: 17 }} value="30">30%</option>
                                    <option style={{ fontSize: 17 }} value="40">40%</option>
                                    <option style={{ fontSize: 17 }} value="50">50%</option>
                                </Form.Select>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reduction