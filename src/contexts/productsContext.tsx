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
    GET_PRODUCT_SUMMARY_BEGIN,
    GET_PRODUCT_SUMMARY_SUCCESS,
    GET_PRODUCT_SUMMARY_ERROR,
} from "../actions/productActions";
import { initialProductsStateType, productDataType } from "../types/productType";
import axios from "axios"
import { filterType } from "../types/filterTypes";
import { SummaryType, initialSummary } from "../types/summaryType";
import { DATA_ENDPOINT, SUMMARY_ENDPOINT } from "../utils/api";
import getCsrfToken, { isValidSummary } from "../utils/helpers";


const initialProductsState: initialProductsStateType = {
    isSidebarOpen: false,
    products: [],
    totalPage: 0,
    featuredProducts: [],
    singleProduct: {},
    openSidebar: () => { },
    closeSidebar: () => { },
    fetchSingleProduct: () => { },
    fetchAllProducts: () => { },
    updateFilter: () => { },
    setFilters: () => { },
    clearFilter: () => { },
    setCurrPage: () => { },
    productsLoading: false,
    productsError: false,
    singleProductLoading: false,
    singleProductError: false,
    currPage: 0,
    filters: {},
    summary: {},
    summaryLoading: false,
    summaryError: false,
}

const ProductsContext = React.createContext<initialProductsStateType>(initialProductsState)

export const useProductsContext = () => {
    return React.useContext(ProductsContext)
}

export const ProductsProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(productsReducer, initialProductsState);
    const [summary, setSummary] = React.useState<SummaryType>(initialSummary)
    const [filters, setFilters] = React.useState<filterType>({})
    const [currPage, setCurrPage] = React.useState(1)
    console.log('currPage:', currPage)
    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE })
    }

    const fetchSummary = async () => {
        dispatch({
            type: GET_PRODUCT_SUMMARY_BEGIN
        })
        try {
            const response = await axios.get<SummaryType>(SUMMARY_ENDPOINT, {
                withCredentials: true, // include credentials for CORS and CSRF
            });

            if (response) {
                setSummary(response.data)
                dispatch({
                    type: GET_PRODUCT_SUMMARY_SUCCESS,
                    payload: response.data
                })
            } else {
                setSummary(initialSummary)
            }
            return response.data
        } catch (error) {
            dispatch({
                type: GET_PRODUCT_SUMMARY_ERROR
            })
        }
    };

    const updateFilter = () => {
        setFilters(filters);
        fetchAllProducts(filters, currPage);
    }

    const clearFilter = () => {
        setFilters({});
        fetchAllProducts(filters, currPage)
    }

    // Fetch all products
    const fetchAllProducts = async (filter: filterType = {}, page: number = 1) => {
        dispatch({ type: GET_PRODUCTS_BEGIN })
        try {
            const payload = {
                filters: filter,
                page: page,
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

            const csrfToken = getCsrfToken();
            if (csrfToken) {
                axios.defaults.headers.post['X-CSRFToken'] = csrfToken;
            }
            axios.defaults.withCredentials = true;
            const response = await axios.post(DATA_ENDPOINT, JSON.stringify(payload), {
                headers: {
                    'Content-Type': 'application/json'
                }
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
        fetchAllProducts(filters, currPage)
    }, [currPage, filters])

    const fetchSingleProduct = (name: string) => {
        dispatch({
            type: GET_SINGLE_PRODUCT_BEGIN
        })
        try {
            const singleProduct: productDataType = state.products.filter(
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
        <ProductsContext.Provider value={{
            ...state,
            fetchAllProducts,
            openSidebar,
            closeSidebar,
            fetchSingleProduct,
            setFilters,
            clearFilter,
            setCurrPage,
            updateFilter
        }}>
            {children}
        </ProductsContext.Provider>
    )
}