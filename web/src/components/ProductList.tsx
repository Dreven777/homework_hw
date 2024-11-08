import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from './services/ProductService';
import { Button, Card, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('get')
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setProducts(products.filter(product => product._id !== productToDelete));
      setOpenDeleteDialog(false);
    }
  };

  const handleEditClick = (productId: string) => {
    navigate(`/products/edit/${productId}`);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => navigate('/products/add')}>
        Додати новий продукт
      </Button>
      {products.map((product) => (
        <Card key={product._id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="body1">{product.price}₴</Typography>
            <Button variant="outlined" onClick={() => handleEditClick(product._id)}>
              Змінити
            </Button>
            <IconButton onClick={() => handleDeleteClick(product._id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Підтвердіть видалення</DialogTitle>
        <DialogContent>
          <Typography>Ви дійсно хочете видалити товар?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Ні
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
