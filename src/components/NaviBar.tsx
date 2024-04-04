import NavWrapper from "./common/NavWrapper";
import NaviLinks from "./NaviLinks";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import CartButtons from "./CartButtons";
import { useAuthContext } from "../contexts/authContext";
import LoginButton from "./LoginButton";

const NaviBar = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
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
            {user.isLogin ? (
                <CartButtons />
            ) : (
                <LoginButton />
            )
            }
        </NavWrapper>
    )
}

export default NaviBar;