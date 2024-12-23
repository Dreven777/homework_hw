import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from './services/ProductService';
import { Button, Card, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [avgPrice, setAvgPrice] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cursor, setCursor] = useState<string | null>(null);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(searchQuery, cursor);
      setProducts(data.products);
      setAvgPrice(data.avgPrice);
      setTotalPages(data.totalPages);
      // Set cursor to the last product's _id in the current response
      setCursor(data.cursor);
    };
    fetchProducts();
  }, [searchQuery, currentPage]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setCursor(null); 
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div color="primary" style={{fontSize: '20px', fontWeight: 'bold'}}>Середня ціна {avgPrice.toFixed(2)} ₴</div>
      <br/>
      <Button variant="contained" color="primary" onClick={() => navigate('/products/add')}>
        Додати новий продукт
      </Button>

      <br />

      <TextField
        label="Пошук продуктів"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ margin: '20px 0', width: '300px' }}
      />

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

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Попередня
        </Button>
        <Typography style={{ margin: '0 15px', display: 'flex', alignItems: 'center' }}>
          Сторінка {currentPage} з {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Наступна
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
