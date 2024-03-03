import { productDataType } from "./productType";

export type cartType = {
    id: string,
    name: string,
    amount: number,
    image: string,
    price: number
};

export type initialStateType = {
    cart: cartType[],
    totalItems: number,
    totalAmount: number,
    addToCart: (
        id: string | undefined,
        amount: number,
        singleProduct: productDataType | {}
    ) => void,
    removeItem: (id: string) => void,
    toggleAmount: (id: string, value: number) => void,
    clearCart: () => void
}

