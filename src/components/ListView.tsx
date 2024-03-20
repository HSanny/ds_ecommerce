import React from "react";
import styled from "styled-components";
import ListViewWrapper from "./common/ListViewWrapper";
import { productDataType } from "../types/productType";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";

const ListView: React.FC<{ filteredProducts: productDataType[] }> = ({
    filteredProducts,
}) => {

    return (
        <ListViewWrapper>
            {filteredProducts.map(product => {
                const { id, image, main_category, name, actual_price } = product
                return (
                    <article key={main_category}>
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
        </ListViewWrapper>
    )
}


export default ListView