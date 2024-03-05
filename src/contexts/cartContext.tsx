import React, { PropsWithChildren } from "react";
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from "../actions/cartActions";
import { cartType, initialStateType } from "../types/cartType";
import cartReducer from "../reducers/cartReducer";
import { productDataType } from "../types/productType";

const getLocalStorage: () => [] | cartType[] = () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart)
    } else {
        return [];
    }
}

const intialState = {
    cart: getLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
    addToCart: () => { },
    removeItem: () => { },
    toggleAmount: () => { },
    clearCart: () => { },
}

const CartContext = React.createContext<initialStateType>(intialState);

export const useCartContext = () => {
    return React.useContext(CartContext);
}

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = React.useReducer(cartReducer, intialState);

    const addToCart = (
        id: string | undefined,
        amount: number,
        singleProduct: productDataType | {}
    ) => {
        dispatch({
            type: ADD_TO_CART,
            payload: { id, amount, singleProduct },
        })
    }

    const removeItem = (id: string) => {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        })
    }

    const toggleAmount = (id: string, value: number) => {
        dispatch({
            type: TOGGLE_CART_ITEM_AMOUNT,
            payload: { id, value }
        })
    }

    const clearCart = () => {
        dispatch({
            type: CLEAR_CART
        })
    }

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
        dispatch({ type: COUNT_CART_TOTALS })
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}