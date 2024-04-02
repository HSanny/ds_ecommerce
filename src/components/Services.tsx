import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFilterContext } from "../contexts/filterContext";
import { MdOutlineSmartToy } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { FaBaby } from "react-icons/fa";
import { useProductsContext } from "../contexts/productsContext";

const Services = () => {
  const { updateFilter, handleClickFromService } = useFilterContext();
  const { clearFilter } = useProductsContext()
    const services = [
      {
        id: 1,
        icon: <MdOutlineSmartToy />,
        title: 'toy',
        text: 'toy text',
      },
      {
        id: 2,
        icon: <GiClothes />,
        title: 'clothing',
        text: 'clothing text',
      },
      {
        id: 3,
        icon: <FaBaby />,
        title: 'accessories',
        text: 'accessories text',
      },
    ]
  
    return (
        <Wrapper>
            <div className="section-center">
                {/* Header */}
                <article className="header">
                    <h3>
                        High Quality <br /> Elctronic Products !
                    </h3>
                    <p>
                        You can pick whatever electronic products you like from worldwide
                        renowned factory, with guaranteed quality and fair price
                    </p>
                    <p> Start browsing different types of products:</p>
                </article>
                {/* Service Cards */}
                <div className="services-center">
                    {services.map(service => {
                        return (
                            <article key={ service.id } className="service">
                                <span className="icon">{service.icon}</span>
                                <h4>{service.title}</h4>
                                <Link to='/products'>
                                    <button
                                        className="btn"
                                        type="button"
                                        name="home-page-category"
                                        value={service.title}
                                        onClick={e => {
                                            clearFilter()
                                            handleClickFromService()
                                            // updateFilter(e)
                                        }}
                                    >
                                        Click here for {service.title}
                                    </button>
                                </Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        </Wrapper>
    )
}

export default Services

const Wrapper = styled.section`
  h3,
  h4 {
    color: var(--clr-primary-1);
  }
  padding: 5rem 0;

  background: var(--clr-primary-10);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-primary-3);
  }
  .services-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .service {
    background: var(--clr-primary-7);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: var(--radius);
    p {
      color: var(--clr-primary-2);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: var(--clr-primary-10);
    color: var(--clr-primary-1);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`