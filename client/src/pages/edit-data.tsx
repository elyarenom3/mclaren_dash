import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, TextField, Select, MenuItem, SelectChangeEvent, Button, FormControl, InputLabel, IconButton } from '@mui/material';
import CustomButton from '../components/common/CustomButton';
import { Close } from '@mui/icons-material';

const EditData: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
    datatype: '',
    location: '',
    formula: '',
    datafile: '',
  });
  const [dataFile, setDataFile] = useState({ name: '', url: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mclaren-dashboard.onrender.com/api/v1/data/${id}`);
        setData(response.data);
        setDataFile({ name: response.data.filename, url: response.data.datafile }); // Ensure the dataFile state is set correctly
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (datafile: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(datafile).then((result: string) => setDataFile({ name: datafile?.name, url: result }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`https://mclaren-dashboard.onrender.com/api/v1/data/${id}`, { ...data, datafile: dataFile.url });
      navigate('/data');
    } catch (error) {
      console.error('Error updating data', error);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
      <Typography fontSize={20} mb="20px" color="black">Edit Data</Typography>
      <IconButton color="primary" onClick={() => navigate('/data')}>
        <Close />
      </IconButton>
      </Stack>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField name="title" label="Title:" value={data.title} onChange={handleInputChange} fullWidth />
          <TextField name="description" label="Description:" value={data.description} onChange={handleInputChange} fullWidth />
          
          <FormControl fullWidth>
            <InputLabel>Data Type:</InputLabel>
            <Select name="datatype" label="Data Type:" value={data.datatype} onChange={handleSelectChange} displayEmpty>
              <MenuItem value=""><em>Select Data Type</em></MenuItem>
              <MenuItem value="hdf5">.HDF5</MenuItem>
              <MenuItem value="csv">.CSV</MenuItem>
              <MenuItem value="mat">.MAT</MenuItem>
              <MenuItem value="bin">.BIN</MenuItem>
              <MenuItem value="json">.JSON</MenuItem>
              <MenuItem value="xml">.XML</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Location:</InputLabel>
            <Select name="location" label="Location:" value={data.location} onChange={handleSelectChange} displayEmpty>
              <MenuItem value=""><em>Select Location</em></MenuItem>
              <MenuItem value="spain">Spain</MenuItem>
              <MenuItem value="austria">Austria</MenuItem>
              <MenuItem value="turkey">Turkey</MenuItem>
              <MenuItem value="portugal">Portugal</MenuItem>
              <MenuItem value="hungary">Hungary</MenuItem>
              <MenuItem value="bahrain">Bahrain</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Formula:</InputLabel>
            <Select name="formula" label="Formula:" value={data.formula} onChange={handleSelectChange} displayEmpty>
              <MenuItem value=""><em>Select Formula</em></MenuItem>
              <MenuItem value="extreme e">Extreme E</MenuItem>
              <MenuItem value="formula e">Formula E</MenuItem>
              <MenuItem value="formula 1">Formula 1</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          
          <Stack direction='row' gap={2} alignItems="center">
            <Typography fontSize={14} color='#444444'>
              Data File:
            </Typography>
            <Button component="label" sx={{
              width: 'fit-content',
              color: "black",
              textTransform: 'capitalize',
              fontSize: 14,
              border: '1px solid',
              borderColor: 'black',
              '&:hover': {
                borderColor: '#f3832b',
                color: '#f3832b',
              }
            }}>
              Upload *
              <input
                hidden
                accept="file/*"
                type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileChange(e.target.files[0]);
                }}
              />
            </Button>
          </Stack>
          <Typography fontSize={14} color="black" sx={{ wordBreak: 'break-all' }}>
            {dataFile?.name}
          </Typography>
          <CustomButton type="submit" title="Update Data" backgroundColor='#f3832b' color='white' />
        </Stack>
      </form>
      
      
      
    </Box>
  );
};

export default EditData;
