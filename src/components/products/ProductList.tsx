import React from "react";
import { useFilterContext } from "../../contexts/filterContext";
import { useProductsContext } from "../../contexts/productsContext";
import Loading from "../common/Loading";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {


    const {
        gridView,
    } = useFilterContext()
    const {
        productsLoading,
        products,
    } = useProductsContext()


    if (productsLoading) {
        return <Loading />
    }

    if (products.length < 1) {
        return (
            <h5 style={{ textTransform: "none" }}>
                Sorry, no product matches your search...
            </h5>
        )
    }

    return (
        <>
            {gridView ? <GridView /> : <ListView />}
        </>
    )
}

export default ProductList