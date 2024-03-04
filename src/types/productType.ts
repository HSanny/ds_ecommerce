// https://www.kaggle.com/datasets/aaditshukla/flipkart-fasion-products-dataset
// https://www.kaggle.com/datasets/lokeshparab/amazon-products-dataset/data?select=All+Electronics.csv

export type productDataType = {
    id: string
    name: string
    slug: string
    brand?: string
    categories: string
    clothingCategories?: string // add in schema
    price: number
    stock: number
    forWhom: string
    height?: string[]
    heightDescription?: string
    age?: string[]
    ageDescription: string
    itemDescription: string
    featured?: boolean
    images: string[]
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