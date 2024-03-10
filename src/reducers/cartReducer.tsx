import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from "../actions/cartActions";
import { cartType, initialStateType } from "../types/cartType";

const cartReducer = (state: initialStateType, action: { type: any; payload?: any }) => {
    // Add tp Cart actopm
    if (action.type === ADD_TO_CART) {
        const { id, amount, singleProduct } = action.payload;
        const tempItem = state.cart.find(item => item.id === id);

        if (tempItem) {
            const tempCart = state.cart.map(cartItem => {
                if (cartItem.id === id) {
                    const newAmount = tempItem.amount + amount;
                    return { ...cartItem, amount: newAmount };
                } else {
                    return cartItem;
                }
            })
            return { ...state, cart: tempCart }
        } else {
            const newItem: cartType = {
                id,
                name: singleProduct.name,
                amount,
                image: singleProduct.images[0],
                price: singleProduct.price,
            }
            return { ...state, cart: [...state.cart, newItem] };
        }
    }

    // Clear Cart action
    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] };
    }

    // remove cart item
    if (action.type === REMOVE_CART_ITEM) {
        const tempCart = state.cart.filter(
            cartItem => cartItem.id !== action.payload
        )
        return { ...state, cart: tempCart };
    }

    // toggle cart item amount
    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const { id, value } = action.payload;
        const tempCart = state.cart.map(cartItem => {
            if (cartItem.id === id) {
                if (value === "inc") {
                    return { ...cartItem, amount: cartItem.amount };
                } else {
                    let tempAmount = cartItem.amount - 1;
                    if (tempAmount < 1) {
                        tempAmount = 1
                    }
                    return { ...cartItem, amount: tempAmount }
                }
            } else {
                return cartItem;
            }
        })
        return { ...state, cart: tempCart };
    }

    // count cart total
    if (action.type === COUNT_CART_TOTALS) {
        const { totalItems, totalAmount } = state.cart.reduce(
            (total, cartItem) => {
                const { price, amount } = cartItem;

                total.totalItems += amount;
                total.totalAmount += amount * price;

                return total;
            },
            { totalItems: 0, totalAmount: 0}
        )
        return { ...state, totalItems, totalAmount }
    }
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cartReducer