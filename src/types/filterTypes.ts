import { productDataType } from "./productType"

export type filterType = {
    [key: string]: string | number | undefined,
    // is an index signature. It tells TypeScript that filterType
    // can be indexed with a string,
    // and the value of that index can be a string, number, or undefined.
    search?: string,
    main_category?: string,
    sub_category?: string,
    actual_price_gte?: number,
    actual_price_lte?: number,
    discount_price_gte?: number,
    discount_price_lte?: number,
    rating?: number,
}

export type initialStateType = {
    filteredProducts: productDataType[]
    allProducts: productDataType[]
    totalPage: number
    gridView: boolean
    setGridView: () => void
    setListView: () => void
    sort: string
    updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
    filters: filterType
    updateFilter: (e: any) => void
    isClickFromServices: boolean
    handleClickFromService: () => void
    resetIsClickFromService: () => void
}

export const initialFilterState: filterType = {
    search: '',
    main_category: '',
    sub_category: '',
    actual_price_gte: undefined,
    actual_price_lte: undefined,
    discount_price_gte: undefined,
    discount_price_lte: undefined,
    rating: undefined,
};