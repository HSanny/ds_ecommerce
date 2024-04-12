import { cartType } from "./cartType"

export type UserType = {
    isLogin: boolean,
    email: string,
    userData?: userDataType,
}

export const initialUserState: UserType = {
    isLogin: false,
    email: ''
}

export type LoginType = {
    email: string,
    password: string,
}

export type userDataType = {
    username: string,
    email: string,
    cart: cartType,
    transactionData: any,
}

export type RegisterDataType = {
    email: string;
    password: string;
    username: string;
    paymentMethod?: PaymentMethodType,
    billingAddress?: string,
    shippingAddress?: string,
};

export type PaymentMethodType = {
    cardNumber: string,
    expiryDate: string,
    cvv: string,
    cardholderName: string,
};