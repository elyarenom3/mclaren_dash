import React from 'react';
import { Box, Typography, FormControl, FormHelperText, TextField, TextareaAutosize, Stack, Select, MenuItem, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { FormProps } from '../../interfaces/common';
import CustomButton from './CustomButton';

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  background: 'transparent',
  fontSize: '14px',
  borderColor: '#c8c4c4',
  padding: '10px 13px',
  borderRadius: '4px',
  outline: 'none',
  boxSizing: 'border-box',
  resize: 'none',
  fontFamily: 'Roboto, sans-serif',
  border: '1px solid #c8c4c4',
  '&:hover': {
    borderColor: '#000000',
  },
  '&:focus': {
    borderColor: theme.palette.warning.main,
    borderWidth: '2px',
  },
}));

const Form = ({ type, register, handleSubmit, handleFileChange, formLoading, onFinishHandler, dataFile }: FormProps) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
      <Typography fontSize={17} color="black">
        {type} a DataSet
      </Typography>
      <IconButton color="primary" onClick={() => navigate('/data')}>
        <Close />
      </IconButton>
      </Stack>
      

      <Box mt={1} borderRadius="15px" padding="30px" bgcolor='white' boxShadow={3}>
        <form
          style={{ marginTop: '2px', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText sx={{
              fontWeight: 400,
              margin: '2px 0',
              fontSize: 14,
              color: '#444444'
            }}> Dataset name:
            </FormHelperText>
            <TextField
              fullWidth
              required
              id='outlined-basic'
              color='warning'
              variant='outlined'
              {...register('title', { required: true })}
              InputProps={{
                style: {
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Roboto, sans-serif',
                  height: '40px',
                  padding: '5px 0px',
                },
              }}
            />
          </FormControl>

          <FormControl>
            <FormHelperText sx={{
              fontWeight: 400,
              margin: '2px 0',
              fontSize: 14,
              color: '#444444'
            }}> Description:
            </FormHelperText>
            <StyledTextareaAutosize
              minRows={5}
              required
              {...register('description', { required: true })}
            />
          </FormControl>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{
                fontWeight: 400,
                margin: '2px 0',
                fontSize: 14,
                color: '#444444'
              }}>
                Data Type:
              </FormHelperText>
              <Select
                variant='outlined'
                color='warning'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue="hdf5"
                {...register('datatype', { required: true })}
                sx={{
                  fontSize: 14,
                  '.MuiSelect-select': {
                    fontSize: 14, color: 'black'
                  }
                }}
              >
                <MenuItem value="hdf5" sx={{ fontSize: 14 }}>
                  .HDF5
                </MenuItem>
                <MenuItem value="csv" sx={{ fontSize: 14 }}>
                  .CSV
                </MenuItem>
                <MenuItem value="mat" sx={{ fontSize: 14 }}>
                  .MAT
                </MenuItem>
                <MenuItem value="bin" sx={{ fontSize: 14 }}>
                  .BIN
                </MenuItem>
                <MenuItem value="json" sx={{ fontSize: 14 }}>
                  .JSON
                </MenuItem>
                <MenuItem value="xml" sx={{ fontSize: 14 }}>
                  .XML
                </MenuItem>
                <MenuItem value="other" sx={{ fontSize: 14 }}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{
                fontWeight: 400,
                margin: '2px 0',
                fontSize: 14,
                color: '#444444'
              }}>
                Track Location:
              </FormHelperText>
              <Select
                variant='outlined'
                color='warning'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue="spain"
                {...register('location', { required: true })}
                sx={{
                  fontSize: 14,
                  '.MuiSelect-select': {
                    fontSize: 14, color: 'black'
                  }
                }}
              >
                <MenuItem value="spain" sx={{ fontSize: 14 }}>
                  Spain
                </MenuItem>
                <MenuItem value="austria" sx={{ fontSize: 14 }}>
                  Austria
                </MenuItem>
                <MenuItem value="turkey" sx={{ fontSize: 14 }}>
                  Turkey
                </MenuItem>
                <MenuItem value="portugal" sx={{ fontSize: 14 }}>
                  Portugal
                </MenuItem>
                <MenuItem value="hungary" sx={{ fontSize: 14 }}>
                  Hungary
                </MenuItem>
                <MenuItem value="bahrain" sx={{ fontSize: 14 }}>
                  Bahrain
                </MenuItem>
                <MenuItem value="other" sx={{ fontSize: 14 }}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText sx={{
                fontWeight: 400,
                margin: '2px 0',
                fontSize: 14,
                color: '#444444'
              }}>
                Formula:
              </FormHelperText>
              <Select
                variant='outlined'
                color='warning'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue="extreme e"
                {...register('formula', { required: true })}
                sx={{
                  fontSize: 14,
                  '.MuiSelect-select': {
                    fontSize: 14, color: 'black'
                  }
                }}
              >
                <MenuItem value="extreme e" sx={{ fontSize: 14 }}>
                  Extreme E
                </MenuItem>
                <MenuItem value="formula e" sx={{ fontSize: 14 }}>
                  Formula E
                </MenuItem>
                <MenuItem value="formula 1" sx={{ fontSize: 14 }}>
                  Formula 1
                </MenuItem>
                <MenuItem value="other" sx={{ fontSize: 14 }}>
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction='column' gap={0} justifyContent="center" mb={0}>
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
            <Typography fontSize={14} color="black" sx={{ wordBreak: 'break-all' }} {...register('filename', { required: true })}>
              {dataFile?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor='#f3832b'
            color='white'
          />
        </form>
      </Box>
    </Box>
  );
}

export default Form;
