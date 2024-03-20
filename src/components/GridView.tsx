import React, { PropsWithChildren } from "react";
import SingleProduct from "./SingleProduct";
import { productDataType } from "../types/productType";
import GridViewWrapper from "./common/GridViewWrapper";
import { Link } from "react-router-dom";

const GridView: React.FC<PropsWithChildren<{ filteredProducts: productDataType[] }>> = ({
    filteredProducts,
}) => {

    return (
        <GridViewWrapper>
            <div className="products-container">
                {filteredProducts.map(product => (
                    // similar to grid view
                    <Link to={`/products/${product.id}`} key={product.id}>
                        {/* Similar to above, display a preview or summary */}
                        <div>
                            <img src={product.image} alt={product.name} />
                            <h5>{product.name}</h5>
                            <p>{product.actual_price}</p>
                        </div>
                    </Link>

                    // return <SingleProduct key={product.id} product={product} />
                ))}
            </div>
        </GridViewWrapper>
    )
}


export default GridView