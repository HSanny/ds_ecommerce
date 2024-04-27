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
    UPDATE_FILTER,
    CLEAR_FILTER,
} from "../actions/productActions";
import { initialProductsStateType, productDataType } from "../types/productType";
import axios from "axios"
import { filterType, initialFilterState } from "../types/filterTypes";
import { SummaryType, initialSummary } from "../types/summaryType";
import { DATA_ENDPOINT, SUMMARY_ENDPOINT } from "../utils/api";
import { getCsrfToken } from "../utils/helpers";
import AlertNotification from "../components/common/AlertNotification";
import axiosInstance from "../utils/axiosConfig";


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
    setFilter: () => { },
    clearFilter: () => { },
    setCurrPage: () => { },
    productsLoading: false,
    productsError: false,
    singleProductLoading: false,
    singleProductError: false,
    currPage: 0,
    filters: initialFilterState,
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
    const [filter, setFilter] = React.useState<filterType>(initialFilterState)
    const [currPage, setCurrPage] = React.useState(1)
    console.log('state:', state)
    console.log('summary:', summary)

    const [errorOpen, setErrorOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleClose = () => {
        setErrorOpen(false);
    };


    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN })
    }
    const closeSidebar = () => {
        dispatch({ type: SIDEBAR_CLOSE })
    }

    const fetchSummary = async () => {
        dispatch({
            type: GET_PRODUCT_SUMMARY_BEGIN
        });
        try {
            // Using axiosInstance which already has withCredentials set to true globally
            const response = await axiosInstance.get<SummaryType>(SUMMARY_ENDPOINT);

            if (response) {
                dispatch({
                    type: GET_PRODUCT_SUMMARY_SUCCESS,
                    payload: response.data
                });
            } else {
                setSummary(initialSummary);
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching product summary:', error);
            dispatch({
                type: GET_PRODUCT_SUMMARY_ERROR
            });
        }
    };

    const updateFilter = (filters: filterType) => {
        setFilter(filters);
        dispatch({
            type: UPDATE_FILTER,
            payload: filter
        })
    }

    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER,
        })
    }

    // Fetch all products
    const fetchAllProducts = async (filter: filterType, page: number = 1) => {
        dispatch({ type: GET_PRODUCTS_BEGIN });
        try {
            const csrfToken = getCsrfToken();
            const response = await axiosInstance.post(DATA_ENDPOINT, {
                filters: filter,
                page: page,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,  // Add CSRF token here, directly in the request
                }
            });

            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    };

    React.useEffect(() => {
        fetchSummary()
    }, [])

    React.useEffect(() => {
        fetchAllProducts(state.filters, currPage)
    }, [currPage, state.filters])

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
        } catch (error: any) {
            setErrorMessage(error)
            dispatch({
                type: GET_SINGLE_PRODUCT_ERROR
            })
            return <AlertNotification message={errorMessage} open={errorOpen} onClose={handleClose} severity="error" />

        }
    }


    return (
        <ProductsContext.Provider value={{
            ...state,
            fetchAllProducts,
            openSidebar,
            closeSidebar,
            fetchSingleProduct,
            setFilter,
            clearFilter,
            setCurrPage,
            updateFilter
        }}>
            {children}
        </ProductsContext.Provider>
    )
}