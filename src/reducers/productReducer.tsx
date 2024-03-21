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
    console.log("state:", state)
    console.log("action", action)
    if (action.type === SIDEBAR_OPEN) {
        return { ...state, isSidebarOpen: true }
    }

    if (action.type === SIDEBAR_CLOSE) {
        return { ...state, isSidebarOpen: false }
    }

    if (action.type === GET_PRODUCTS_BEGIN) {
        console.log('product loading....')
        return { ...state, productsLoading: true}
    }

    if (action.type === GET_PRODUCTS_SUCCESS) {
        const totalPage = action.payload.total_page
        // fit data from API into productDataType shape
        const allProducts = action.payload.products.map((product: any) => {
        // const allProducts = action.payload.map((product: any) => {
            let {
                _id:  id,
                name,
                main_category,
                sub_category,
                actual_price,
                discount_price,
                image,
                link,
                ratings,
                no_of_ratings,
            } = product

            return {
                id,
                name,
                main_category,
                sub_category,
                actual_price,
                discount_price,
                image,
                link,
                ratings,
                no_of_ratings,
            }
        })
        // const featuredProducts = allProducts.filter(
        //     (product: productDataType) => product.featured
        // )

        return { ...state, productsLoading: false, allProducts, totalPage }
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