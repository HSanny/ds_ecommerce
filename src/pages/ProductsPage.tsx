import React, { useEffect } from "react";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import Filter from "../components/Filter/Filter";
import { useFilterContext } from "../contexts/filterContext";
import Sorting from "../components/Sorting";
import ProductList from "../components/ProductList";
import { Outlet } from "react-router-dom";
import { useProductsContext } from "../contexts/productsContext";

const ProductsPage: React.FC = () => {
  const { isClickFromServices, resetIsClickFromService } = useFilterContext();
  const { clearFilter } = useProductsContext();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box component="main">
      <Box sx={{ margin: '4rem auto' }}>
        <Grid container spacing={3} direction={isDesktop ? 'row' : 'column-reverse'}>
          <Grid item xs={12} md={3}>
            <Filter />
          </Grid>
          <Grid item xs={12} md={9}>
            <Sorting />
            <ProductList />
          </Grid>
        </Grid>
      </Box>
      <Outlet /> this is where child routes will be rendered
    </Box>
  );
};

export default ProductsPage;