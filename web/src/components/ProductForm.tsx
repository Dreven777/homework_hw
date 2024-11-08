import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import { createProduct } from './services/ProductService';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      if (!values.name) errors.name = 'Введить назву товару';
      if (!values.description) errors.description = 'Введить опис товару';
      if (values.price <= 0) errors.price = 'Введить ціну товару вищу 0';
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await createProduct(values);
        setSnackbarMessage('Продукт додано!');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/products'); 
        }, 1000);
      } catch (error) {
        console.error(error);
        setSnackbarMessage('Помилка додавання продукту');
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <div>
      <Dialog open={true} onClose={() => navigate('/products')}>
        <DialogTitle>Додати новий товар</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              margin="normal"
            />
            <DialogActions>
              <Button onClick={() => navigate('/products')} color="primary">
                Відмінити
              </Button>
              <Button type="submit" color="primary">
                Додати
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage} 
        onClose={() => setOpenSnackbar(false)} 
      />
    </div>
  );
};

export default ProductForm;
