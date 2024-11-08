import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TextField, Button, Snackbar } from '@mui/material';
import { getProducts, updateProduct } from './services/ProductService';

const ProductEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProducts();
      const currentProduct = data.find((p: any) => p._id === id);
      setProduct(currentProduct);
    };
    fetchProduct();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
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
        if (product?._id) {
          await updateProduct(product._id, values);
          setOpenSnackbar(true);
          setTimeout(() => {
            navigate('/products'); 
          }, 1000);
        }
      } catch (error) {
        console.error(error);
        setOpenSnackbar(false);
      }
    },
  });

  return (
    <div>
      <h1>Змінити товар</h1>
      <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Назва"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        fullWidth
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && typeof formik.errors.name === 'string' ? formik.errors.name : ''} 
        margin="normal"
      />
        <TextField
          label="Опис"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && typeof formik.errors.description === 'string' ? formik.errors.description : ''}  
          margin="normal"
        />
        <TextField
          label="Ціна"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          fullWidth
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && typeof formik.errors.price === 'string' ? formik.errors.price : ''} 
          margin="normal"
        />
        <Button type="submit" color="primary" variant="contained">
          Зберегти зміни
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message="Продукт змінено!"
      />
    </div>
  );
};

export default ProductEditForm;
