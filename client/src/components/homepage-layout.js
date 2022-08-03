import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HomepageNavbar } from './homepage-navbar';

const HomepageLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
}));

export const HomepageLayout = (props) => {
  const { children } = props;
  return (
    <>
      <HomepageLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            marginTop: 5,
          }}
        >
          {children}
        </Box>
      </HomepageLayoutRoot>
      <HomepageNavbar onSidebarOpen={() => setSidebarOpen(true)} />
    </>
  );
};
