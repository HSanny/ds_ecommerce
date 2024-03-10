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
                const { slug, images, name, price, itemDescription } = product
                return (
                    <article key={slug}>
                        <Link to={`/products/${slug}`}>
                            <img src={images[0]} alt={name} />
                        </Link>

                        <div>
                            <h4>{name}</h4>
                            <h5>{formatPrice(price)}</h5>
                            <p>{itemDescription.substring(0, 150)}...</p>
                            <Link to={`/products/${slug}`} className="btn">
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