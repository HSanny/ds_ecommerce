import {
    LOAD_PRODUCTS,
    SET_LIST_VIEW,
    SET_GRID_VIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    HANDLE_CLICK_FROM_SERVICES,
    RESET_IS_CLICK_FROM_SERVICES,
    UPDATE_FILTERS_AND_FETCH,
} from "../actions/filterActions";

import { initialStateType } from "../types/filterTypes";
import { productDataType } from "../types/productType";

const filterReducer = (
    state: initialStateType,
    action: {
        type: any;
        payload?: any
    }
) => {
    if (action.type === LOAD_PRODUCTS) {
        const maxPrice = Math.max(
            ...action.payload.map((item: productDataType) => item.actual_price)
        )

        return {
            ...state,
            totalPage: action.payload.total_page,
            allProducts: [action.payload.products],
            filter: { ...state.filters, maxPrice, price: maxPrice }
        }
    }

    if (action.type === SET_GRID_VIEW) {
        return { ...state, gridView: true }
    }

    if (action.type === SET_LIST_VIEW) {
        return { ...state, gridView: false }
    }

    if (action.type === UPDATE_SORT) {
        return { ...state, sort: action.payload }
    }

    if (action.type === SORT_PRODUCTS) {
        let temp = [...state.allProducts]

        if (state.sort === "price-lowest") {
            temp = temp.sort((a, b) => parseInt(a.actual_price) - parseInt(b.actual_price))
        }

        if (state.sort === "price-highest") {
            temp = temp.sort((a, b) => parseInt(b.actual_price) - parseInt(a.actual_price))
        }

        if (state.sort === 'name-a') {
            // a - z
            temp = temp.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
        }
        if (state.sort === 'name-z') {
            // z - a
            temp = temp.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
        }
        return { ...state, allProducts: temp }
    }
    // update filters
    if (action.type === UPDATE_FILTERS) {

        return {
            ...state,
        }

    }

    if (action.type === UPDATE_FILTERS_AND_FETCH) {
        
    }

    // // filter products
    if (action.type === FILTER_PRODUCTS) {
        const { allProducts } = state
        const {
            search,
            main_category,
            sub_category,
            // actual_price_gte,
            // actual_price_lte,
            // discount_price_gte,
            // discount_price_lte,
            // rating,
        } = state.filters
        let temp = [...allProducts]
        // filter by searchTerm
        if (search) {
            temp = temp.filter(product => {
                return (
                    product?.name.toLowerCase().includes(search.toLowerCase()) ||
                    product?.sub_category.toLowerCase().includes(search.toLowerCase())
                )
            })
        }
        // main category
        if (main_category !== 'all') {
            temp = temp.filter(product => {
                return product?.main_category === main_category
            })
        }
        // sub category
        if (sub_category !== 'all') {
            temp = temp.filter(product => {
                return product?.sub_category === sub_category
            })
        }
        // price
        // temp = temp.filter(product => {
        //     return parseInt(product.actual_price) <= price
        // })

        return { ...state, filteredProducts: temp }

    }

    if (action.type === HANDLE_CLICK_FROM_SERVICES) {
        return { ...state, isClickFromServices: true }
    }

    if (action.type === RESET_IS_CLICK_FROM_SERVICES) {
        return { ...state, isClickFromServices: false }
    }

    throw new Error(`No Matching "${action.type}" - action type`)

}

export default filterReducer;