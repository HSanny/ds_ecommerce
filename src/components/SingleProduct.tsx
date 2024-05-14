import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { useProductsContext } from '../contexts/productsContext';

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  console.log('rendering single product, id: ',id)
  const {
    singleProduct, singleProductLoading, singleProductError,
    singleProductId, setSingleProductId, fetchSingleProduct
  } = useProductsContext()

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

  if (singleProductLoading) return <CircularProgress />;
  if (singleProductError) return <Typography variant="body2" color="error">Failed to load product.</Typography>;
  if (!singleProduct) return <Typography variant="body2">Product not found.</Typography>;

  return (
    <Card>
      <CardMedia
        component="img"
        height="250"
        image={singleProduct?.image || '/static/images/default.png'}
        alt={singleProduct?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">{singleProduct.name}</Typography>
        <Typography variant="body2" color="text.secondary">Price: {singleProduct.actual_price}</Typography>
        <Typography variant="body2" color="text.secondary">Discount Price: {singleProduct.discount_price}</Typography>
      </CardContent>
    </Card>
  );
};

export default SingleProduct;