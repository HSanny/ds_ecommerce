import axios from "axios";
import { productDataType, productDataTypeKey } from "../types/productType";
import { error } from "console";
import { SummaryType } from "../types/summaryType";
import React from "react";

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