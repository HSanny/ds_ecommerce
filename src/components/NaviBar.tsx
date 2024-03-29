import React from "react";
import NavWrapper from "./common/NavWrapper";
import NaviLinks from "./NaviLinks";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const NaviBar = () => {
    // const { openSidebar } = useProductsContext()
    return (
        <NavWrapper>
            <div className="nav-center">
                <div className="nav-header">
                    {/* Logo */}
                    <Link to="/">
                        <img src={require("../assets/free_logo.png")} alt="" />
                    </Link>
                    {/* Menu Icon */}
                    <button type="button" className="nav-toggle" onClick={() => { }}>
                        <FaBars />
                    </button>
                </div>
                <NaviLinks className="nav-links" />
            </div>
        </NavWrapper>
    )
}

export default NaviBar;