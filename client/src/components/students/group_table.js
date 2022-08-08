import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Axios from "axios";
import UserContext from "src/context/UserContext";
import IterationsContext from "src/context/IterationsContext";
import Swal from "sweetalert2";
import { useContext, useEffect } from "react";

const GroupsTable = (props) => {
  const { userData } = useContext(UserContext);
  const { iterations, setIterations } = useContext(IterationsContext);
  const getCourseFromURL = () => {
    const url = window.location.href;
    const courseId = url.split('/')[4];
    return courseId;
  }
  const userInGroup = (group) => {
    let user = userData.user;
    if (!user) {
      return false;
    }
    //see if user is in group members
    if (group.members.length > 0) {
      for (let i = 0; i < group.members.length; i++) {
        if (group.members[i]._id == user._id) {
          return true;
        }
      }
    }
    return false;
  }
  const joinGroup = (group) => {
    console.log(userData)
    if (!userData.user) {
      Swal.fire({
        title: "You must be logged in to join a group",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.value) {
          window.location.href = "/login";
        }
      }).catch(err => {
        console.log(err);
      }
      );
    } else {
      Axios.post(`/api/iterations/${getCourseFromURL()}/groups/${group._id}/join`, userData.user).then(res => {
        setIterations(res.data);
        Swal.fire({
          title: "Success!",
          text: "You have successfully joined the group!",
          icon: "success",
          confirmButtonText: "Cool"
        });
      }).catch(err => {
        console.log(err)
        if(err.response){
          Swal.fire({
            title: "Error!",
            text: err.response.data,
            icon: "error",
            confirmButtonText: "Cool"
          });
        }else{
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "Cool"
          });
        }
        
      });
    }
  }
  const leaveGroup = (group) => {
    Axios.post(`/api/iterations/${getCourseFromURL()}/groups/${group._id}/leave`, userData.user).then(res => {
      setIterations(res.data);
      Swal.fire({
        title: "Success!",
        text: "You have successfully left the group!",
        icon: "success",
        confirmButtonText: "Cool"
      });
    }).catch(err => {
      console.log(err)
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Cool"
      });
    });
  }
  return (
    <>
      {props.groups.map((row, idx) => (
        <>
          <Accordion key={idx}
stayOpen>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              // aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container
spacing={3}>
                <Grid item
lg={9}
sm={9}
xl={9}
xs={9}>
                  <Typography>{row.group_name}</Typography>
                </Grid>
                {
                  userInGroup(row) ? (
                    <Grid item
lg={3}
sm={3}
xl={3}
xs={3}>
                      <Button variant="contained"
onClick={() => leaveGroup(row)}>Leave</Button>
                    </Grid>
                  ) : (
                    <Grid item
lg={3}
sm={3}
xl={3}
xs={3}>
                      <Button variant="contained"
onClick={() => joinGroup(row)}>Join</Button>
                    </Grid>
                  )
                }
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {row.members.map((member, idx) => (
                  <Typography key={idx}>{member.first_name + " " + member.last_name}</Typography>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
};

export default GroupsTable;