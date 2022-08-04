//create react component named table
import { Table, TableHead, TableRow, TableBody, TableCell, Typography, TableContainer, Paper } from "@mui/material";

const ProjectsTable = (props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Student Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.projects.map((row, idx) => (
              <TableRow
                hover
                // selected={selectedSkill === idx + 1}
                key={idx + 1}
                // onClick={() => setSelectedSkill(idx + 1)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.timestamp}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.organization}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.profile}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectsTable;