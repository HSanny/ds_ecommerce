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
            <Link to={`/products/${product.slug}`} key={product.id}>
              {/* Here you can display a preview or summary of the product */}
              <div>
                <img src={product.images[0]} alt={product.name} />
                <h5>{product.name}</h5>
                <p>{product.price}</p>
              </div>
            </Link>
            // <SingleProduct key={product.id} product={product} />
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