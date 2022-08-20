import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Github as GithubIcon } from '../icons/github';
import { Google as GoogleIcon } from '../icons/google';
import { HomepageLayout } from 'src/components/homepage-layout';
import Axios from "axios";
import UserContext from 'src/context/UserContext';
import { useContext } from 'react';
import AuthEnforce from 'src/enforce/AuthEnforce';

const Login = () => {
  const router = useRouter();
  const { setUserData } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      userType: 'student'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      userType: Yup
        .string()
        .required(
          'User Type is required'),
    }),
    onSubmit: (fields, { setSubmitting }) => {
      console.log(fields);
      Axios.post('http://localhost:5000/api/auth/login', fields)
        .then(res => {
          localStorage.setItem("auth-token", res.data.token);
          setUserData(res.data);
          router.push('/dashboard');
        }).catch(err => {
          setSubmitting(false);
          console.log(err);
        });
    }}
  );

  return (
    <>
      <HomepageLayout>
        <Head>
          <title>Login | Athena</title>
        </Head>
        <Box
          component="main"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: 1,
            minHeight: '100%'
          }}
        >
          <Container maxWidth="sm">
            <AuthEnforce />
            <NextLink
              href="/"
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowBackIcon fontSize="small" />}
              >
                Dashboard
              </Button>
            </NextLink>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3, textAlign: 'center' }}>
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use your credentials to access your account
                </Typography>
              </Box>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Button
                    sx={{
                      backgroundColor: '#424242'
                    }}
                    fullWidth
                    startIcon={<GithubIcon />}
                    onClick={formik.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                    Login with Github
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Button
                    fullWidth
                    color="error"
                    startIcon={<GoogleIcon />}
                    onClick={formik.handleSubmit}
                    size="large"
                    variant="contained"
                  >
                    Login with Google
                  </Button>
                </Grid>
              </Grid>
              <Box
                sx={{
                  pb: 3,
                  pt: 3
                }}
              >
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography>
              </Box>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <TextField
                    select
                    labelId="user-type-select"
                    value={formik.values.userType}
                    onChange={formik.handleChange}
                    fullWidth
                    label="User Type"
                    name="userType"
                    error={Boolean(formik.touched.userType && formik.errors.userType)}
                    helperText={formik.touched.userType && formik.errors.userType}
                  >
                    <MenuItem value={'student'}>I am a student</MenuItem>
                    <MenuItem value={'partner'}>I am a partner</MenuItem>
                    <MenuItem value={'management'}>I am an educator</MenuItem>
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <TextField
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: 'center'
                  }}
                >
                  <TextField
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Don&apos;t have an account?
                {' '}
                <NextLink
                  href="/register"
                >
                  <Link
                    to="/register"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    Sign Up
                  </Link>
                </NextLink>
              </Typography>
            </form>
          </Container>
        </Box>
      </HomepageLayout>
    </>
  );
};

export default Login;
