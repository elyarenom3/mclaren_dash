import React from 'react';
import { Place, Description, Download, ElectricCar, Delete, Edit } from '@mui/icons-material';
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

const DataCard: React.FC<DataCardProps> = ({ id, title, datatype, location, formula, datafile, filename,}) => {
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
    <Card sx={{ borderRadius: '15px', boxShadow: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
      <CardContent sx={{ flex: 1, padding: '0px 10px' }}>
        <Typography variant="h6" component="div" color="black" sx={{ fontSize: 14 }}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1} mt={1}>
          <Description color="action" />
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 12 }}>
            {datatype}
          </Typography>
          <Place color="action" />
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 12 }}>
            {location}
          </Typography>
          <ElectricCar color="action" />
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 12 }}>
            {formula}
          </Typography>
        </Stack>
      </CardContent>
      <IconButton color="primary" onClick={() => downloadFile(datafile, filename)}>
        <Download />
      </IconButton>
      <IconButton color="primary" onClick={() => navigate(`/data/edit/${id}`)}>
          <Edit />
        </IconButton>
      <IconButton color="primary" onClick={() => navigate(`/data/delete/${id}`)}>
        <Delete />
      </IconButton>
    </Card>
  );
}

export default DataCard;
