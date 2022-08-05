import { Table, TableHead, TableRow, TableBody, TableCell, Typography, TableContainer, Paper } from "@mui/material";

const StudentsTable = (props) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}
aria-label="simple table">
          <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Group</TableCell>
                <TableCell>Profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.students.map((row, idx) => (
              <TableRow
                hover
                // selected={selectedSkill === idx + 1}
                key={idx + 1}
                // onClick={() => setSelectedSkill(idx + 1)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th"
scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th"
scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th"
scope="row">
                  {row.group}
                </TableCell>
                <TableCell component="th"
scope="row">
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

export default StudentsTable;