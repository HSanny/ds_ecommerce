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

let productA = {
    "id": "001",
    "name": "AAA",
    "slug": "AAA",
    "brand?": "AAA",
    "category": "AAA",
    "clothingCategories?": "AAA", // add in schema
    "price": 50,
    "stock": 50,
    "forWhom": "AAA",
    "height?": "AAA",
    "heightDescription?": "AAA",
    "age?": "AAA",
    "ageDescription": "AAA",
    "itemDescription": "AAA",
    "featured": true,
    "images": ["AAA", "AAA"],
}

let productB = {
    "id": "002",
    "name": "BBB",
    "slug": "BBB",
    "brand?": "BBB",
    "category": "BBB",
    "clothingCategories?": "BBB", // add in schema
    "price": 88,
    "stock": 88,
    "forWhom": "BBB",
    "height?": "BBB",
    "heightDescription?": "BBB",
    "age?": "BBB",
    "ageDescription": "BBB",
    "itemDescription": "BBB",
    "featured": true,
    "images": ["BBB", "BBB"],
}

let productC = {
    "id": "003",
    "name": "CCC",
    "slug": "CCC",
    "brand?": "CCC",
    "category": "CCC",
    "clothingCategories?": "CCC", // add in schema
    "price": 11111,
    "stock": 11111,
    "forWhom": "CCC",
    "height?": "CCC",
    "heightDescription?": "CCC",
    "age?": "CCC",
    "ageDescription": "CCC",
    "itemDescription": "CCC",
    "featured": false,
    "images": ["CCC", "CCC"],
}

let products = [ productA, productB, productC ];

const productsReducer = (state: initialProductsStateType, action: any) => {
    if (action.type === SIDEBAR_OPEN) {
        return { ...state, isSidebarOpen: true }
    }

    if (action.type === SIDEBAR_CLOSE) {
        return { ...state, isSidebarOpen: false }
    }

    if (action.type === GET_PRODUCTS_BEGIN) {
        return { ...state, productsLoading: true}
    }

    if (action.type === GET_PRODUCTS_SUCCESS) {
        // fit data from API into productDataType shape
        const allProducts = products.map((product: productDataType) => {
        // const allProducts = action.payload.map((product: any) => {
            let {
                id: id,
                name,
                slug,
                brand,
                category,
                clothingCategories, // might be null, need to flatten
                price,
                forWhom,
                height, //need to flatten
                heightDescription,
                age, //need to flatten
                ageDescription,
                stock,
                itemDescription,
                featured,
                images, //need to flatten
            } = product

            return {
                id,
                name,
                slug,
                brand,
                category,
                clothingCategories,
                price,
                stock,
                forWhom,
                height,
                heightDescription,
                age,
                ageDescription,
                itemDescription,
                featured,
                images,
            }
        })
        const featuredProducts = allProducts.filter(
            (product: productDataType) => product.featured
        )

        return { ...state, productsLoading: false, allProducts, featuredProducts }
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