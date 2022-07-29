import Head from "next/head";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { SkillSelector } from "src/components/skills-qualifications/skill-selector";
import { useState } from "react";
import Swal from "sweetalert2";

const SkillsQualifications = () => {
  const [skillList, setSkillList] = useState([]);
  const getCourseFromURL = () => {
    const url = window.location.href;
    const courseId = url.split("/")[4];
    return courseId;
  };
  return (
    <>
      <Head>
        <title>Skills & Qualifications | Athena</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={9} sm={9} xl={9} xs={9}>
              <NavPath />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Typography color="textPrimary" variant="h4">
                Skills & Qualifications
              </Typography>
            </Grid>
            <Grid item mr={3} lg={12} sm={12} xl={12} xs={12}>
              <Typography color="textPrimary" variant="p">
                Add skills and qualifications that are relevant to your course.
              </Typography>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <SkillSelector list={[]} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
SkillsQualifications.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SkillsQualifications;
