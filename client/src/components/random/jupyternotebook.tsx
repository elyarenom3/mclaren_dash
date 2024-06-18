import React from 'react';
import Iframe from 'react-iframe';

const JupyterNotebook = () => {
  return (
    <div>
      <h1>Embedded Jupyter Notebook</h1>
      <Iframe 
        url="http://your-jupyter-notebook-url" 
        width="100%"
        height="600px"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default JupyterNotebook;
