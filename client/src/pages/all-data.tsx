import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Add } from '@mui/icons-material';
import { Box, Stack, Typography, TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DataCard from '../components/common/DataCard';
import CustomButton from '../components/common/CustomButton';

interface FileData {
  _id: string;
  datafile: string;
  filename: string;
  title: string;
  datatype: string;
  location: string;
  formula: string;
}

const AllData: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FileData[]>([]);
  const [filters, setFilters] = useState({ title: '', formula: '' });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mclaren-dashboard.onrender.com/api/v1/data', {
        params: {
          title_like: filters.title,
          formula: filters.formula
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://mclaren-dashboard.onrender.com/api/v1/data/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting file', error);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
          <Typography fontSize={20} color="black">{!data.length ? 'No Results' : 'All Data'}</Typography>
          <TextField
            variant="outlined"
            color="warning"
            placeholder="search by title"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '35px',
                '& .MuiInputBase-input': {
                  padding: '5px 10px',
                  fontSize: '13px',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#333333',
                fontSize: '13px',
              },
            }}
          />
          <Select
            variant="outlined"
            color="warning"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            value={filters.formula}
            onChange={(e) => setFilters({ ...filters, formula: e.target.value })}
            sx={{
              height: '35px',
              '& .MuiOutlinedInput-input': {
                padding: '5px 10px',
                fontSize: '13px',
              },
              '& .MuiOutlinedInput-root': {
                height: '35px',
                fontSize: '13px',
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            {["formula e", "extreme e", "formula 1", "other"].map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </Stack>
        <CustomButton
          title='Add Data'
          handleClick={() => navigate('/data/create')}
          backgroundColor='#f3832b'
          color='white'
          icon={<Add />}
        />
      </Stack>
      <Box mt="20px" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {data.map((file) => (
          <DataCard
            key={file._id}
            id={file._id}
            title={file.title}
            datatype={file.datatype}
            location={file.location}
            formula={file.formula}
            datafile={file.datafile}
            filename={file.filename}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllData;
