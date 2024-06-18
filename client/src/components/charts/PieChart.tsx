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
    pl={3}
    py={0}
    gap={1}
    borderRadius="15px"
    minHeight="70px"
    width="fit-content"
    boxShadow= {3}
    >
      <Stack direction="column">
        <Typography fontSize={12} color="black">
          {title}
        </Typography>
        <Typography fontSize={15} color="black" fontWeight={700} mt={0}>
          {value}
        </Typography>
      </Stack>

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
        width = "110px"
      />
    </Box>
  );
};

export default PieChart;

