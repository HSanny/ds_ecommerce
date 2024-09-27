import React, { PropsWithChildren } from "react";
import GridViewWrapper from "../common/GridViewWrapper";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useProductsContext } from "../../contexts/productsContext";

const GridView = () => {
    const { setCurrPage, currPage, totalPage, products } = useProductsContext()

    const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrPage(newPage);
    };

    return (
        <GridViewWrapper>
            <div className="products-container">
                {products.map(product => (
                    // similar to grid view
                    <Link to={`/products/${product?.product_id}`} key={product?.product_id}>
                        {/* Similar to above, display a preview or summary */}
                        <div>
                            <img src={product?.img_link} alt={product?.product_name} />
                            <h5>{product?.about_product}</h5>
                            <p>price: {product?.actual_price}</p>
                            <p>discount price: {product?.discounted_price}</p>
                        </div>
                    </Link>

                    // return <SingleProduct key={product.id} product={product} />
                ))}
            </div>
            <div>
                <Pagination page={currPage} count={totalPage} onChange={handleChange} />
            </div>
        </GridViewWrapper>
    )
}


export default GridView