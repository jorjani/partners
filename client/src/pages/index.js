import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { UserInfo } from "../components/dashboard/user-info";
import { HomepageLayout } from "../components/homepage-layout";
import { CourseViewer } from "../components/dashboard/course-viewer";
import { NavPath } from "src/components/nav-path";

const Home = () => (
  <>
    <Head>
      <title>Homepage | Athena</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Typography color="textPrimary" variant="h4">
              Athena Homepage
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Home.getLayout = (page) => <HomepageLayout>{page}</HomepageLayout>;

export default Home;
