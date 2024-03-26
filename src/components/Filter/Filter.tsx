import React from "react";
import styled from "styled-components";
import { useProductsContext } from "../../contexts/productsContext";
import SearchFilter from "./SearchFilter";
import CategoryFilter from "./CategoryFilters";
import PriceRangeFilter from "./PriceRangeFilter";
import { isValidSummary } from "../../utils/helpers";

const Filter = () => {
    const { filters, updateFilter, clearFilter, summary } = useProductsContext();

    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState({ main: '', sub: '' });
    const min = isValidSummary(summary) ? summary.min_actual_price : 0
    const max = isValidSummary(summary) ? summary.max_actual_price : 99999
    const [priceRange, setPriceRange] = React.useState([min, max]); // example range
    // ... other filter states

    const handleSearchChange = (term: any) => {
      setSearchTerm(term);
      updateFilter({ ...filters, search: term });
    };

    const handleCategoryChange = (mainCategory: string, subCategory: string) => {
      setSelectedCategory({ main: mainCategory, sub: subCategory });
      updateFilter({ ...filters, main_category: mainCategory, sub_category: subCategory });
    };

    const handlePriceChange = (range:any) => {
      setPriceRange(range);
      updateFilter({ ...filters, price_gte: range[0], price_lte: range[1] });
    };

  // ... similar handlers for other filters
    console.log("search term: ", searchTerm)
    console.log("selectedCategory:", selectedCategory)
    console.log("priceRange: ", priceRange)
    
  React.useEffect(() => {
    updateFilter({
      ...filters,
      search: searchTerm,
      main_category: selectedCategory.main,
      sub_category: selectedCategory.sub,
      price_gte: priceRange[0],
      price_lte: priceRange[1]
    })
  }, [searchTerm, selectedCategory, priceRange])
    return (
        <Wrapper>
        {/* <FilterButton
          filter={filter}
          setFilter={setFilter}
        /> */}

        
        <div className={filters ? 'show-filters content' : 'content'}>

          <SearchFilter value={searchTerm} onChange={handleSearchChange} />
          <CategoryFilter value={selectedCategory} onChange={handleCategoryChange} />
          <PriceRangeFilter value={priceRange} onChange={handlePriceChange} />
          {/* Clear Filters */}
          <button type="button" className="clear-btn" onClick={() => clearFilter()}>
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