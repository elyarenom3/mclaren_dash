import React from 'react';
import { Box, Typography } from '@mui/material';

const RacingLineSim: React.FC = () => {
  return (
    <Box
      width={{ xs: '40%', lg: '40%' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow={3}
      bgcolor="white"
      borderRadius="15px"
      overflow="hidden"
      p={2}
    >
      <Typography gutterBottom fontWeight={700} color="black" textAlign="center">
        Portland E-Prix Optimal Racing Line Sim
      </Typography >
      <Typography fontSize={11} fontWeight={500} color="black" textAlign="center">
        [Racing Line Sim made with Unity + Python and redrawn to match all components]
      </Typography>
      <video width="100%" height="auto" loop autoPlay muted>
        <source src="/assets/Final.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default RacingLineSim;

