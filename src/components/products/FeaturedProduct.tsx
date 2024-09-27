import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Card, CardMedia, CardContent, useTheme, useMediaQuery, Grid } from "@mui/material";
import { useProductsContext } from "../../contexts/productsContext";

const FeaturedProduct = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const { featuredProducts } = useProductsContext();

  return (
    <Box sx={{ background: theme.palette.grey[100], padding: theme.spacing(6) }}>
      {/* Header */}
      <Typography variant="h3" gutterBottom component="div" sx={{ textAlign: 'left', mb: 4 }}>
        Ecommerce for any stage of your business journey
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
          Get your first sale online, build steady sales, scale long-term.
        </Typography>
      </Typography>

      {/* Featured Products */}
      <Grid container spacing={4}>
        {featuredProducts.map((product, index) => (
          <Grid item xs={12} md={4} key={product.product_id}>
            <Card
              component={RouterLink}
              to={`/products/${product.product_id}`}
              sx={{
                textDecoration: 'none',
                boxShadow: theme.shadows[3],
                '&:hover': {
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={product.img_link}
                alt={product.product_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.actual_price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        component={RouterLink}
        to="/products"
        sx={{ display: 'block', margin: 'auto', marginTop: theme.spacing(4) }}
      >
        View All Products
      </Button>
    </Box>
  );
};

export default FeaturedProduct;
