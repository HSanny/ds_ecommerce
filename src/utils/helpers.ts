import axios from "axios";
import { productDataType, productDataTypeKey } from "../types/productType";
import { error } from "console";

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


// Utility function to get the CSRF token from cookies

export const getCsrfToken = (): string | null => {
    // Log all cookies for debugging purposes (can be removed once confirmed working)
    console.log('Document cookies:', document.cookie);

    // Attempt to find the CSRF token within the cookies
    const csrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1] || null;

    // If the CSRF token is not found, log a warning
    if (!csrfToken) {
        console.warn('CSRF token not found in cookies.');
    }

    return csrfToken;
};

// export const getCsrfToken = (): string | undefined => {
//     const name = 'csrftoken'; // The default Django CSRF cookie name
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 return decodeURIComponent(cookie.substring(name.length + 1));
//             }
//         }
//     }
//     return undefined;
// };

// Setup Axios to include the CSRF token in the headers of every request
axios.interceptors.request.use(config => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
}, error => Promise.reject(error));

// Enable withCredentials globally if your API requires cookies to be sent
axios.defaults.withCredentials = true;