import React from 'react'
import { Box, Stack, Typography } from "@mui/material";

import { RaceStandingsEE } from '../../constants/RaceStandingsE'

interface ProgressBarProps{
    title: string;
    points: number;
    color: string;
    maxPoints: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, points, color, maxPoints }) => {
    const percentage = (points / maxPoints) * 100;
  
    return (
    <Box width="100%" >
        <Stack direction= "row" 
        alignItems="center"
        justifyContent="space-between">
            <Typography fontSize={11} fontWeight={500} color="black">{title}
            </Typography>

            <Typography fontSize={11} fontWeight={500} color="black">{points}
            </Typography>

        </Stack>
        <Box mt={0} position="relative" width="100%" height="5px" borderRadius={1} bgcolor="black">
        <Box
        width={`${percentage}%`}
        bgcolor={color}
        position="absolute"
        height="100%"
        borderRadius={1}
        />
        </Box>
    </Box>
);
    };

const RaceStandingsX = () => {
    const maxPoints = 299;

  return (
    <Box
    p={2}
    boxShadow={3}
    bgcolor= "white"
    id= "chart"
    width={{ xs: '30%', lg: '30%' }}
    display="flex"
    flexDirection="column"
    borderRadius="15px"
    >
       <Typography fontSize={16} color="black" fontWeight={700} mt={0}>
          Formula E standings
        </Typography>

        <Stack my="5px" direction="column" gap={1}>
            {RaceStandingsEE.map((bar)=> <ProgressBar key={bar.title}{...bar} maxPoints={maxPoints}/>)}
        </Stack>
    </Box>
  )
}

export default RaceStandingsX