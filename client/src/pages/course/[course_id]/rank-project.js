import Head from "next/head";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import AuthEnforce from "src/enforce/AuthEnforce";
import { ProjectRanker } from "src/components/rank-project/project-ranker";
import UserContext from "src/context/UserContext";
const RankProject = () => {
  const [projects, setProjects] = useState([]);
  const [initialProjects, setInitialProjects] = useState([]);
  const { userData } = useContext(UserContext);
  const getCourseIdFromURL = () => {
    let url = window.location.href;
    let courseId = url.split("/")[4];
    return courseId;
  }
  const getIterationProjects = async () => {
    let resp = await Axios.get(`http://localhost:5000/api/iterations/${getCourseIdFromURL()}`);
    setProjects(resp.data.projects);
    setInitialProjects(resp.data.projects);
  }
  const saveForm = async () => {
    // get array of indices representing where the projects are in the initialProjects array
    if(!userData.user){
      Swal.fire({
        title: "You must be logged in to save your rankings",
        icon: "error",
        confirmButtonText: "OK"
      }, () => {
        window.location.href = "/login";
      } )
    }
    let indices = projects.map((project) => initialProjects.findIndex((initialProject) => initialProject._id == project._id));
    let resp = await Axios.post(`http://localhost:5000/api/iterations/${getCourseIdFromURL()}/user/${userData.user._id}/rank`, {
      ranking: indices
    });
    if (resp.status === 200) {
      Swal.fire({
        title: "Success",
        text: "Your form has been saved",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  }
  useEffect(() => {
    getIterationProjects()
  }, []);
  return (
    <>
      <Head>
        <title>Rank Project | Athena</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <AuthEnforce />
          <Grid container spacing={3}>
            <Grid item lg={9} sm={9} xl={9} xs={9}>
              <NavPath />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Typography color="textPrimary" variant="h4">
                Rank Project
              </Typography>
            </Grid>
            <Grid item
                  mr={3}
                  lg={2}
                  sm={2}
                  xl={2}
                  xs={2}>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={() => saveForm()}
                  >
                    Save
                  </Button>
                </Grid>
            <Grid item mr={3} lg={12} sm={12} xl={12} xs={12}>
              <Typography color="textPrimary" variant="p">
                Drag and drop projects to indicate your group's preferences.
              </Typography>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ProjectRanker
                projects={projects}
                setProjects={setProjects}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
RankProject.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RankProject;
