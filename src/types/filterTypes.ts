import { productDataType } from "./productType"

export type filterType = {
    search: string,
    category: string,
    minPrice: number,
    maxPrice: number,
    price: number,
    forWhom: string,
    age: string[],
    height: string[]
}

export type initialStateType = {
    filteredProducts: productDataType[]
    allProducts: productDataType[]
    gridView: boolean
    setGridView: () => void
    setListView: () => void
    sort: string
    updateSort: (e: React.ChangeEvent<HTMLSelectElement>) => void
    filter: filterType
    updateFilter: (e: any) => void 
    clearFilter: () => void 
    isClickFromServices: boolean
    handleClickFromService: () => void
    resetIsClickFromService: () => void
}