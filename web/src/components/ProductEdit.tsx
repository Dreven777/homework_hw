import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { TextField, Button, Snackbar } from '@mui/material';
import { getProduct, updateProduct } from './services/ProductService';

const ProductEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackBarMessage, setMessage] = useState('');
  const navigate = useNavigate();  

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cursor, setCursor] = useState<string | null>(null);  

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      console.log(data);
      const currentProduct = data.product;
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
    validate: (values: { name: string; description: string; price: number }) => {
      const errors: { [key: string]: string } = {};
    
      const nameRegex = /^[a-zA-Z0-9]{1,30}$/;
      const descriptionRegex = /^[a-zA-Z0-9\s.,]{1,200}$/;
      const priceRegex = /^[0-9]{1,4}$/;
    
      if (!values.name) {
        errors.name = 'Введить назву товару';
      } else if (!nameRegex.test(values.name)) {
        errors.name = 'Назва товару має бути від 1 до 30 символів';
      }
    
      if (!values.description) {
        errors.description = 'Введить опис товару';
      } else if (!descriptionRegex.test(values.description)) {
        errors.description = 'Опис товару має бути від 1 до 200 символів';
      }
    
      if (!values.price) {
        errors.price = 'Введить ціну товару';
      } else if (!priceRegex.test(values.price.toString())) {
        errors.price = 'Ціна товару має бути від 1 до 9999';
      }
    
      return errors;
    }, 
    onSubmit: async (values) => {
      try {
        if (product?._id) {
          const res = await updateProduct(product._id, values);
          setOpenSnackbar(true);
          setMessage(res.message);
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
        message={snackBarMessage}
      />
    </div>
  );
};

export default ProductEditForm;
