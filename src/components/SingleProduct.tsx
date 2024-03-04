import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { productDataType } from "../types/productType";
import { FaSearch } from "react-icons/fa";

const SingleProduct: React.FC<{ product: productDataType }> = ({ product }) => {

    const { images, name, price, slug } = product
    const image = images[0]

    return (
        <ProductWrapper>
            <div className="container">
                <Link to={`/products/${slug}`}>
                    <img src={image} alt={name} />
                    <div className="link">
                        <FaSearch />
                    </div>
                </Link>
            </div>
            <footer>
                <h5>{name}</h5>
                <p></p>
            </footer>
        </ProductWrapper>
    )
}

const ProductWrapper = styled.article`
 .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`

export default SingleProduct