import React from 'react';
import { useList } from '@refinedev/core';
import { Box, Stack, Typography } from "@mui/material";
import PieChart from '../components/charts/PieChart';
import RaceStandingsE from '../components/charts/RaceStandingsE';
import RaceStandingsX from '../components/charts/RaceStandingsX';
import RacingLineSim from '../components/charts/RacingLineSim';
import DataCard2 from '../components/common/DataCard2';

const Home = () => {
  const { data, isLoading, isError } = useList<FileData>({
    resource: 'data',
    config: {
      pagination: {
        pageSize: 4
      },
      sort: [{ field: 'createdAt', order: 'desc' }]
    }
  });

  interface FileData {
    _id: string;
    datafile: string;
    filename: string;
    title: string;
    datatype: string;
    location: string;
    formula: string;
  }

  const latestData = data?.data ?? [];

  if (isLoading) return <Typography> Loading ... </Typography>
  if (isError) return <Typography> Something went wrong! </Typography>

  return (
    <Box >
      <Box mt="0px" display="flex" flexWrap="wrap" gap={2}>
        <PieChart
          title="Next Formula E Race"
          value="Hankook Portland E-Prix"
          series={[5, 12]}
          colors={['#000000', '#f3832b']}
          labels={['Remaining Races', 'Completed Races']}
        />
        <PieChart
          title="Next Extreme E Race"
          value="Scotland Hydro X-Prix"
          series={[6, 2]}
          colors={['#000000', '#f3832b']}
          labels={['Remaining Races', 'Completed Races']}
        />
      </Box>
      <Box mt="5px" display="flex" flexWrap="wrap" gap={2} width="100%">
        <Stack
          width="100%"
          direction={{ xs: 'row', lg: 'row' }}
          gap={1}
        >
          <RacingLineSim />
          <RaceStandingsX />
          <RaceStandingsE />
        </Stack>
      </Box>
      <Box mt="5px" flex={1} borderRadius="15px" padding="15px" bgcolor="#fcfcfc" boxShadow={5}>
        <Stack direction="column">
          <Typography fontSize={12} fontWeight= '700' color="black">
           Popular DataSets
          </Typography>
          <Stack direction="row">
            <Box mt={1} sx={{ display: 'flex', flexWrap: "wrap", gap: 2 }}>
              {latestData.map((file) => (
                <DataCard2
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
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
