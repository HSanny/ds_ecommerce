import {
    LOAD_PRODUCTS,
    SET_LIST_VIEW,
    SET_GRID_VIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    HANDLE_CLICK_FROM_SERVICES,
    RESET_IS_CLICK_FROM_SERVICES,
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
            allProducts: [...action.payload],
            filteredProducts: [...action.payload],
            filter: { ...state.filter, maxPrice, price: maxPrice }
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
        let temp = [...state.filteredProducts]

        if (state.sort === "price-lowest") {
            temp = temp.sort((a, b) => parseInt(a.actual_price) -parseInt(b.actual_price))
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
        return { ...state, filteredProducts: temp }
    }
    // update filters
    if (action.type === UPDATE_FILTERS) {
        let { name, value, checked } = action.payload
        let { age, height } = state.filter

        if (name === 'age') {
            if (checked) {
                // console.log('a box is just checked')
                age.push(value)
                // console.log(age)
                value = age
                // console.log(value)
            }
            if (!checked) {
                // console.log('a box is UNCHECKED')
                age = age.filter(ageValue => ageValue !== value)
                value = age
                // console.log(value)
            }
        }
        if (name === 'height') {
            if (checked) {
                height.push(value)
                value = height
            }
            if (!checked) {
                height = height.filter(heightValue => heightValue !== value)
                value = height
            }
        }
        return { ...state, filter: { ...state.filter, [name]: value } }

    }

    // filter products
    if (action.type === FILTER_PRODUCTS) {
        const { allProducts } = state
        const {
            search,
            category,
            forWhom,
            price,
            age: ageFilters,
            height: heightFilters,
        } = state.filter
        console.log('search: ', search, 'filter: ', state.filter)
        let temp = [...allProducts]
        // filter by searchTerm
        if (search) {
            temp = temp.filter(product => {
                // console.log(product)
                return (
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.sub_category.toLowerCase().includes(search.toLowerCase())
                )
            })
            console.log("temp: ", temp)
        }
        // main category
        if (category !== 'all') {
            temp = temp.filter(product => {
                return product.main_category === category
            })
        }
        // price
        temp = temp.filter(product => {
            return parseInt(product.actual_price) <= price
        })

        return { ...state, filteredProducts: temp }

    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            filters: {
                ...state.filter,
                searchTerm: '',
                category: 'all',
                price: state.filter.maxPrice,
                forWhom: 'all',
                age: [],
                height: [],
            },
        }
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