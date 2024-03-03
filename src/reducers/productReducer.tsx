import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from "../actions/productActions";
import { productDataType, initialProductsStateType } from "../types/productType";

const productsReducer = (state: initialProductsStateType, action: any) => {
    if (action.type === SIDEBAR_OPEN) {
        return { ...state, isSidebarOpen: true }
    }

    if (action.type === SIDEBAR_CLOSE) {
        return { ...state, isSidebarOpen: false }
    }

    if (action.type === GET_PRODUCTS_BEGIN) {
        return { ...state, productsLoading: true}
    }

    if (action.type === GET_PRODUCTS_SUCCESS) {
        // fit data from API into productDataType shape
        const allProducts = action.payload.map((product: any) => {
            let {
                _id: id,
                name,
                brand,
                category: {category},
                price,
                stock,
                desc: itemDescription,
            } = product

            return {
                id,
                name,
                brand,
                category,
                price,
                stock,
                itemDescription,
            }
        })
        const featuredProducts = allProducts.filter(
            (product: productDataType) => product.featured
        )

        return { ...state, productsLoading: false, allProducts, featuredProducts }
    }

    if (action.type === GET_PRODUCTS_ERROR) {
        return { ...state, productsError: true, productsLoading: false}
    }

    if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
        return { ...state, singleProductLoading: true }
    }
    if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
        // check if it returns the correct productDataType object instead of an array
        return { ...state, singleProduct: action.payload, singleProductLoading: false }
    }
    if (action.type === GET_SINGLE_PRODUCT_ERROR) {
        return { ...state, singleProductError: true, singleProductLoading: false }
    }
    // return state
    throw new Error(`No Matching "${action.type}" - action type`)

}

export default productsReducer;