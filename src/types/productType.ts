// https://www.kaggle.com/datasets/aaditshukla/flipkart-fasion-products-dataset
// https://www.kaggle.com/datasets/lokeshparab/amazon-products-dataset/data?select=All+Electronics.csv

export type productDataType = {
    id: string
    name: string
    main_category: string
    sub_category: string
    actual_price: string
    discount_price: string
    image: string
    link: string
    ratings: number
    no_of_ratings: string
}

export type productDataTypeKey = keyof productDataType;

export type initialProductsStateType = {
    isSidebarOpen: boolean
    allProducts: productDataType[] | []
    featuredProducts: productDataType[] | []
    singleProduct: productDataType | {}
    openSidebar: () => void
    closeSidebar: () => void
    fetchSingleProduct: (id: string) => void
    productsLoading: boolean
    productsError: boolean
    singleProductLoading: boolean
    singleProductError: boolean
}