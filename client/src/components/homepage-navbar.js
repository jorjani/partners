import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import NextLink from 'next/link';
import { AppBar, Button, Box, Toolbar, Grid, Typography, Container } from '@mui/material';
import { useState } from 'react';
import { Logo } from './logo';

const HomepageNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const HomepageNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const [avatarToggle, setAvatarToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openLogin = (e) => {
    e.preventDefault();
    window.location.href = '/login';
  }
  const openRegister = (e) => {
    e.preventDefault();
    window.location.href = '/register';
  }
  const handleClick = (event) => {
    setAvatarToggle(!avatarToggle);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAvatarToggle(false);
    setAnchorEl(null);
  };
  return (
    <>
      <HomepageNavbarRoot
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 6,
            left: 0,
            px: 2,
          }}
        >
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
            >
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  lg={3}
                  sm={3}
                  xl={3}
                  xs={3}
                  mr={2}
                >
                  <Logo
                    sx={{
                      height: 42,
                      width: 42
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  sm={6}
                  xl={6}
                  xs={6}
                  sx={{
                    marginTop: '8px'
                  }}
                >
                  <Typography
                    color="black"
                    variant="title"
                  >
                    ATHENA
                  </Typography>
                </Grid>
              </Grid>
            </NextLink>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button onClick={(e) => openLogin(e)}>
              Login
            </Button>
            <Button onClick={(e) => openRegister(e)}>
              Register
            </Button>
          </Box>
        </Toolbar>
      </HomepageNavbarRoot>
    </>
  );
};