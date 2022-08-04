import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const GroupsTable = (props) => {
  const joinGroup = (group) => {
    console.log(group);
  }
  return (
    <>
      {props.groups.map((row, idx) => (
        <>
          <Accordion key={idx} stayOpen>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              // aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container spacing={3}>
                <Grid item lg={9} sm={9} xl={9} xs={9}>
                  <Typography>{row.group_name}</Typography>
                </Grid>
                <Grid item lg={3} sm={3} xl={3} xs={3}>
                  <Button variant="contained" onClick={() => joinGroup(row)}>Join</Button>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {row.members.map((member, idx) => (
                  <Typography>{member.name}</Typography>
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