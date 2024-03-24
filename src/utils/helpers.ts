import axios from "axios";
import { productDataType, productDataTypeKey } from "../types/productType";
import { error } from "console";
import { SummaryType } from "../types/summaryType";

export const isValidSummary = (summary: any): summary is SummaryType => {
    // Check if summary is an object
    if (typeof summary !== 'object' || summary === null) {
        return false;
    }

    // Check if all required properties exist and are of correct types
    return Array.isArray(summary.main_categories) &&
        Array.isArray(summary.sub_categories) &&
        Array.isArray(summary.all_ratings) &&
        typeof summary.max_actual_price === 'number' &&
        typeof summary.max_discount_price === 'number' &&
        typeof summary.min_actual_price === 'number' &&
        typeof summary.min_discount_price === 'number';
}

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

function getCsrfToken() {
    const name = 'csrftoken='; // Adjust the cookie name if your CSRF cookie has a different name
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export default getCsrfToken

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