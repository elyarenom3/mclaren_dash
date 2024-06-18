import React from 'react';
import { Place, Description, Download, ElectricCar, Delete } from '@mui/icons-material';
import { Box, Typography, Card, CardContent, Stack, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DataCardProps {
  id: string;
  title: string;
  datatype: string;
  location: string;
  formula: string;
  datafile: string;
  filename: string;
}

const DataCard2: React.FC<DataCardProps> = ({ id, title, datatype, location, formula, datafile, filename, }) => {
  const navigate = useNavigate();
  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Failed to download file', error);
    }
  };

  return (
    <Card sx={{ borderRadius: '15px', boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "4px", width: '170px', height: '100px',border: '1px solid #c8c4c4' }}>
      <CardContent sx={{ flex: 1, padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Stack direction="row" alignItems="center" gap= '5px' mt={0}>
        <Typography variant="h6" component="div" color="black" sx={{ fontSize: 11, textAlign: 'left', wordBreak: 'break-word' }}>
          {title}
        </Typography>
        <IconButton color="primary" onClick={() => downloadFile(datafile, filename)} sx={{ 
            backgroundColor: '#ffeadc', // Add background color
            '&:hover': { backgroundColor: '#e0e0e0' } // Add hover effect
          }}>
            
          <Download />
        </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0} mt="10px">
          <Description color="action" fontSize="inherit" />
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 10, textAlign: 'center',}}>
            {datatype}
          </Typography>
          <Place color="action" fontSize="inherit"/>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 10, textAlign: 'center',}}>
            {location}
          </Typography>
          <ElectricCar color="action" fontSize="inherit"/>
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 10, textAlign: 'center',}}>
            {formula}
          </Typography>
        </Stack>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        

      </Box>
    </Card>
  );
}

export default DataCard2;
