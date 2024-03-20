import React from "react";
import { useFilterContext } from "../contexts/filterContext";
import { useProductsContext } from "../contexts/productsContext";
import Loading from "./common/Loading";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {

    const {
        filteredProducts,
        gridView
    } = useFilterContext()
    const { productsLoading } = useProductsContext()
    
    console.log('filtered products: ', filteredProducts)
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