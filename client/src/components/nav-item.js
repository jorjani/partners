import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Collapse, ListItem, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const NavItem = (props) => {
  const { href, icon, title, collapse, children, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;
  const [open, setOpen] = useState(false);
  return (
    collapse ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
        >
          <ListItemIcon>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={title} />

        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children.map((item) => (
            <ListItem
              disableGutters
              sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                px: 2
              }}
              {...others}
            >
              <NextLink
                href={item.href}
                passHref
              >
                <Button
                  component="a"
                  startIcon={item.icon}
                  disableRipple
                  sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    color: active ? 'secondary.main' : 'neutral.300',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                      color: active ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255, 0.08)'
                    }
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    {item.title}
                  </Box>
                </Button>
              </NextLink>
            </ListItem>
          ))}
        </Collapse>
      </>
    ) : (
      <ListItem
        disableGutters
        sx={{
          display: 'flex',
          mb: 0.5,
          py: 0,
          px: 2
        }}
        {...others}
      >
        <NextLink
          href={href}
          passHref
        >
          <Button
            component="a"
            startIcon={icon ? icon : null}
            disableRipple
            sx={{
              backgroundColor: active && 'rgba(255,255,255, 0.08)',
              borderRadius: 1,
              color: active ? 'secondary.main' : 'neutral.300',
              fontWeight: active && 'fontWeightBold',
              justifyContent: 'flex-start',
              px: 3,
              textAlign: 'left',
              textTransform: 'none',
              width: '100%',
              '& .MuiButton-startIcon': {
                color: active ? 'secondary.main' : 'neutral.400'
              },
              '&:hover': {
                backgroundColor: 'rgba(255,255,255, 0.08)'
              }
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              {title}
            </Box>
          </Button>
        </NextLink>
      </ListItem>
    )


  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  collapse: PropTypes.bool,
  children: PropTypes.array,
};

