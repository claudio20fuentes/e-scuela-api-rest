import { useEffect, useRef, useState } from 'react';
import './drop-file-input.css';
import noteAdd from '../../assets/images/imgUploader/note_add.png';
import CancelIcon from '@mui/icons-material/Cancel';

import {
  Typography,
  Button,
  Grid,
  Box,
} from '@mui/material';

const DropFileInput = ({ message, file, setFile, filePreview, setFilePreview, fileRemove }) => {
  const wrapperRef = useRef(null);
  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFilePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <Grid container justifyContent='center' display='flex' alignItems='center'>
      {file.length === 0 ? (
        <Box
          ref={wrapperRef}
          bgcolor='#FAFAFA'
          width={1}
          borderRadius='5px'
          border='1px dashed #E1E6EA'
          height='90px'
          className='drop-file-input'
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}>
          <Grid
            container
            justifyContent='center'
            display='flex'
            alignItems='center'
            flexDirection='column'>
            <Box component='img' src={noteAdd} />
            <Typography color='#D1D9E1'>{message}</Typography>
          </Grid>
          <input type='file' value='' onChange={onFileDrop} />
        </Box>
      ) : (
        <Box
          bgcolor='#FAFAFA'
          width={1}
          borderRadius='5px'
          border='1px dashed #E1E6EA'
          height='100px'>
          <Grid container display='flex' justifyContent='space-between' flexDirection='row-reverse'>
            <Grid
              item
              xs={12}
              justifyContent='center'
              display='flex'
              alignContent='center'>
              <Box height='80px' maxWidth='320px' component='img' src={filePreview} mt={1} />
            </Grid>
            <Box
              sx={{ position: 'absolute' }}>
              <Button onClick={() => fileRemove()}><CancelIcon/></Button>
            </Box>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default DropFileInput;
