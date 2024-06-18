import React from 'react'
import PieChart from '../components/charts/PieChart';
import PieChart2 from '../components/charts/PieChart2';
import ApexChart from '../components/charts/linechart';
import { Box, Typography, Card, CardContent, Stack, IconButton } from '@mui/material';
import { Download } from '@mui/icons-material';

const predictivemodels = () => {
  return (
    <Box>
 
    <Stack direction='row' gap='10px' minHeight='200px' display = "flex" flexWrap="wrap" width="100%">
      <Box mt={2} mb={2} bgcolor = 'white' borderRadius="15px" minWidth='400px' width="60%" display = "flex" justifyContent="space-between" padding="15px" sx={{border: '1px solid #c8c4c4'}}> 
      <Stack direction="column">
      <Stack direction="row" justifyContent="space-between" spacing={2} mt={0} width="100%">
          <Typography fontSize={14} fontWeight= '700' color="#444444">
           Brake Temperature Predictive Model
          </Typography>
          <a href="https://github.com/elyarenom3/Brake-Temp-Model">
          <IconButton color="primary" sx={{ 
            backgroundColor: '#ffeadc', 
            maxHeight: '35px',
            maxWidth: '35px',
            '&:hover': { backgroundColor: '#e0e0e0' } 
          }}>
          <Download />
        </IconButton>
        </a>
        </Stack>
      <p style={{ fontSize: '0.8em' }}>
      About: Python model to predict left and right brake temps in a F1 car, using a gradient boosting machine.
      </p>
      <Stack direction="row" spacing='10px'>
      <Stack direction="column">
      <p style={{ fontSize: '0.8em' }}>
      <strong>Target Variables:</strong> Delta Brake Temperature (for left and right brakes) <br />
      <strong>Features:</strong> Delta Speed + <strong>Engineered Features</strong> such as acceleration (deltaSpeed), braking periods, and temporal changes. <br />
      <strong>Model:</strong> <strong>Gradient Boosting Machine</strong> (XGBoost)

      </p>
      </Stack>
      <Stack direction="column">
      <p style={{ fontSize: '0.8em' }}>
      <strong>Regularization:</strong> L2 regularization used in XGBoost  <br />
      <strong>Hyperparameter Tuning:</strong> GridSearchCV and TimeSeriesSplit
      </p>
      </Stack>
      </Stack> 
      </Stack>  
      </Box>
      <Box width="35%">
        <Stack direction='row' gap='10px'>
          <PieChart2
          title="Feature Importance for Model L Greater than -2"
          value="Feature Importance for Model L Greater than -2"
          series={[0.89, 0.08, 0.02, 0.01]}
          colors={['#f3832b', '#000000', '#666666','#555555' ]}
          labels={['deltaSpeed', 'vCar', 'TTrack','TAir' ]}
          />
          <PieChart2
          title="Feature Importance for Model L Less Than or Equal to -2"
          value="Feature Importance for Model L Less Than or Equal to -2"
          series={[0.97, 0.02, 0.01]}
          colors={['#f3832b', '#000000', '#666666','#555555' ]}
          labels={['deltaSpeed', 'vCar', 'TTrack','TAir' ]}
          />
        </Stack>
        <Stack direction='row' gap='10px'>
        <PieChart2
          title="Feature Importance for Model R Greater than -2"
          value="Feature Importance for Model R Greater than -2"
          series={[0.86, 0.12, 0.02, 0.01]}
          colors={['#f3832b', '#000000', '#666666','#555555' ]}
          labels={['deltaSpeed', 'vCar', 'TTrack','TAir' ]}
          />
       <PieChart2
          title="Feature Importance for Model R Less Than or Equal to -2"
          value="Feature Importance for Model R Less Than or Equal to -2"
          series={[0.98, 0.01, 0.01]}
          colors={['#f3832b', '#000000', '#666666','#555555' ]}
          labels={['deltaSpeed', 'vCar', 'TTrack','TAir' ]}
          />
        </Stack>
      </Box>
    </Stack>
        
    <Box>
      <ApexChart />
    </Box>
    </Box>
    
  )
}

export default predictivemodels