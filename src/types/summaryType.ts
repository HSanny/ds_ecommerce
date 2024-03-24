export type SummaryType = {
    main_categories: string[] | [],
    sub_categories: string[] | [],
    all_ratings: number[]| [],
    max_actual_price: number,
    max_discount_price: number,
    min_actual_price: number,
    min_discount_price: number
}

export const initialSummary: SummaryType = {
    main_categories: [],
    sub_categories: [],
    all_ratings: [],
    max_actual_price: 0,
    max_discount_price: 0,
    min_actual_price: 0,
    min_discount_price: 0,
}
