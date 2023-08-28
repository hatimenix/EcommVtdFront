import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";

const Home = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Home"
        description="Home page."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        put content here
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
