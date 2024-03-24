import React from "react";
import { Slider } from "@mui/material";
import { useProductsContext } from "../../contexts/productsContext";
import { isValidSummary } from "../../utils/helpers";

type PriceRangeFilterProps = {
    value: any,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({value, onChange }) => {
    
    const { summary } = useProductsContext()

    const [priceRange, setPriceRange] = React.useState([0, 0]);
    const handlePriceChange = (event: any, newValue: any) => {
        setPriceRange(newValue);
        onChange(newValue);
    }

    return (
        <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={isValidSummary(summary) ? summary.min_actual_price: 0}
            max={isValidSummary(summary) ? summary.max_actual_price: 9999}
        />
    );
}

export default PriceRangeFilter