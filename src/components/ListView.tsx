import React from "react";
import ListViewWrapper from "./common/ListViewWrapper";
import { productDataType } from "../types/productType";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import { Pagination } from "@mui/material";
import { useProductsContext } from "../contexts/productsContext";

const ListView = () => {

        const { setCurrPage, currPage, totalPage, products } = useProductsContext()

        const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
            setCurrPage(newPage);
        };
        return (
            <ListViewWrapper>
                <div>
                    {products?.map(product => {
                        const { id, image, name, actual_price, discount_price } = product
                        return (
                            <article key={id}>
                                <Link to={`/products/${id}`}>
                                    <img src={image} alt={name} />
                                </Link>

                                <div>
                                    <h4>{name}</h4>
                                    <h5>price: {actual_price}</h5>
                                    <h5>discount price: {discount_price}</h5>
                                    <Link to={`/products/${id}`} className="btn">
                                        Details
                                    </Link>
                                </div>

                            </article>
                        )
                    })}
                </div>
                <div>
                    <Pagination page={currPage} count={totalPage} onChange={handleChange} />
                </div>
            </ListViewWrapper>
        )
    }


export default ListView