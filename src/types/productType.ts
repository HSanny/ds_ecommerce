export type productDataType = {
    id: string,
    name: string,
    brand?: string,
    category: string,
    price: number,
    stock: number,
    desc: string,
    featured?: boolean,
}

export type productDataTypeKey = keyof productDataType;

export type initialProductsStateType = {
    isSidebarOpen: boolean,
    allProducts: productDataType[] | [],
    featuredProducts: productDataType[] | [],
    singleProduct: productDataType | {},
    openSidebar: () => void,
    closeSidebar: () => void,
    fetchSingleProduct: (id: string) => void,
    productsLoading: boolean,
    productsError: boolean,
    singleProductLoading: boolean,
    singleProductError: boolean,
}