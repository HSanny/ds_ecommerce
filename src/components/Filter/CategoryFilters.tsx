import React from "react";
import { Select, MenuItem } from "@mui/material"
import { useProductsContext } from "../../contexts/productsContext";
import { isValidSummary } from "../../utils/helpers";

type CategoryFilterProps = {
    value: any,
    onChange: (mainCategory: string, subCategory: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({value, onChange}) => {

    const { summary } = useProductsContext()

    const [selectedMainCategory, setSelectedMainCategory] = React.useState('');
    const [selectedSubCategory, setSelectedSubCategory] = React.useState('');

    const handleMainCategoryChange = (event: any) => {
        setSelectedMainCategory(event.target.value);
        onChange(event.target.value, selectedSubCategory);
    };

    const handleSubCategoryChange = (event: any) => {
        setSelectedSubCategory(event.target.value);
        onChange(selectedMainCategory, event.target.value);
    };

    return (
        <div>
            <Select
                value={selectedMainCategory}
                onChange={handleMainCategoryChange}
            >
                {isValidSummary(summary) && summary.main_categories?.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
            <Select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
            >
                {isValidSummary(summary) && summary.sub_categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
            </Select>
        </div>
    )

} 

export default CategoryFilter