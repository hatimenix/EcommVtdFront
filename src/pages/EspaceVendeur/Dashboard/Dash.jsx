import React from 'react'
import { Fragment } from "react";
import SEO from "../../../components/seo";
import LayoutOne from "../../../layouts/LayoutOne";
import LayoutVendeur from '../../../layouts/LayoutVendeur';
import HeroSliderVendeur from '../../../wrappers/hero-slider/HeroSliderVendeur';

function Dash() {
  return (
    <Fragment>
      <SEO
        titleTemplate="Fashion Home"
        description="Fashion home of flone react minimalist eCommerce template."
      />
      <LayoutVendeur>
        {/* hero slider */}
        <HeroSliderVendeur />
        {/* section title */}
        {/* <SectionTitleWithText spaceTopClass="pt-95" spaceBottomClass="pb-90" /> */}
        {/* tab product */}
        {/* <TabProductEight
          spaceBottomClass="pb-70"
          category="fashion"
          sectionTitle={false}
        /> */}
        {/* newsletter */}
        {/* <NewsletterTwo spaceBottomClass="pb-100" /> */}
        {/* image slider */}
        {/* <ImageSliderOne /> */}
      </LayoutVendeur>
    </Fragment>
  )
}

export default Dash