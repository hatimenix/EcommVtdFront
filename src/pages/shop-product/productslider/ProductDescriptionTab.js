import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../../services/fetchData";
import { useEffect } from "react";
import { setReviews } from "../../../store/slices/reviewsSlice";
import { useState } from "react";

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc }) => {
  const reviews = useSelector((state) => state.review.reviews);
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)

  
  // useEffect(() => {
  //   dispatch(setReviews(fetchReviews))

  // }, [dispatch])
  
  useEffect(() => {
    fetchReviews()
      .then((rv) => {
        dispatch(setReviews(rv));
        setCount(rv.length)
        
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
    
  }, [dispatch]);

  console.log("reviews", reviews)

  // for (let index = 0; index < reviews.length; index++) {
  //   const review = reviews[index];
  //   console.log("review ", index, ":", review)
    
  //   const replies = review[0].replies
  // console.log("replies", replies)

    
  // }
{
  reviews.map((review, index) => (
    <div key={index}>
      <p>Review {index + 1}:</p>
      <p>{review.review_text}</p>
      
      {/* Map through the replies of the current review */}
      {review.replies.map((reply, replyIndex) => (
        <div key={replyIndex}>
          <p>Reply {replyIndex + 1}:</p>
          <p>{reply.reply_text}</p>
        </div>
      ))}
    </div>
  ))
}

  return (
    <div>
      {reviews ? (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews({count})</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span>10 x 10 x 15 cm{" "}
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      {reviews.map((review, index) => (
                        <div key={index} className="single-review">
                          <div className="review-img">
                            <img
                              src={process.env.PUBLIC_URL + "/assets/img/testimonial/1.jpg"}
                              alt=""
                            />
                          </div>
                          <div className="review-content">
                            <div className="review-top-wrap">
                              <div className="review-left">
                                <div className="review-name">
                                  <h4>{review.reviewer}</h4>
                                </div>
                                <div className="review-rating">
                                  {/* Add your rating display logic here */}
                                </div>
                              </div>
                              <div className="review-left">
                                <button>Reply</button>
                              </div>
                            </div>
                            <div className="review-bottom">
                              <p>{review.review_text}</p>
                            </div>
                            {/* Render replies associated with this review */}
                            {review.replies.map((reply, replyIndex) => (
                              <div key={replyIndex} className="single-review child-review">
                                <div className="review-img">
                                  <img
                                    src={process.env.PUBLIC_URL + "/assets/img/testimonial/2.jpg"}
                                    alt=""
                                  />
                                </div>
                                <div className="review-content">
                                  <div className="review-top-wrap">
                                    <div className="review-left">
                                      <div className="review-name">
                                        <h4>{reply.author}</h4>
                                      </div>
                                      <div className="review-rating">
                                        {/* Add rating display logic for replies here */}
                                      </div>
                                    </div>
                                    <div className="review-left">
                                      <button>Reply</button>
                                    </div>
                                  </div>
                                  <div className="review-bottom">
                                    <p>{reply.text}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Add a Review</h3>
                      <div className="ratting-form">
                        <form action="#">
                          <div className="star-box">
                            <span>Your rating:</span>
                            <div className="ratting-star">
                              {/* Add your star rating input here */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input placeholder="Name" type="text" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="rating-form-style mb-10">
                                <input placeholder="Email" type="email" />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="rating-form-style form-submit">
                                <textarea
                                  name="Your Review"
                                  placeholder="Message"
                                  defaultValue={""}
                                />
                                <input type="submit" defaultValue="Submit" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
        </div>
      ) : (
          "nothing"
      )}
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductDescriptionTab;
