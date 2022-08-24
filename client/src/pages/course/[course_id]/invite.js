import Head from "next/head";
import { Box, Container, Grid, Typography, Button, Card, CardContent, Stepper } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import AuthEnforce from "src/enforce/AuthEnforce";
import IterationsContext from 'src/context/IterationsContext';
import UserContext from "src/context/UserContext";
import Axios from "axios";
import SaveIcon from "@mui/icons-material/Save";
import Wizard from "src/components/invite/wizard";
const Invite = () => {
  const [editable, setEditable] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const { iterations } = useContext(IterationsContext);
  const { userData } = useContext(UserContext);
  const submitProject = async () => {
    await Axios.post(`http://localhost:5000/api/projects/`)
    Swal.fire({
      title: "Success",
      text: "Project has been submitted",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const instanceInfo = () => {
    //get field from url parameters
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams)
    return {
      orgInfo: queryParams.get("orgInfo"),
      email: queryParams.get("email"),
      name: queryParams.get("name"),
      role: queryParams.get("info")
    }
  }
  useEffect(() => {
    setSearchQuery(instanceInfo())
  }, [])
  return (
    <>
      <Head>
        <title>Partner Invitation | Athena</title>
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
                    Partner Invitation
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {userData.type === 'partner' ? (
              <>

                <Grid item
                  mr={5}
                  lg={2}
                  sm={2}
                  xl={2}
                  xs={2}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => submitProject()}
                  >
                    Submit
                  </Button>
                </Grid>
              </>
            ) : (<></>)}
            <Grid item
              lg={12}
              sm={12}
              xl={12}
              xs={12}>
              <Card>
                <CardContent>
                  <Typography color="textPrimary"
                    variant="h6">
                    Create an Organization on behalf of {searchQuery.orgInfo}
                  </Typography>
                  <br/>
                  <Typography color="textPrimary"
                    variant="h6">
                    You can only create a project using the account: {searchQuery.name} | {searchQuery.email}!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item
              lg={12}
              sm={12}
              xl={12}
              xs={12}>
              <Card>
                <CardContent>
                  <Wizard 
                    name={searchQuery.name}
                    email={searchQuery.email}
                    orgInfo={searchQuery.orgInfo}
                    role={searchQuery.role}
                    ref_id={userData.user._id}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Invite.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Invite;
