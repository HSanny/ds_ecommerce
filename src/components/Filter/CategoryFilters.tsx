import React from "react";
import { Select, MenuItem } from "@mui/material"
import { useProductsContext } from "../../contexts/productsContext";
import { isValidSummary } from "../../utils/helpers";

type CategoryFilterProps = {
    value: any,
    onChange: (mainCategory: string, subCategory: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange }) => {

    const { summary } = useProductsContext()

    const [selectedMainCategory, setSelectedMainCategory] = React.useState(value.main);
    const [selectedSubCategory, setSelectedSubCategory] = React.useState(value.sub);

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
            <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>Main Category</div>
                <Select
                    value={selectedMainCategory}
                    onChange={handleMainCategoryChange}
                    sx={{ 'width': '100%' }}
                >
                    {isValidSummary(summary) && summary.main_categories?.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '10px' }}>Sub Category</div>
                <Select
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                    sx={{ 'width': '100%' }}
                >
                    {isValidSummary(summary) && summary.sub_categories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </div>
        </div >
    )

}

export default CategoryFilter