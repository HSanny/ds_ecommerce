import React from "react";
import styled from "styled-components";
import Filter from "../components/Filter/Filter";
import { useFilterContext } from "../contexts/filterContext";
import Sorting from "../components/Sorting";
import ProductList from "../components/ProductList";
import { Outlet } from "react-router-dom";

const ProductsPage = () => {
  const { clearFilter, isClickFromServices, resetIsClickFromService } = useFilterContext();

  React.useEffect(() => {
    if (isClickFromServices) {
      resetIsClickFromService()
    } else {
      clearFilter()
    }
  },[])
  
  return (
        <main>
            <Wrapper className="page">
                <div className="section-center products">
                    <Filter />
                    <div>
                        <Sorting />
                        <ProductList />
                    </div>
        </div>
        <Outlet /> {/* this is where child routes will be rendered */}
            </Wrapper>
        </main>
    )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage