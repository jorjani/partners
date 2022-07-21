import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

export const NavPath = (props) => {
  const router = useRouter();
  const generatePath = () => {
    if (typeof window !== "undefined") {
      let pathname = window.location.pathname;
      let lst = pathname.split('/');
      let path = '/';
      console.log(lst)
      console.log(pathname)
      for (let i = 0; i < lst.length; i++) {
        if (lst[i] !== '' && i < lst.length - 1) {
          path += wordFormat(lst[i]) + '/';
        } else if (i === lst.length - 1) {
          path += wordFormat(lst[i]);
        }
      }
      return path;
    }

  }
  const wordFormat = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <Grid
      container
      spacing={3}
      sx={{ justifyContent: 'space-between' }}
    >
      <Grid item>

        <Typography
          color="textPrimary"
          variant="subtitle"
        >
          <HomeIcon sx={{ fontSize: 15 }} /> {generatePath()}
        </Typography>
      </Grid>
    </Grid>
  );
};

