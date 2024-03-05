import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useProductsContext } from "../contexts/productsContext";
import SingleProduct from "./SingleProduct";

const FeaturedProduct = () => {
  const { featuredProducts } = useProductsContext();

  return (
    <Wrapper className="section">
      {/* Header */}
      <div className="title">
        <h2>Featured Product</h2>
        <div className="underline" />
      </div>
      {/* Featured Product */}
      <div>
        {featuredProducts &&
          featuredProducts.map(product => (
            <SingleProduct key={product.id} product={product} />
          ))
        }
      </div>

      <Link to="" className="btn">
        All Product
      </Link>
    </Wrapper>
  )
}

export default FeaturedProduct;

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`