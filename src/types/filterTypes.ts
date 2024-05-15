import { productDataType } from "./productType"

export type filterType = {
    search: string,
    main_category: string,
    sub_category: string,
    ratings_gte: number,
    ratings_lte: number,
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
    ratings_gte: 0,
    ratings_lte: 10,
};