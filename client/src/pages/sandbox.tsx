import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import CustomButton from '../components/common/CustomButton';
import { PlayCircle, Code, Delete, Publish } from '@mui/icons-material';
import { Box, Typography, Stack, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/system';

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
  fontFamily: 'monospace',
  border: '1px solid #c8c4c4',
  '&::placeholder': {
    color: '#c8c4c4',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
  },
  '&:hover': {
    borderColor: '#000000',
  },
  '&:focus': {
    borderColor: theme.palette.warning.main,
    borderWidth: '2px',
  },
}));

interface FileData {
  _id: string;
  datafile: string;
  filename: string;
  filetype: string;
}

const Sandbox: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [plot, setPlot] = useState<string>('');
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>('');

  const exampleCode = `import pandas as pd
import matplotlib.pyplot as plt

# Create a DataFrame with some example data
data = {
  'x': [0, 2, 5, 9, 14, 23, 28],
  'y': [2, 8, 10, 12, 15, 19, 24]}

df = pd.DataFrame(data)

plt.figure(figsize=(6, 3))
plt.plot(df['x'], df['y'], marker='o', linestyle='-', color='orange')

plt.title('Example Line Plot')
plt.xlabel('Rise of Mclaren')
plt.ylabel('Popularity of the Colour Orange')

plt.grid(True)
plt.show()`;

  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('https://mclaren-dashboard.onrender.com/api/v1/data');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files', error);
    }
  };

  const runCode = async () => {
    try {
      const response = await axios.post('https://mclaren-dash.onrender.com/run', { code });
      setOutput(response.data.output);
      setPlot(response.data.plot);
    } catch (error) {
      setOutput('Error running code');
    }
  };

  const showExample = () => {
    setCode(exampleCode);
  };

  const clear = () => {
    setCode("");
    setOutput('');
    setPlot('');
  };

  const fetchFileContent = async () => {
    if (!selectedFileId) return;
    try {
      console.log(`Fetching content for file ID: ${selectedFileId}`); 
      const response = await axios.get(`https://mclaren-dashboard.onrender.com/api/v1/data/${selectedFileId}`);
      const fileContent = response.data;

      const fileCode = `import pandas as pd

# Load the file content
file_path = '/path/to/downloaded/${fileContent.filename}'

# Your logic to read the file
df = pd.read_hdf(file_path)

# Example code to visualize the data
df.plot()
plt.show()
`;
      setCode(fileCode);
    } catch (error) {
      console.error('Error fetching file content', error);
    }
  };

  const handleFileSelect = (e: SelectChangeEvent<string>) => {
    setSelectedFileId(e.target.value as string);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={2} mt={0} alignItems="center" mb={2}>
        <Typography mb="20px" fontSize={20} fontWeight="400" color="black"> Sandbox </Typography>
        <Code />
      </Stack>

      <StyledTextareaAutosize
        value={code}
        onChange={handleCodeChange}
        minRows={15}
        placeholder={"Write your Python code here.\nPress on the 'Show Example' button below to see an example"}
      />
      <Stack direction="row" justifyContent="space-between" spacing={2} mt={3}>
        <Stack direction="row" spacing={2}>
          <CustomButton 
            title="Run Code" 
            handleClick={runCode} 
            backgroundColor='#f3832b'
            color='white'
            icon={<PlayCircle />}
          />
          <CustomButton 
            title="Show Example" 
            handleClick={showExample} 
            backgroundColor='#6c757d'
            color='white'
            icon={<Code />}
          />
          <CustomButton 
            title="Clear" 
            handleClick={clear} 
            backgroundColor='#6c757d'
            color='white'
            icon={<Delete />}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Select value={selectedFileId} onChange={handleFileSelect} displayEmpty>
            <MenuItem value="" disabled>Select a file</MenuItem>
            {files.map(file => (
              <MenuItem key={file._id} value={file._id}>{file.filename}</MenuItem>
            ))}
          </Select>
          <CustomButton 
            title="Import File" 
            handleClick={fetchFileContent} 
            backgroundColor='#6c757d'
            color='white'
            icon={<Publish />}
          />
        </Stack>
      </Stack>
      <pre>{output}</pre>
      {plot && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
          <img
            src={`data:image/png;base64,${plot}`}
            alt="Plot"
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '4px', padding: '10px', boxSizing: 'border-box' }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default Sandbox;
