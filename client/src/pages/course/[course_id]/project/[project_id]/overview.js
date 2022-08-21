import Head from "next/head";
import { Box, Container, Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { DashboardLayout } from "../../../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { Form } from "src/components/project-overview/form";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import AuthEnforce from "src/enforce/AuthEnforce";
import IterationsContext from 'src/context/IterationsContext';
import UserContext from "src/context/UserContext";
import Axios from "axios";
import OrgInfo from "src/components/project-overview/org-info";
const Project = () => {
  const [editable, setEditable] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [project, setProject] = useState({});
  const { iterations } = useContext(IterationsContext);
  const { userData } = useContext(UserContext);
  const getProjectFromURL = () => {
    const url = window.location.href;
    const projectId = url.split("/")[6];
    const courseId = url.split("/")[4];
    for (let i = 0; i < iterations.length; i++) {
      if (iterations[i]._id === courseId) {
        for (let j = 0; j < iterations[i].projects.length; j++) {
          if (iterations[i].projects[j]._id === projectId) {
            return iterations[i].projects[j].name;
          }
        }
      }
    }
    return "";
  };
  const getProjectIdFromURL = () => {
    const url = window.location.href;
    const projectId = url.split("/")[6];
    return projectId;
  }
  const getProject = async () => {
    let project = await Axios.get(`http://localhost:5000/api/projects/${getProjectIdFromURL()}`);
    setProject(project.data);
}
  const approveProject = async () => {
    await Axios.put(`http://localhost:5000/api/projects/${getProjectIdFromURL()}/status/accepted`)
    Swal.fire({
      title: "Success",
      text: "Project has been approved",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const rejectProject = async () => {
    await Axios.put(`http://localhost:5000/api/projects/${getProjectIdFromURL()}/status/not-accepted`)
    Swal.fire({
      title: "Success",
      text: "Project has been rejected",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  useEffect(() => {
    getProject();
    setProjectName(getProjectFromURL())
    setProjectId(getProjectIdFromURL())
  }, [])
  return (
    <>
      <Head>
        <title>{projectName} | Athena</title>
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
          <Grid container
            spacing={3}>
            <Grid item
              lg={9}
              sm={9}
              xl={9}
              xs={9}>
              <NavPath />
            </Grid>
            <Grid item
              lg={4}
              sm={4}
              xl={4}
              xs={4}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary"
                    variant="h4">
                    {projectName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {userData.type === 'management' ? (
              <>

                <Grid item
                  mr={5}
                  lg={2}
                  sm={2}
                  xl={2}
                  xs={2}>
                  <Button
                    variant="contained"
                    startIcon={<CheckIcon />}
                    onClick={() => approveProject()}
                  >
                    Approve
                  </Button>
                </Grid>
                <Grid item
                  lg={2}
                  sm={2}
                  xl={2}
                  xs={2}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<BlockIcon />}
                    onClick={() => rejectProject()}
                  >
                    Reject
                  </Button>
                </Grid>
              </>
            ) : (<></>)}
            <Grid item
              lg={12}
              sm={12}
              xl={12}
              xs={12}>
              <OrgInfo project={project}/>
            </Grid>
            <Grid item
              lg={12}
              sm={12}
              xl={12}
              xs={12}>
              <Card>
                <CardContent>
                  <Form project={project} editable={editable} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Project.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Project;
