import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, useTheme, useMediaQuery } from "@mui/material";
import { useProductsContext } from "../contexts/productsContext";

const FeaturedProduct = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { featuredProducts } = useProductsContext();

  return (
    <Box sx={{ background: theme.palette.grey[200], padding: theme.spacing(4) }}>
      {/* Header */}
      <Typography variant="h2" gutterBottom component="div" sx={{ textAlign: 'center' }}>
        Featured Product
        <Box component="div" sx={{ height: 4, width: '100%', backgroundColor: theme.palette.primary.main, margin: 'auto', marginTop: theme.spacing(1) }} />
      </Typography>

      {/* Featured Products */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: theme.spacing(2),
          padding: theme.spacing(2),
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {featuredProducts.map(product => (
          <Card
            key={product.id}
            component={RouterLink}
            to={`/products/${product.id}`}
            sx={{
              minWidth: matches ? 280 : 200,
              textDecoration: 'none',
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.actual_price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Button
        variant="contained"
        component={RouterLink}
        to="/products"
        sx={{ display: 'block', margin: 'auto', marginTop: theme.spacing(3) }}
      >
        All Products
      </Button>
    </Box>
  );
};

export default FeaturedProduct;
