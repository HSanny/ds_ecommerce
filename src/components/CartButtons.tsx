import ButtonsWrapper from "./common/ButtonsWrapper";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/cartContext";
import { useProductsContext } from "../contexts/productsContext";

const CartButtons = () => {

    const { closeSidebar } = useProductsContext()
    const { totalItems } = useCartContext()

    return (
        <ButtonsWrapper className="cart-btn-wrapper">
            <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
                Cart
                <span className="cart-container">
                    <FaShoppingCart />
                    <span className="cart-value">
                        {totalItems}
                    </span>
                </span>
            </Link>
        </ButtonsWrapper>
    )
}

export default CartButtons;