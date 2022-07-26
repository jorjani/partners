import Head from 'next/head';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { CustomerListToolbar } from '../../../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { NavPath } from 'src/components/nav-path';
import { Form } from 'src/components/course-overview/form';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useState } from 'react';

const ProposalInvitation = () => {
  const [editable, setEditable] = useState(false);
  const formAction = () => {
    if(editable) {
      console.log('save');
      setEditable(false);
    } else {
      console.log('edit');
      setEditable(true);
    }
  }
  const invitePartners = () => {
    console.log("invite partners")
  }
  return (
    <>
      <Head>
        <title>
          Proposal Invitation | Athena
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
              lg={4}
              sm={4}
              xl={4}
              xs={4}
            >
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Proposal Invitation
              </Typography>
            </Grid>
            <Grid
              item
              mr={3}
              lg={1}
              sm={2}
              xl={2}
              xs={2}
            >
              <Button variant="outlined" href="#outlined-buttons" startIcon={!editable ? (<EditIcon />): (<SaveIcon />)} onClick={() => formAction()}>
                {!editable ? "Edit" : "Save"}
              </Button>
          </Grid>
          <Grid
            item
            lg={2}
            sm={2}
            xl={2}
            xs={2}
          >
            <Button variant="contained" href="#outlined-buttons" startIcon={<ForwardToInboxIcon />} onClick={() => invitePartners()}>
              Invite Partners
            </Button>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Form editable={editable} />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  )
}
ProposalInvitation.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProposalInvitation;
