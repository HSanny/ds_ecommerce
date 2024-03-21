import React, { PropsWithChildren } from "react";
import SingleProduct from "./SingleProduct";
import { productDataType } from "../types/productType";
import GridViewWrapper from "./common/GridViewWrapper";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";

const GridView: React.FC<PropsWithChildren<{
    filteredProducts: productDataType[],
    pageNumber: number;
    onPageNumberChange: (newPageNumber: number) => void;
    totalPage: number;
}>> = ({
    totalPage,
    filteredProducts,
    pageNumber,
    onPageNumberChange,
}) => {

    const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        onPageNumberChange(newPage);
    };

    return (
        <GridViewWrapper>
            <div className="products-container">
                {filteredProducts.map(product => (
                    // similar to grid view
                    <Link to={`/products/${product?.id}`} key={product?.id}>
                        {/* Similar to above, display a preview or summary */}
                        <div>
                            <img src={product?.image} alt={product?.name} />
                            <h5>{product?.name}</h5>
                            <p>{product?.actual_price}</p>
                        </div>
                    </Link>

                    // return <SingleProduct key={product.id} product={product} />
                ))}
            </div>
            <div>
                <Pagination page={pageNumber} count={totalPage} onChange={handleChange} />
            </div>
        </GridViewWrapper>
    )
}


export default GridView