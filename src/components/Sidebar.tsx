import React from "react";
import SidebarWrapper from "./common/SidebarWrapper";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import NaviLinks from "./NaviLinks";
import { useProductsContext } from "../contexts/productsContext";

const Sidebar = () => {

    const { isSidebarOpen, closeSidebar } = useProductsContext()


    return (
        <SidebarWrapper>
            <aside className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <Link to="/" onClick={closeSidebar}>
                        <img src={require("../assets/free_logo.png")} />
                    </Link>
                    <button type="button" className="close-btn" onClick={closeSidebar}>
                        <FaTimes />
                    </button>
                </div>
                {/* NaviLinks  */}
                <NaviLinks className="links" isSidebar={true} />
                {/* CartButtons */}

            </aside>
        </SidebarWrapper>
    )
}

export default Sidebar;