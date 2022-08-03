import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useState, useEffect } from "react";
function createData(name, category) {
  return { name, category };
}
const rows = [
  createData(1, "Some experience/coursework"),
  createData(2, "Limited working experience"),
  createData(3, "Completed a small project"),
  createData(4, "Up to 1 year of experience"),
  createData(5, "More than 1 year of experience"),
];
export const SkillSelector = (props) => {
  const [initialOptions, setInitialOptions] = useState([{ label: "Python", value: 5 }]);
  const [options, setOptions] = useState(props.list);
  const [input1, setInput1] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(1);
  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    props.setList(selectedOption);
    setOptions(selectedOption);
  };
  const handleCreate = (inputValue) => {
    let newOption = { label: inputValue, value: selectedSkill };
    setOptions([...options, newOption]);
    setInput1(newOption);
  };
  const handleDelete = (selectedOption) => {
    let newList = options.filter((option) => option.label !== selectedOption);
    console.log(selectedOption);
    console.log(newList);
    setOptions(newList);
  };
  const upperCase = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
  useEffect(() => {
    console.log(options);
  });
  return (
    <Grid container spacing={3}>
      <Grid
        item
        lg={12}
        sm={12}
        xl={12}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CreatableSelect
          isClearable
          isMulti
          // onChange={handleChange}
          onCreateOption={handleCreate}
          options={initialOptions}
        />
      </Grid>
      <Grid
        item
        lg={12}
        sm={12}
        xl={12}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {options.map((skill, index) => {
            return (
              <Chip
                key={index}
                label={upperCase(skill.label) + " | " + skill.value}
                onDelete={handleDelete}
              />
            );
          })}
        </Paper>
      </Grid>
      <Grid
        item
        lg={12}
        sm={12}
        xl={12}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="textPrimary" variant="p">
                    Rating System (click row to select)
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  hover
                  selected={selectedSkill === idx + 1}
                  key={idx + 1}
                  onClick={() => setSelectedSkill(idx + 1)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
