import ButtonsWrapper from "./common/ButtonsWrapper";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/cartContext";
import { useProductsContext } from "../contexts/productsContext";

const LoginButton = () => {

    const { closeSidebar } = useProductsContext()

    return (
        <ButtonsWrapper className="cart-btn-wrapper">
            <Link to="/authentication" className="cart-btn" onClick={closeSidebar}>
                LOGIN
            </Link>
        </ButtonsWrapper>
    )
}

export default LoginButton;