import { Table, TableHead, TableRow, TableBody, TableCell, Typography, TableContainer, Paper } from "@mui/material";
import NextLink from "next/link";
import { useState, useEffect, useContext } from "react";
import IterationsContext from "src/context/IterationsContext";
const ProjectsTable = (props) => {
  const { iterations } = useContext(IterationsContext);
  const getCourseIdFromURL = () => {
    const url = window.location.href;
    return url.split("/")[4];
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}
          aria-label="simple table">
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
              <NextLink href={`/course/${getCourseIdFromURL()}/project/${row._id}/overview`} passHref>
                <TableRow
                  hover
                  key={idx + 1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th"
                    scope="row">
                    {row.timestamp}
                  </TableCell>
                  <TableCell component="th"
                    scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th"
                    scope="row">
                    {row.organization}
                  </TableCell>
                  <TableCell component="th"
                    scope="row">
                    {row.status}
                  </TableCell>
                  <TableCell component="th"
                    scope="row">
                    {row.profile}
                  </TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                </TableRow>
              </NextLink>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProjectsTable;