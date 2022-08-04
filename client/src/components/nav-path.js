import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import IterationsContext from 'src/context/IterationsContext';

export const NavPath = (props) => {
  const router = useRouter();
  const { iterations } = useContext(IterationsContext);
  const generatePath = () => {
    if (typeof window !== "undefined") {
      let pathname = window.location.pathname;
      let lst = pathname.split('/');
      let path = '/';
      for (let i = 0; i < lst.length; i++) {
        let curItem = lst[i];
        for( let i = 0; i < iterations.length; i++ ) {
          if (iterations[i]._id === curItem) {
            curItem = iterations[i].name;
            break;
          }
        }
        if (lst[i] !== '' && i < lst.length - 1) {
          path += wordFormat(curItem) + '/';
        } else if (i === lst.length - 1) {
          path += wordFormat(curItem);
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
          variant="button"
        >
          <HomeIcon sx={{ fontSize: 15 }} />{generatePath()}
        </Typography>
      </Grid>
    </Grid>
  );
};

