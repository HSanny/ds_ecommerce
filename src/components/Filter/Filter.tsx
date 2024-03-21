import React from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import { useFilterContext } from "../../contexts/filterContext";
import { getUniqueValues } from "../../utils/helpers";
import { filterType, initialFilterState } from "../../types/filterTypes";

const Filter = () => {
    const [filter, setFilter] = React.useState<filterType>(initialFilterState)

    const {
        clearFilter,
        updateFilter,
        allProducts,
        filters,
      } = useFilterContext()
  
  // categories
  // const uniqueCategory = getUniqueValues(allProducts, "main_category")

  const handleChange = (e: any) => {
    const { name, value, type, checked, textContent } = e.target;
    let newValue: string | number | undefined = value;

    if (name === 'search') {
      newValue = textContent;
    }
    if (['actual_price_gte', 'actual_price_lte', 'discount_price_gte', 'discount_price_lte', 'rating'].includes(name)) {
      newValue = Number(value);
    }

    setFilter(prevFilters => ({
      ...prevFilters,
      [name]: newValue,
    }));
  }

  React.useEffect(() => {
    updateFilter(filters)
  }, [])

    return (
        <Wrapper>
        {/* <FilterButton
          filter={filter}
          setFilter={setFilter}
        /> */}

        {/* Filterring Form */}
        <div className={filter ? 'show-filters content' : 'content'}>
          <form onSubmit={e => e.preventDefault()}>
            {/* Search */}
            <div className="form-control">
              <input
                type="text"
                name="search"
                placeholder="search"
                className="search-input"
                value={filters.search? filters.search : ''}
                onChange={
                  e => {
                    console.log(e)
                    handleChange(e)
                  }
                }
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <h5>Category</h5>
              <div>
                {/* {uniqueCategory.map((c) => {
                  if (typeof c === "string") {
                    return (
                      <button
                        key={`${c}`}
                        type="button"
                        name="category"
                        className={
                          c.toLowerCase() === category ? "active" : undefined
                        }
                        onClick={e => updateFilter(e)}
                      >
                        {c}
                      </button>
                    )
                  }
                  // return null
                })} */}
              </div>
            </div>
            
            {/* <SearchFilters />
            <CategoryFilters />
            <ForWhomFilters />
            <PriceFilters />
            <AgeFilters />
            <HeightFilters /> */}
          </form>
          {/* Clear Filters */}
          <button type="button" className="clear-btn" onClick={clearFilter}>
            Clear Filter
          </button>
        </div>

        </Wrapper>
    )
}

const Wrapper = styled.section`

  .content {
    display: none;
  }
  .show-filters {
    display: block;
  }
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
    text-transform: capitalize;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .checkbox {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      display: block;
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filter;