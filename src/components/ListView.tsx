import React from "react";
import styled from "styled-components";
import ListViewWrapper from "./common/ListViewWrapper";
import { productDataType } from "../types/productType";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import { Pagination } from "@mui/material";

const ListView: React.FC<{
    filteredProducts: productDataType[],
    pageNumber: number;
    onPageNumberChange: (newPageNumber: number) => void;
    totalPage: number;
}> = ({
    totalPage,
    filteredProducts,
    pageNumber,
    onPageNumberChange,
}) => {
    
    const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        onPageNumberChange(newPage);
    };
    return (
        <ListViewWrapper>
            <div>
                {filteredProducts.map(product => {
                    const { id, image, name, actual_price } = product
                    return (
                        <article key={id}>
                            <Link to={`/products/${id}`}>
                                <img src={image} alt={name} />
                            </Link>

                            <div>
                                <h4>{name}</h4>
                                <h5>{formatPrice(parseInt(actual_price))}</h5>
                                <p>{name.substring(0, 150)}...</p>
                                <Link to={`/products/${id}`} className="btn">
                                    Details
                                </Link>
                            </div>

                        </article>
                    )
                })}
            </div>
            <div>
                <Pagination page={pageNumber} count={totalPage} onChange={handleChange} />
            </div>
        </ListViewWrapper>
    )
}


export default ListView