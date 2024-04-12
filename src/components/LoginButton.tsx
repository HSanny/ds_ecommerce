import ButtonsWrapper from "./common/ButtonsWrapper";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/cartContext";
import { useProductsContext } from "../contexts/productsContext";

const LoginButton = () => {

    const { closeSidebar } = useProductsContext()

    return (
        <ButtonsWrapper className="cart-btn-wrapper">
            <Link to="/authentication/login" className="cart-btn" onClick={closeSidebar}>
                Login
            </Link>
        </ButtonsWrapper>
    )
}

export default LoginButton;