import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Box
      sx={{
        padding: { xs: '5rem 0', md: '15rem 0' },
        textAlign: 'center',
      }}
    >
      <Box className="section-center">
        <Typography variant="h3" gutterBottom>
          Join our newsletter for new product & sales notification!
        </Typography>
        <Box className="content">
          <Typography variant="body1">
            Stay informed for new product arrival and great sales! Subscribe
            our newsletter and enjoy more discounts!
          </Typography>
          {/* Contact Form */}
          <Box
            component="form"
            className="contact-form"
            noValidate
            autoComplete="off"
            sx={{
              '& .MuiTextField-root': { marginRight: '8px' },
            }}
          >
            <TextField
              label="Enter email"
              variant="outlined"
              type="email"
              required
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                padding: '15.5px 14px',
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
