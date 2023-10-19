import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, Button, Typography, Box } from '@mui/material';

export const PaymentPopup = ({ open, handleClose, content }) => {

  let contentArray = false; 
  let message = false;

  if(Array.isArray(content)){
    contentArray = content;
  } else { 
    message = JSON.stringify(content)?.replace(/^{|}$/g, '').split(',');
  }

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle sx={{fontSize: '16px', mb: '5%'}}>Detalles del Error</DialogTitle>
      <DialogContent sx={{ width: {xs: '300px', sm:'600px'}, overflow:'auto' }}>
        {
          !contentArray ? 
          message?.map( (line, index)=> (
            <Typography key={index} >
              {line}
            </Typography>
          ))
          : contentArray?.map((content, index) => (
            <Box key={index} mb={2}>
              <Typography sx={{ overflowWrap: 'break-word' }} mb={2} fontWeight={700}>
              {`${content.type}:`}
              </Typography>
              {
                JSON.stringify(content.data).replace(/^{|}$/g, '').split(',').map((line, index) => (
                  <Typography sx={{ overflowWrap: 'break-word' }} key={index}>
                    {`${line}:`}
                  </Typography>
                ))
              }

            </Box>
          ))
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
