import React from "react";
import { useFilterContext } from "../contexts/filterContext";
import { useProductsContext } from "../contexts/productsContext";
import Loading from "./common/Loading";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {

    const [pageNumber, setPageNumber] = React.useState(1)

    const {
        totalPage,
        filteredProducts,
        gridView,
        filters,
    } = useFilterContext()
    const { productsLoading, fetchAllProducts } = useProductsContext()

    const handlePageNumberChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber)
        fetchAllProducts(filters, pageNumber)
    }

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
            {gridView ? <GridView
                filteredProducts={filteredProducts}
                pageNumber={pageNumber}
                onPageNumberChange={handlePageNumberChange}
                totalPage={totalPage}
            >
                product list
            </GridView> : <ListView
                filteredProducts={filteredProducts}
                pageNumber={pageNumber}
                onPageNumberChange={handlePageNumberChange}
                totalPage={totalPage}
            />}
        </>
    )
}

export default ProductList