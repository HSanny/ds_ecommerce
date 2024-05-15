import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Box, Card, CardMedia, CardContent, Typography, CircularProgress,
  Button, Breadcrumbs, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import NavigationNextIcon from '@mui/icons-material/NavigateNext';
import { useProductsContext } from '../../contexts/productsContext';
import SingleProductErrorPage from './SingleProductError';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const {
    singleProduct, singleProductLoading, singleProductError,
    singleProductId, setSingleProductId, fetchSingleProduct
  } = useProductsContext()

  const [openDialog, setOpenDialog] = React.useState(false)

  React.useEffect(() => {
    if (id && id !== singleProductId) {
      setSingleProductId(id);
    }
  }, [id, singleProductId, setSingleProductId])

  React.useEffect(() => {
    if (singleProductId) {
      fetchSingleProduct(singleProductId)
    }
  }, [singleProductId]);

  React.useEffect(() => {
    if (!singleProduct && !singleProductError && !singleProductLoading) {
      setOpenDialog(true)
    }
  }, [singleProduct, singleProductLoading, singleProductError])

  if (singleProductLoading) return <CircularProgress />;
  if (singleProductError) return <SingleProductErrorPage message='Sorry, failed to load product' />;
  if (!singleProduct) return <Typography variant="body2">Product not found.</Typography>;

  const handleCloseDialog = () => {
    setOpenDialog(false)
    navigate('/products')
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Breadcrumbs separator={<NavigationNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Typography color="text.primary">{singleProduct.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={singleProduct?.image || '/static/images/default.png'}
              alt={singleProduct?.name}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{singleProduct.name}</Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Price: {singleProduct.actual_price}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Discount Price: {singleProduct.discount_price}
          </Typography>
          <Typography variant="body1" paragraph>
            {singleProduct.name || "No description available for this product."}
          </Typography>
          <Button variant="contained" color="primary" size="large">Buy Now</Button>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle> Product Not Found </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The product you are looking for is not found. Please click the below button to go back to the product list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary' autoFocus>
            Back to Product List
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SingleProduct;