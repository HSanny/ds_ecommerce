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
import axios from "axios"
import { filterType } from "../types/filterTypes";
import { getCsrfToken } from "../utils/helpers";
import { SummaryType } from "../types/summaryType";
import { DATA_ENDPOINT, SUMMARY_ENDPOINT } from "../utils/api";


const initialProductsState: initialProductsStateType = {
    isSidebarOpen: false,
    allProducts: [],
    totalPage: 0,
    featuredProducts: [],
    singleProduct: {},
    openSidebar: () => { },
    closeSidebar: () => { },
    fetchSingleProduct: (id: string) => { },
    fetchAllProducts: () => { },
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

    const fetchSummary = async (): Promise<SummaryType> => {
        try {
            const response = await axios.get<SummaryType>(SUMMARY_ENDPOINT, {
                withCredentials: true, // include credentials for CORS and CSRF
            });
            return response.data
        } catch (error) {
            console.error('Failed to fetch summary data: ', error);
            throw error
        }
    };

    // Fetch all products
    const fetchAllProducts = async (filters: filterType = {}, pageNumber: number = 1) => {
        dispatch({ type: GET_PRODUCTS_BEGIN })
        try {
            const data = {
                filters,
                page: pageNumber
            }
            // This is for get method
            // const params = new URLSearchParams();
            // // This will add each filter to the query parameters only if it has a value. 
            // Object.keys(filters).forEach(key => {
            //     // use type assertion
            //     const value = filters[key as keyof filterType]
            //     if (value != undefined) {
            //         params.append(key, String(value));
            //     }
            // });

            // params.append('page', String(pageNumber))
            console.log('csrftoken:', getCsrfToken())
            const response = await axios.post(DATA_ENDPOINT, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken(),
                },
                withCredentials: true,
            })
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: GET_PRODUCTS_ERROR
            })
        }
    }
    React.useEffect(() => {
        fetchSummary()
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
        <ProductsContext.Provider value={{ ...state, fetchAllProducts, openSidebar, closeSidebar, fetchSingleProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}