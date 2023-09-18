import React from 'react'
import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
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
        <div className="welcome-area pt-50 pb-50" >
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
