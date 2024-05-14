import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
    GET_PRODUCT_SUMMARY_BEGIN,
    GET_PRODUCT_SUMMARY_ERROR,
    GET_PRODUCT_SUMMARY_SUCCESS,
    UPDATE_FILTER,
    CLEAR_FILTER,
    SET_SINGLE_PRODUCT_ID,
    RESET_SINGLE_PRODUCT_ID,
} from "../actions/productActions";
import { initialProductsStateType } from "../types/productType";

const productsReducer = (state: initialProductsStateType, action: any) => {
    console.log('action:', action)
    if (action.type === SIDEBAR_OPEN) {
        return { ...state, isSidebarOpen: true }
    }

    if (action.type === SIDEBAR_CLOSE) {
        return { ...state, isSidebarOpen: false }
    }

    if (action.type === GET_PRODUCTS_BEGIN) {
        return { ...state, productsLoading: true }
    }

    if (action.type === GET_PRODUCTS_SUCCESS) {
        const totalPage = action.payload.total_pages
        // fit data from API into productDataType shape
        const products = action.payload.products.map((product: any) => {
            // const allProducts = action.payload.map((product: any) => {
            let {
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
            } = product

            return {
                id: id,
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


        return { ...state, productsLoading: false, products, totalPage }
    }

    if (action.type === GET_PRODUCTS_ERROR) {
        return { ...state, productsError: true, productsLoading: false }
    }

    if (action.type === SET_SINGLE_PRODUCT_ID) {
        return { ...state, singleProductId: action.payload}
    }

    if (action.type === RESET_SINGLE_PRODUCT_ID) {
        return { ...state, singleProductId: null }
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

    if (action.type === GET_PRODUCT_SUMMARY_BEGIN) {
        return { ...state, summaryLoading: true }
    }
    if (action.type === GET_PRODUCT_SUMMARY_SUCCESS) {
        // check if it returns the correct productDataType object instead of an array
        return { ...state, summary:action.payload[0], summaryLoading: false }
    }
    if (action.type === GET_PRODUCT_SUMMARY_ERROR) {
        return { ...state, summaryError: true, summaryLoading: false }
    }

    if (action.type === UPDATE_FILTER) {
        return { ...state, filters: action.payload }
    }

    if (action.type === CLEAR_FILTER) {
        return { ...state, filters: {} }
    }
    // return state
    throw new Error(`No Matching "${action.type}" - action type`)

}

export default productsReducer;