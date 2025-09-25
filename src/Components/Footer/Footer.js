import React from 'react'
import {Box, Container, Typography, Link} from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 1,
        bgcolor: '#ffffffff',
        color: 'black',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2">
          ©
          <Link color="inherit" href="/">
            FinTracker
          </Link>{' '}
          {new Date().getFullYear()}
          &apos;. All rights reserved.&apos;
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
