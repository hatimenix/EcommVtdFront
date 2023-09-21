import PropTypes from "prop-types";
import { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterOne from "../wrappers/footer/FooterOne";
import ScrollToTop from "../components/template/scroll-to-top"
import HeaderPkg from "../wrappers/header/HeaderPkg";

const LayoutPkg = ({
    children,
    headerContainerClass,
    headerTop,
    headerPaddingClass,
    headerPositionClass
}) => {
    return (
        <Fragment>
            <HeaderPkg
                layout={headerContainerClass}
                top={headerTop}
                headerPaddingClass={headerPaddingClass}
                headerPositionClass={headerPositionClass}
            />
            {children}

        </Fragment>
    );
};

LayoutPkg.propTypes = {
    children: PropTypes.node,
    headerContainerClass: PropTypes.string,
    headerPaddingClass: PropTypes.string,
    headerPositionClass: PropTypes.string,
    headerTop: PropTypes.string
};

export default LayoutPkg;
