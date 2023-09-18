import React from 'react'
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { BsLamp } from "react-icons/bs"
// import CountUp from "react-countup";
// import VisibilitySensor from "react-visibility-sensor";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import BannerOne from "../../wrappers/banner/BannerOne";
// import TextGridOne from "../../wrappers/text-grid/TextGridOne";
// import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
// import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
// import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";

function AboutUs() {
  return (
    <Fragment>
      <SEO
        titleTemplate="About us"
        description="About page of flone react minimalist eCommerce template."
      />
      <LayoutOne>
        {/* breadcrumb */}
        {/* <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "About us", path: process.env.PUBLIC_URL + pathname }
          ]} 
        /> */}

        {/* section title with text */}
        {/* <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" /> */}
        <div className="welcome-area pt-50 pb-70" >
          <div className="container">
            <div className="welcome-content text-center">
              <h5>Tu n'en as plus besoin ? Mets-le en vente !</h5>
              <h1>Bienvenue à Elbal</h1>
              <p>
                Elbal te guide vers un avenir plus durable en donnant une nouvelle vie à tes vêtements et en dévoilant des trésors cachés.
                Chaque pièce a son histoire, chaque achat est une aventure unique.{" "}
              </p>
            </div>
          </div>
        </div>


        <div className="about-mission-area pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="single-mission">
                  <h3>Our Vision</h3>
                  <p>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="single-mission">
                  <h3>Our Mission</h3>
                  <p>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="single-mission">
                  <h3>Our Goal</h3>
                  <p>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.s</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="funfact-area pt-100 pb-70 bg-gray-3" >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6" >
                <div className="single-count  mb-30 text-center">
                  <div className="count-icon">
                    <BsLamp />
                  </div>
                  <h2 className="count">
                    360

                  </h2>
                  <span>title</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6" >
                <div className="single-count  mb-30 text-center">
                  <div className="count-icon">
                    <BsLamp />
                  </div>
                  <h2 className="count">
                    520

                  </h2>
                  <span>title</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6" >
                <div className="single-count  mb-30 text-center">
                  <div className="count-icon">
                    <BsLamp />
                  </div>
                  <h2 className="count">
                    258

                  </h2>
                  <span>title</span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6" >
                <div className="single-count  mb-30 text-center">
                  <div className="count-icon">
                    <BsLamp />
                  </div>
                  <h2 className="count">
                    l899

                  </h2>
                  <span>title</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="team-area">
          <div className="container">

            <div className="section-title-2 text-center mb-60">
              <h2>title</h2>
              <p>subtitle</p>
            </div>

            <div className="row" >
              <div className="col-lg-3 col-md-6 col-sm-6" >
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src=""
                      alt=""
                      className="img-fluid"
                    />
                    <div className="team-action">
                      <a
                        className="facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                      <a
                        className="twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter" />
                      </a>
                      <a
                        className="instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h4>name</h4>
                    <span>position </span>
                  </div>
                </div>
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src=""
                      alt=""
                      className="img-fluid"
                    />
                    <div className="team-action">
                      <a
                        className="facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                      <a
                        className="twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter" />
                      </a>
                      <a
                        className="instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h4>name</h4>
                    <span>position </span>
                  </div>
                </div>
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src=""
                      alt=""
                      className="img-fluid"
                    />
                    <div className="team-action">
                      <a
                        className="facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                      <a
                        className="twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter" />
                      </a>
                      <a
                        className="instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h4>name</h4>
                    <span>position </span>
                  </div>
                </div>
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src=""
                      alt=""
                      className="img-fluid"
                    />
                    <div className="team-action">
                      <a
                        className="facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-facebook" />
                      </a>
                      <a
                        className="twitter"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-twitter" />
                      </a>
                      <a
                        className="instagram"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="team-content text-center">
                    <h4>name</h4>
                    <span>position </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* banner */}
        {/* <BannerOne spaceBottomClass="pb-70" /> */}
        <div className="banner-area pb-70">
          <div className="container">
            <div className="row">
              {/* {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerOneSingle
                data={single}
                spaceBottomClass="mb-30"
              />
            </div>
          ))} */}
            </div>
          </div>
        </div>

        {/* text grid */}
        {/* <TextGridOne spaceBottomClass="pb-70" /> */}

        {/* fun fact */}
        {/* <FunFactOne
          spaceTopClass="pt-100"
          spaceBottomClass="pb-70"
          bgClass="bg-gray-3"
        /> */}

        {/* team member */}
        {/* <TeamMemberOne spaceTopClass="pt-95" spaceBottomClass="pb-70" /> */}

        {/* brand logo slider */}
        {/* <BrandLogoSliderOne spaceBottomClass="pb-70" /> */}
      </LayoutOne>
    </Fragment>
  )
}


export default AboutUs
