import React, { useState } from 'react';
import {
  Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography, Slider, Grid, SelectChangeEvent
} from '@mui/material';
import { filterType } from '../../types/filterTypes';
import { useProductsContext } from '../../contexts/productsContext';

const Filter: React.FC = () => {
  const { fetchAllProducts, summary, updateFilter, setCurrPage } = useProductsContext();

  const [localFilters, setLocalFilters] = useState<filterType>({
    search: '',
    main_category: '',
    sub_category: '',
    ratings_gte: 0,
    ratings_lte: 5,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name as string]: e.target.value,
    });
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const [ratings_gte, ratings_lte] = newValue as number[];
    setLocalFilters({
      ...localFilters,
      ratings_gte,
      ratings_lte,
    });
  };

  const handleApplyFilters = () => {
    updateFilter(localFilters);
    setCurrPage(1);
    fetchAllProducts(localFilters, 1);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Filter Products</Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Search"
          name="search"
          value={localFilters.search}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Main Category</InputLabel>
        <Select
          name="main_category"
          value={localFilters.main_category}
          onChange={handleSelectChange}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {summary.main_categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Sub Category</InputLabel>
        <Select
          name="sub_category"
          value={localFilters.sub_category}
          onChange={handleSelectChange}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {summary.sub_categories.map((subcategory) => (
            <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography gutterBottom>Ratings Range</Typography>
      <Slider
        value={[localFilters.ratings_gte, localFilters.ratings_lte]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={5}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleApplyFilters} sx={{ mt: 2 }}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filter;