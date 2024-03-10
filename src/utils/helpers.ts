import { productDataType, productDataTypeKey } from "../types/productType";

export const formatPrice = (price: number) => {
    return Intl.NumberFormat('th-TH', {
        style: "currency",
        currency: "THB", // indian rupee
    }).format(price)
}

export const getUniqueValues = (
    data: productDataType[],
    category: productDataTypeKey,
    noAllValue?: boolean
) => {
    let unique = data
        .map((item: productDataType) => item[category])
        .flat()
        .filter(Boolean)
    
    if (noAllValue) {
        return [...Array.from(new Set(unique))]
    }

    return ["all", ...Array.from(new Set(unique))]
}

export const sortUniqueCategoryByFirstNumber: (
    categoryArray: string[]
) => string[] = categoryArray => {
    const copiedArray = [...categoryArray]
    return copiedArray.sort((a: string, b: string) => {
        return Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0])
    })
}