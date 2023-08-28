import React, { Fragment, useEffect, useState } from 'react'
import SEO from "../../../components/seo";
import LayoutOne from '../../../layouts/LayoutOne';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../context/ContextProvider';
import axios from 'axios';

function ListeArticles() {
  const [User, setUser] = useState([]);
 
  // Authentification
  useEffect(() => {
    axiosClient.get('/auth/user/').then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <Fragment>
    {/* <SEO
      titleTemplate="Home"
      description="Home page."
    /> */}
    <LayoutOne >
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
                <h3 className="cart-page-title">Mes articles {User.last_name}</h3>
                <div className="row">
                  <div>
                    <div   className="table-content table-responsive cart-table-content border-r-4">
                      <table  className='col-12 '>
                        <thead>
                          <tr>
                            <th>Image </th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              kjjknnfsfgsgdfvnsdfvnsdkfvnsdfvjik
                            </td>
                            <td>
                              kjjknnfsfgsgdfvnsdfvnsdkfvnsdfvjik
                            </td>
                            <td>
                              kjjknnfsfgsgdfvnsdfvnsdkfvnsdfvjik
                            </td>
                            <td>
                              kjjknnfsfgsg
                            </td>
                            <td>
                              kjjknnfsfgsg
                            </td>
                            <td>
                              kjjknnfsfgsg
                            </td>
                          </tr>
                          <tr></tr>
                          <tr></tr>
                          <tr></tr>
                          <tr></tr>
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
  )
}

export default ListeArticles