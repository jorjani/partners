import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CustomerListToolbar } from '../../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { NavPath } from 'src/components/nav-path';
import { Form } from 'src/components/course-overview/form';

const CourseOverview = () => (
  <>
    <Head>
      <title>
        Course Overview | Athena
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={9}
            sm={9}
            xl={9}
            xs={9}
          >
            <NavPath />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);
CourseOverview.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CourseOverview;
