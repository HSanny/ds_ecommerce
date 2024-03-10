import React from "react";
import { useFilterContext } from "../contexts/filterContext";
import { useProductsContext } from "../contexts/productsContext";
import Loading from "./common/Loading";
import GridView from "./GridView";
import ListView from "./ListView";

let productA = {
    "id": "001",
    "name": "AAA",
    "slug": "AAA",
    "brand?": "AAA",
    "category": "AAA",
    "clothingCategories?": "AAA", // add in schema
    "price": 50,
    "stock": 50,
    "forWhom": "AAA",
    "height?": "AAA",
    "heightDescription?": "AAA",
    "age?": "AAA",
    "ageDescription": "AAA",
    "itemDescription": "AAA",
    "featured": true,
    "images": ["AAA", "AAA"],
}

let productB = {
    "id": "002",
    "name": "BBB",
    "slug": "BBB",
    "brand?": "BBB",
    "category": "BBB",
    "clothingCategories?": "BBB", // add in schema
    "price": 88,
    "stock": 88,
    "forWhom": "BBB",
    "height?": "BBB",
    "heightDescription?": "BBB",
    "age?": "BBB",
    "ageDescription": "BBB",
    "itemDescription": "BBB",
    "featured": true,
    "images": ["BBB", "BBB"],
}

let productC = {
    "id": "003",
    "name": "CCC",
    "slug": "CCC",
    "brand?": "CCC",
    "category": "CCC",
    "clothingCategories?": "CCC", // add in schema
    "price": 11111,
    "stock": 11111,
    "forWhom": "CCC",
    "height?": "CCC",
    "heightDescription?": "CCC",
    "age?": "CCC",
    "ageDescription": "CCC",
    "itemDescription": "CCC",
    "featured": false,
    "images": ["CCC", "CCC"],
}

let products = [productA, productB, productC];

const ProductList = () => {

    let filteredProducts = products

    const {
        // filteredProducts,
        gridView } = useFilterContext()
    const { productsLoading } = useProductsContext()

    if (productsLoading) {
        return <Loading />
    }

    if (filteredProducts.length < 1) {
        return (
            <h5 style={{ textTransform: "none" }}>
                Sorry, no product matches your search...
            </h5>
        )
    }

    return (
        <>
            {gridView ? <GridView filteredProducts={filteredProducts}>
                product list
            </GridView> : <ListView filteredProducts={filteredProducts}/>}
        </>
    )
}

export default ProductList