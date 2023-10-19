import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { TextField, Button, Grid } from '@mui/material';

const ColorPicker = ({ onChange, pickedColor }) => {
  const [color, setColor] = useState('');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  useEffect(() => {
    setColor(pickedColor);
  }, [pickedColor]);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setColor(newColor.hex);
    onChange(newColor.hex);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: color,
            padding: '10px',
            border: '1px solid #C7C9D9',
            width: '100%',
            height: '55px',
          }}></Button>
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          value={color}
          InputProps={{
            style: {
              padding: '0px',
              color: '#8F90A6'
              // backgroundColor: color,
            },
          }}
        />
      </Grid>
      {displayColorPicker && (
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}
    </Grid>
  );
};

export default ColorPicker;
