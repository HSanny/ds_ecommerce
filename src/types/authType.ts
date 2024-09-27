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
    paymentMethod: PaymentMethodType,
    phoneNumber?: number,
    billingAddress?: string,
    shippingAddress?: string,
    defaultShippingMethod?: string,
}

export const initialRegisterType: RegisterDataType = {
    email: '',
    username: '',
    password: '',
    paymentMethod: {
        type: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
    },
}

export type PaymentMethodType = {
    type: 'Credit Card' | 'Debit Card' | 'PayPal' | '',
    cardNumber?: string,
    expiryDate?: string,
    cvv?: string,
    cardholderName?: string,
};