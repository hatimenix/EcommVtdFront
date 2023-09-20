import React from 'react'
import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import { BsLamp } from "react-icons/bs"
import Swiper, { SwiperSlide } from "../../components/swiper";
import { Parallax } from 'react-parallax';
import mission from '../../assets/image/mission.png';
import vision from '../../assets/image/vision.png';
import goal from '../../assets/image/goal.png';

// import CountUp from "react-countup";
// import VisibilitySensor from "react-visibility-sensor";
// import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import BannerOne from "../../wrappers/banner/BannerOne";
// import TextGridOne from "../../wrappers/text-grid/TextGridOne";
// import FunFactOne from "../../wrappers/fun-fact/FunFactOne";
// import TeamMemberOne from "../../wrappers/team-member/TeamMemberOne";
// import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
const settings = {
  loop: true,
  autoplay: true,
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 2
    },
    640: {
      slidesPerView: 3
    },
    1024: {
      slidesPerView: 5
    },
    768: {
      slidesPerView: 4
    }
  }
};
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
        <div style={{
          background: `url(${'https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: 'auto',
          position: 'relative',
          zIndex: -2,
        }}
          className="pt-50 pb-80 mb-80" >
          <div
            style={{
              zIndex: -1,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
            }}
          ></div>
          <div className="container" style={{
            zIndex: 2
          }}>
            <div className="welcome-content text-center" >
              <h5 >Tu n'en as plus besoin ? Mets-le en vente !</h5>
              <h1 >Bienvenue à Elbal</h1>
              <p >
                Elbal te guide vers un avenir plus durable en donnant une nouvelle vie à tes vêtements et en dévoilant des trésors cachés.
                Chaque pièce a son histoire, chaque achat est une aventure unique.{" "}
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------------------------------- */}
        <div className="about-mission-area pb-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="single-mission">
                  <div className="" style={{ display: 'flex', alignItems: "start", alignContent: "center" }}>
                    <img style={{ width: "46px", marginRight: 15 }} src={vision}></img>
                    <div>
                      <h3 style={{ margin: 0, marginBottom: 10, marginTop: 5 }}>Our Vision</h3>
                      <p>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="single-mission">
                  <div className="" style={{ display: 'flex', alignItems: "start", alignContent: "center" }}>
                    <img style={{ width: "36px", marginRight: 15 }} src={mission}></img>
                    <div>
                      <h3 style={{ margin: 0, marginBottom: 10, marginTop: 5 }}>Our Mission</h3>
                      <p>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                    </div>

                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="single-mission">
                  <div className="" style={{ display: 'flex', alignItems: "start", alignContent: "center" }}>
                    <img style={{ width: "36px", marginRight: 15 }} src={goal}></img>
                    <div>
                      <h3 style={{ margin: 0, marginBottom: 10, marginTop: 5 }}>Our Goal</h3>
                      <p>Flone provide how all this mistaken idea of denounc pleasure and sing pain was born an will give you a ete account of the system, and expound the actual teangs the eat explorer of the truth.</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------------------- */}


        {/* --------------------------------------------------------------------------------------------- */}
        {/* <div className="funfact-area pt-100 pb-70 bg-gray"  >
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
        </div> */}
        {/* --------------------------------------------------------------------------------------------- */}


        {/* --------------------------------------------------------------------------------------------- */}
        <div className="team-area pb-70">
          <div className="container">
            <div className="section-title-2 text-center mb-60">
              <h2>Notre équipe</h2>
              <p>subtitle</p>
            </div>
            <div className="row" >
              <div className="col-lg-3 c  ol-md-6 col-sm-6" >
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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

              <div className="col-lg-3 c  ol-md-6 col-sm-6" >
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
              <div className="col-lg-3 c  ol-md-6 col-sm-6" >
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
              <div className="col-lg-3 c  ol-md-6 col-sm-6" >
                <div className="team-wrapper mb-30">
                  <div className="team-img">
                    <img
                      src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
        {/* --------------------------------------------------------------------------------------------- */}


        <div className="brand-logo-area">
          <div className="container">
            <div className="brand-logo-active">
              <Swiper options={settings}>
                <SwiperSlide >
                  <div className="single-brand-logo mb-30">
                    {/* <img src={process.env.PUBLIC_URL } alt="" /> */}
                    <BsLamp />
                  </div>
                </SwiperSlide>
                <SwiperSlide >
                  <div className="single-brand-logo mb-30">
                    {/* <img src={process.env.PUBLIC_URL } alt="" /> */}
                    <BsLamp />
                  </div>
                </SwiperSlide>
                <SwiperSlide >
                  <div className="single-brand-logo mb-30">
                    {/* <img src={process.env.PUBLIC_URL } alt="" /> */}
                    <BsLamp />
                  </div>
                </SwiperSlide>
                <SwiperSlide >
                  <div className="single-brand-logo mb-30">
                    {/* <img src={process.env.PUBLIC_URL } alt="" /> */}
                    <BsLamp />
                  </div>
                </SwiperSlide>
                <SwiperSlide >
                  <div className="single-brand-logo mb-30">
                    {/* <img src={process.env.PUBLIC_URL  } alt="" /> */}
                    <BsLamp />
                  </div>
                </SwiperSlide>
              </Swiper>
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
