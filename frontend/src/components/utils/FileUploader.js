import React, { useState } from 'react';
import { Typography, Button, Paper } from '@mui/material';

function FileUploader({ onFilesChange }) {
  // const classes = useStyles();
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = [...files];
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      newFiles.push(event.dataTransfer.files[i]);
    }
    setFiles(newFiles);
    onFilesChange(newFiles); // Call parent function with updated file array
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileDelete = (fileIndex) => {
    const newFiles = [...files];
    newFiles.splice(fileIndex, 1);
    setFiles(newFiles);
    onFilesChange(newFiles); // Call parent function with updated file array
  };

  const handleFileUpload = () => {
    // Code to upload files using the provided URL
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
  };

  return (
    <div>
      <Paper onDrop={handleDrop} onDragOver={handleDragOver} sx={{ p: 3 }}>
        {files.length > 0 ? (
          <div>
            <Typography variant='subtitle1'>Nombre de archivo:</Typography>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  <Typography component='span' variant='body1'>
                    {file.name} ({file.size} bytes)
                  </Typography>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleFileDelete(index)}>
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
            <Button
              variant='contained'
              color='primary'
              onClick={handleFileUpload}>
              Upload
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant='subtitle1'>Sube tu logo</Typography>
            {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFileUpload}
                >
                    Upload
                </Button> */}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default FileUploader;
