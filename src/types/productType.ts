// https://www.kaggle.com/datasets/aaditshukla/flipkart-fasion-products-dataset
// https://www.kaggle.com/datasets/lokeshparab/amazon-products-dataset/data?select=All+Electronics.csv

import { filterType } from "./filterTypes"
import { SummaryType } from "./summaryType"

export type productDataType = {
    product_id: string
    product_name: string
    category: string
    actual_price: string
    discounted_price: string
    about_product: string
    img_link: string
    product_link: string
    rating: number
    rating_count: string
}

export type productDataTypeKey = keyof productDataType;

export type initialProductsStateType = {
    isSidebarOpen: boolean
    products: productDataType[] | []
    totalPage: number
    currPage: number
    filters: filterType
    summary: SummaryType
    featuredProducts: productDataType[] | []
    singleProduct: productDataType | null
    openSidebar: () => void
    closeSidebar: () => void
    singleProductId: string | null
    setSingleProductId: (id: string) => void
    resetSingleProductId: () => void
    fetchSingleProduct: (id: string) => void
    fetchAllProducts: (filters: filterType, pageNumber: number) => void
    updateFilter: (filters: filterType) => void
    setFilter: (filters: filterType) => void
    clearFilter: () => void
    setCurrPage: (currPage: number) => void
    productsLoading: boolean
    productsError: boolean
    singleProductLoading: boolean
    singleProductError: boolean
    summaryLoading: boolean
    summaryError: boolean
}