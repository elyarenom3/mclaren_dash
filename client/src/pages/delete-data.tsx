import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Stack, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import CustomButton from '../components/common/CustomButton';

const DeleteData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/data/${id}`);
      navigate('/data');
    } catch (error) {
      console.error('Error deleting data', error);
      navigate('/data');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box p={4} bgcolor="white" boxShadow={5} borderRadius={5} textAlign="center">
        <IconButton color="primary" onClick={() => navigate('/data')} sx={{ position: 'absolute', top: 10, right: 10 }}>
          <Close />
        </IconButton>
        <Typography variant="h6" mb={2}>Are you sure you want to delete this dataset?</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <CustomButton 
            title="Delete"
            handleClick={handleDelete}
            backgroundColor='#f3832b'
            color='white'
          />
          <CustomButton 
            title="Return"
            handleClick={() => navigate('/data')}
            backgroundColor='#6c757d'
            color='white'
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default DeleteData;
