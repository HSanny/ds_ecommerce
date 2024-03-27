import React, { PropsWithChildren } from "react";
import { filterType, initialFilterState, initialStateType } from "../types/filterTypes";
import { useProductsContext } from "./productsContext";
import filterReducer from "../reducers/filterReducer";
import {
    HANDLE_CLICK_FROM_SERVICES,
    LOAD_PRODUCTS,
    RESET_IS_CLICK_FROM_SERVICES,
    SET_GRID_VIEW,
    SET_LIST_VIEW,
    SORT_PRODUCTS,
    UPDATE_SORT
} from "../actions/filterActions";

const initialState: initialStateType = {
    filteredProducts: [],
    allProducts: [],
    totalPage: 0,
    gridView: true,
    setGridView: () => { },
    setListView: () => { },
    sort: 'price-lowest',
    updateSort: () => { },
    filters: initialFilterState,
    updateFilter: () => { },
    isClickFromServices: false,
    handleClickFromService: () => { },
    resetIsClickFromService: () => { },
}

const filterContext = React.createContext<initialStateType>(initialState);

export const FilterProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const { products, fetchAllProducts } = useProductsContext()
    
    const [state, dispatch] = React.useReducer(filterReducer, initialState)

    React.useEffect(() => {
        dispatch({
            type: LOAD_PRODUCTS,
            payload: products
        })
    }, [products])

    React.useEffect(() => {
        dispatch({
            type: SORT_PRODUCTS
        })
    }, [products])

    const setGridView = () => {
        dispatch({ type: SET_GRID_VIEW })
    }
    const setListView = () => {
        dispatch({ type: SET_LIST_VIEW })
    }
    const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: UPDATE_SORT, payload: e.target.value })
    }

    const updateFilter = (filters:filterType) => {
        
        fetchAllProducts(filters, 1)
    }

    const handleClickFromService = () => {
        dispatch({ type: HANDLE_CLICK_FROM_SERVICES })
    }

    const resetIsClickFromService = () => {
        dispatch({ type: RESET_IS_CLICK_FROM_SERVICES })
    }


    return (
        <filterContext.Provider
            value={{
                ...state,
                setGridView,
                setListView,
                updateSort,
                updateFilter,
                handleClickFromService,
                resetIsClickFromService,
            }}
        >
            {children}
        </filterContext.Provider>
    )
}

export const useFilterContext = () => {
    return React.useContext(filterContext)
}
