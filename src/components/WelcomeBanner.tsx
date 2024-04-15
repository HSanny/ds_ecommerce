import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BannerWrapper from "./common/BannerWrapper";

const WelcomeBanner = () => {
    return (
        <BannerWrapper className="section-center">
            <article className="content">
                <>
                    <h1>
                        High quality <br />
                        electronic product for you!
                    </h1>
                    <p>
                        Electronic products from worldwide renowned factory
                        for you to pick, with guaranteed quality and good price!
                    </p>
                </>
                <Link to='/products' className="btn">
                    SHOP NOW
                </Link>
            </article>
        </BannerWrapper>
    )
}

export default WelcomeBanner;