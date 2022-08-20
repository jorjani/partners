import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, FormControlLabel, Checkbox, Select, MenuItem, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { HomepageLayout } from 'src/components/homepage-layout';
import Axios from 'axios';
import AuthEnforce from 'src/enforce/AuthEnforce';

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userType: 'student',
      email: '',
      password: '',
      passwordCheck: '',
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup
        .string()
        .max(20)
        .required(
          'First Name is required'),
      lastName: Yup
        .string()
        .max(20)
        .required(
          'Last Name is required'),
      userType: Yup
        .string()
        .required(
          'User Type is required'),
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255)
        .required(
          'Password is required'),
      passwordCheck: Yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255)
        .required(
          'Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup
        .bool()
        .oneOf([true], 'Accept Terms & Conditions is required')
    }),
    onSubmit: (fields) => {
      Axios.post('http://localhost:5000/api/auth/register', fields)
        .then(res => {
          router.push('/');
        }).catch(err => {
          console.log(err);
        });
    }
  });

  return (
    <>
      <HomepageLayout>
        <Head>
          <title>Register | Athena</title>
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
                  Create an Account
                </Typography>
              </Box>
              <Grid
                container
                spacing={3}
              >
              </Grid>
              <Box
                sx={{
                  pb: 1,
                  pt: 1
                }}
              >
              </Box>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                    fullWidth
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="firstName"
                    value={formik.values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                    fullWidth
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="lastName"
                    value={formik.values.lastName}
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
                    select
                    labelId="user-type-select"
                    value={formik.values.userType}
                    onChange={formik.handleChange}
                    fullWidth
                    label="User Type"
                    error={Boolean(formik.touched.userType && formik.errors.userType)}
                    helperText={formik.touched.userType && formik.errors.userType}
                  >
                    <MenuItem value={'student'}>I am a student</MenuItem>
                    <MenuItem value={'partner'}>I am a partner</MenuItem>
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
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
                <Grid
                  item
                  xs={12}
                >
                  <TextField
                    error={Boolean(formik.touched.passwordCheck && formik.errors.passwordCheck)}
                    fullWidth
                    helperText={formik.touched.passwordCheck && formik.errors.passwordCheck}
                    label="Confirm Password"
                    margin="normal"
                    name="passwordCheck"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.passwordCheck}
                    variant="outlined"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                >
                  <FormControlLabel
                    value={formik.values.terms}
                    error={Boolean(formik.touched.terms && formik.errors.terms)}
                    helperText={formik.touched.terms && formik.errors.terms}
                    name="terms"
                    onChange={formik.handleChange}
                    control={<Checkbox />}
                    label="I agree to terms & conditions"
                    labelPlacement="end"
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
                  Create Account
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Already have an account?
                {' '}
                <NextLink
                  href="/login"
                >
                  <Link
                    to="/login"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    Sign In
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

export default Register;
