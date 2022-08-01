import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { UserInfo } from "../components/dashboard/user-info";
import { DashboardLayout } from "../components/dashboard-layout";
import { CourseViewer } from "../components/dashboard/course-viewer";
import { NavPath } from "src/components/nav-path";

const Dashboard = () => (
  <>
    <Head>
      <title>Dashboard | Athena</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <NavPath />
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography color="textPrimary" variant="h4">
              Dashboard
            </Typography>
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <UserInfo />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <CourseViewer />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
