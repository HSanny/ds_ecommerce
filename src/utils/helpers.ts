import { productDataType, productDataTypeKey } from "../types/productType";

export const formatPrice = (price: number) => {
    return Intl.NumberFormat('th-TH', {
        style: "currency",
        currency: "IR", // indian rupee
    }).format(price)
}