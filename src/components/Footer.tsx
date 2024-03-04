import React from "react";
import FooterWrapper from "./common/FooterWrapper";

const Footer = () => {
    return (
        <FooterWrapper>
            <h5>
                &copy; {new Date().getFullYear()}
                <span> Data & Commerce </span>
            </h5>
            <h5>{' '} All Rights Reserved </h5>
        </FooterWrapper>
    )
}

export default Footer;