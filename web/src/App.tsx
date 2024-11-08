import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductEditForm from './components/ProductEdit';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Router>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Список товарів
        </Typography>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/" element={<ProductList />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/products/edit/:id" element={<ProductEditForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
