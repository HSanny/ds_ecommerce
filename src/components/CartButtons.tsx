import CartButtonsWrapper from "./common/CartButtonsWrapper";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../utils/cartContext";
import { useProductsContext } from "../utils/productsContext";

const CartButtons = () => {

    const { closeSidebar } = useProductsContext()
    const { totalItems } = useCartContext()

    return (
        <CartButtonsWrapper className="cart-btn-wrapper">
            <Link to="/cart" className="cart-btn" onClick={closeSidebar}>
                Cart
                <span className="cart-container">
                    <FaShoppingCart />
                    <span className="cart-value">
                        {totalItems}
                    </span>
                </span>
            </Link>
        </CartButtonsWrapper>
    )
}