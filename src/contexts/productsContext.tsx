import React, { PropsWithChildren } from "react";
import productsReducer from "../reducers/productReducer";
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
import { initialProductsStateType, productDataType } from "../types/productType";
import { API_ENDPOINT } from "../utils/constants";
import axios from "axios"


const initialProductsState: initialProductsStateType = {
    isSidebarOpen: false,
    allProducts: [],
    featuredProducts: [],
    singleProduct: {},
    openSidebar: () => { },
    closeSidebar: () => { },
    fetchSingleProduct: (id: string) => { },
    productsLoading: false,
    productsError: false,
    singleProductLoading: false,
    singleProductError: false,
}

const ProductsContext = React.createContext<initialProductsStateType>(initialProductsState)

export const useProductsContext = () => {
    return React.useContext(ProductsContext)
}

export const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(productsReducer, initialProductsState);

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE })
    }
    
    // Fetch all products
    React.useEffect(() => {
        const fetchAllProducts = async () => {
            console.log(111111)
            dispatch({ tpye: GET_PRODUCTS_BEGIN })
            try {
                const response = await axios.get(API_ENDPOINT)
                console.log(22222)
                dispatch({ 
                    type: GET_PRODUCTS_SUCCESS,
                    payload: response.data
                 }) 
            } catch(error) {
                console.log("fetch all products error:", error)
                dispatch({
                    type: GET_PRODUCTS_ERROR
                })
            }
        }
        fetchAllProducts()
    }, [])

    const fetchSingleProduct = (name: string) => {
        dispatch({
            type: GET_SINGLE_PRODUCT_BEGIN
        })
        try {
            const singleProduct: productDataType = state.allProducts.filter(
                (product: productDataType) => product.name === name
            )[0]

            if (singleProduct) {
                dispatch({
                    type: GET_SINGLE_PRODUCT_SUCCESS,
                    payload: singleProduct,
                })
            }
        } catch (error) {
            console.log(error)
            dispatch({
                type: GET_SINGLE_PRODUCT_ERROR
            })
        }
    }


    return (
        <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct}}>
            {children}
        </ProductsContext.Provider>
    )
}