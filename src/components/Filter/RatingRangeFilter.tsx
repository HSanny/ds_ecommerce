import React from "react";
import { Slider } from "@mui/material";
import { useProductsContext } from "../../contexts/productsContext";

type RatingRangeFilterProps = {
    value: any,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function valueText(value: number) {
    return `${value}`
}

const PriceRangeFilter: React.FC<RatingRangeFilterProps> = ({ value, onChange }) => {

    const { filters } = useProductsContext()

    const [rateRange, setRateRange] = React.useState(value);
    const handleRateChange = (event: any, newValue: any) => {
        setRateRange(newValue);
        onChange(newValue);
    }

    return (
        <Slider
            value={[filters.ratings_gte, filters.ratings_lte]}
            onChange={handleRateChange}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            getAriaValueText={valueText}
        />
    );
}

export default PriceRangeFilter