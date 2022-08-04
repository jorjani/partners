import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const GroupsTable = (props) => {
  return (
    <>
      {props.groups.map((row, idx) => (
        <>
          <Accordion key={idx} stayOpen>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{row.group_name}</Typography>
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