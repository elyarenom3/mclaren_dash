import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@mui/material';

interface PieChartProps {
  title: string;
  value: number | string;
  series: number[];
  colors: string[];
  labels: string[]; 
}

const PieChart: React.FC<PieChartProps> = ({ title, value, series, colors, labels }) => {
  return (
    <Box
    id = "chart"
    flex = {1}
    display = "flex"
    bgcolor = 'white'
    flexDirection= "row"
    justifyContent="space-between"
    alignItems="center"
    pl={2}
    pr={1}
    py={1}
    gap={2}
    borderRadius="15px"
    minHeight="70px"
    width="fit-content"

    >
      <Stack direction="column">
        <Typography fontSize={12} color="black" align='center'>
          {title}
        </Typography>
        <ReactApexChart
        options={{
          chart: { type: 'donut' },
          colors,
          labels,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        width = "140px"
      />
      </Stack>
    </Box>
  );
};

export default PieChart;

