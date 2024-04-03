export type UserType = {
    isLogin: boolean,
    email: string,
}

export const initialUserState: UserType = {
    isLogin: false,
    email: ''
};