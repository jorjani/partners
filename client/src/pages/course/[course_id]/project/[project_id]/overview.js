import Head from "next/head";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { DashboardLayout } from "../../../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { Form } from "src/components/course-overview/form";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import AuthEnforce from "src/enforce/AuthEnforce";
import IterationsContext from 'src/context/IterationsContext';
import UserContext from "src/context/UserContext";
const Project = () => {
  const [editable, setEditable] = useState(false);
  const { iterations } = useContext(IterationsContext);
  const { userData } = useContext(UserContext);
  const formAction = () => {
    if (editable) {
      setEditable(false);
    } else {
      setEditable(true);
    }
  };
  const getCourseFromURL = () => {
    const url = window.location.href;
    const courseId = url.split("/")[4];
    for (let i = 0; i < iterations.length; i++) {
      if (iterations[i]._id === courseId) {
        return iterations[i].name;
      }
    }
    return "";
  };
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
  const invitePartners = () => {
    Swal.fire({
      title: `Invite Partners to ${getCourseFromURL().toUpperCase()}`,
      html: `
      <input type="text" id="org-info" class="swal2-input" placeholder="Organization Info">
      <input type="text" id="email" class="swal2-input" placeholder="Email">
      <input type="text" id="name" class="swal2-input" placeholder="Name">
      <input type="text" id="info" class="swal2-input" placeholder="Organization Affiliation">`,
      cancelButtonText: "Cancel",
      confirmButtonText: "Invite",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const orgInfo = Swal.getPopup().querySelector("#org-info").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const name = Swal.getPopup().querySelector("#name").value;
        const info = Swal.getPopup().querySelector("#info").value;
        let validationMessage = "";
        if (!orgInfo) {
          validationMessage += "Organization Info is required. ";
        }
        if (!validateEmail(email)) {
          validationMessage += "Email address is not valid. ";
        }
        if (!name) {
          validationMessage += "Name is required. ";
        }
        if (!info) {
          validationMessage += "Affiliation Info is required. ";
        }
        if (validationMessage !== "") {
          Swal.showValidationMessage(validationMessage);
        }
        return { email: email, subject: subject, message: message };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let invitationInfo = result.value;
        Swal.fire("", "Your invitation has been sent.", "success");
      }
    });
  };
  const inviteStudents = () => {
    Swal.fire({
      title: `Invite Students to ${getCourseFromURL().toUpperCase()}`,
      html: `Send via Email
      <input type="text" id="email" class="swal2-input" placeholder="Email">
      <input type="text" id="subject" class="swal2-input" placeholder="Subject">
      <input type="text" id="message" class="swal2-input" placeholder="Message">`,
      cancelButtonText: "Cancel",
      confirmButtonText: "Invite",
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector("#email").value;
        const subject = Swal.getPopup().querySelector("#subject").value;
        const message = Swal.getPopup().querySelector("#message").value;
        let validationMessage = "";
        if (!validateEmail(email)) {
          validationMessage += "Email address is not valid. ";
        }
        if (!subject) {
          validationMessage += "Subject is required. ";
        }
        if (!message) {
          validationMessage += "Message is required. ";
        }
        if (validationMessage !== "") {
          Swal.showValidationMessage(validationMessage);
        }
        return { email: email, subject: subject, message: message };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        let userInfo = result.value;
        Swal.fire("", "Your invitation has been sent.", "success");
      }
    });
  };
  return (
    <>
      <Head>
        <title>{getProjectFromURL()} | Athena</title>
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
            {userData.type === 'management' ? (
              <>
                <Grid item
                  lg={4}
                  sm={4}
                  xl={4}
                  xs={4}>
                  <Typography color="textPrimary"
                    variant="h4">
                    {getProjectFromURL()}
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
                    href="#outlined-buttons"
                    startIcon={!editable ? <EditIcon /> : <SaveIcon />}
                    onClick={() => formAction()}
                  >
                    {!editable ? "Edit" : "Save"}
                  </Button>
                </Grid>
                <Grid item
                  mr={5}
                  lg={2}
                  sm={2}
                  xl={2}
                  xs={2}>
                  <Button
                    variant="contained"
                    startIcon={<ForwardToInboxIcon />}
                    onClick={() => invitePartners()}
                  >
                    Invite Partners
                  </Button>
                </Grid>
                <Grid item
                  lg={2}
                  sm={2}
                  xl={2}
                  xs={2}>
                  <Button
                    variant="contained"
                    startIcon={<ForwardToInboxIcon />}
                    onClick={() => inviteStudents()}
                  >
                    Invite Students
                  </Button>
                </Grid>
              </>
            ) : (<></>)}
            <Grid item
              lg={12}
              sm={12}
              xl={12}
              xs={12}>
              <Form editable={editable} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Project.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Project;
