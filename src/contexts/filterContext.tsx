import React, { PropsWithChildren } from "react";
import { filterType, initialStateType } from "../types/filterTypes";
import { useProductsContext } from "./productsContext";
import filterReducer from "../reducers/filterReducer";
import {
    CLEAR_FILTERS,
    FILTER_PRODUCTS,
    HANDLE_CLICK_FROM_SERVICES,
    LOAD_PRODUCTS,
    RESET_IS_CLICK_FROM_SERVICES,
    SET_GRID_VIEW,
    SET_LIST_VIEW,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    UPDATE_SORT
} from "../actions/filterActions";

const defaultFilter: filterType = {
    search: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    forWhom: 'all',
    age: [],
    height: [],
}

const initialState: initialStateType = {
    filteredProducts: [],
    allProducts: [],
    gridView: true,
    setGridView: () => { },
    setListView: () => { },
    sort: 'price-lowest',
    updateSort: () => { },
    filter: defaultFilter,
    updateFilter: () => { },
    clearFilter: () => { },
    isClickFromServices: false,
    handleClickFromService: () => { },
    resetIsClickFromService: () => { },
}

const filterContext = React.createContext<initialStateType>(initialState);

export const FilterProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const { allProducts } = useProductsContext()
    const [state, dispatch] = React.useReducer(filterReducer, initialState)

    React.useEffect(() => {
        dispatch({
            type: LOAD_PRODUCTS,
            payload: allProducts
        })
    }, [allProducts])

    React.useEffect(() => {
        dispatch({
            type: FILTER_PRODUCTS
        })

        dispatch({
            type: SORT_PRODUCTS
        })
    }, [allProducts, state.sort, state.filter])

    const setGridView = () => {
        dispatch({ type: SET_GRID_VIEW })
    }
    const setListView = () => {
        dispatch({ type: SET_LIST_VIEW })
    }
    const updateSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: UPDATE_SORT, payload: e.target.value })
    }
    
    const updateFilter = (e: any) => {
        let name = e.target.name
        let value = e.target.value
        let checked 

        if (name === 'category') {
            value = e.target.textContent
        }
        if (name === 'home-page-category') {
            name = 'category'
        }
        if (name === 'price') {
            value = Number(value)
        }
        if (name === 'age' || name === 'height') {
            checked = e.target.checked
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value, checked } })
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTERS })
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
                clearFilter,
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
