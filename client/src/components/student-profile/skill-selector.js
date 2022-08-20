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
const initialOptions = [
  { label: "Python | 1", value: "python_1" },
  { label: "Python | 2", value: "python_2" },
  { label: "Python | 3", value: "python_3" },
  { label: "Python | 4", value: "python_4" },
  { label: "Python | 5", value: "python_5" },
  { label: "Java | 1", value: "java_1" },
  { label: "Java | 2", value: "java_2" },
  { label: "Java | 3", value: "java_3" },
  { label: "Java | 4", value: "java_4" },
  { label: "Java | 5", value: "java_5" },
  { label: "C | 1", value: "c_1" },
  { label: "C | 2", value: "c_2" },
  { label: "C | 3", value: "c_3" },
  { label: "C | 4", value: "c_4" },
  { label: "C | 5", value: "c_5" },
  { label: "C++ | 1", value: "cplusplus_1" },
  { label: "C++ | 2", value: "cplusplus_2" },
  { label: "C++ | 3", value: "cplusplus_3" },
  { label: "C++ | 4", value: "cplusplus_4" },
  { label: "C++ | 5", value: "cplusplus_5" },
  { label: "C# | 1", value: "csharp_1" },
  { label: "C# | 2", value: "csharp_2" },
  { label: "C# | 3", value: "csharp_3" },
  { label: "C# | 4", value: "csharp_4" },
  { label: "C# | 5", value: "csharp_5" },
  { label: "Ruby | 1", value: "ruby_1" },
  { label: "Ruby | 2", value: "ruby_2" },
  { label: "Ruby | 3", value: "ruby_3" },
  { label: "Ruby | 4", value: "ruby_4" },
  { label: "Ruby | 5", value: "ruby_5" },
  { label: "JavaScript | 1", value: "javascript_1" },
  { label: "JavaScript | 2", value: "javascript_2" },
  { label: "JavaScript | 3", value: "javascript_3" },
  { label: "JavaScript | 4", value: "javascript_4" },
  { label: "JavaScript | 5", value: "javascript_5" },
  { label: "HTML | 1", value: "html_1" },
  { label: "HTML | 2", value: "html_2" },
  { label: "HTML | 3", value: "html_3" },
  { label: "HTML | 4", value: "html_4" },
  { label: "HTML | 5", value: "html_5" },
  { label: "CSS | 1", value: "css_1" },
  { label: "CSS | 2", value: "css_2" },
  { label: "CSS | 3", value: "css_3" },
  { label: "CSS | 4", value: "css_4" },
  { label: "CSS | 5", value: "css_5" },
  { label: "SQL | 1", value: "sql_1" },
  { label: "SQL | 2", value: "sql_2" },
  { label: "SQL | 3", value: "sql_3" },
  { label: "SQL | 4", value: "sql_4" },
  { label: "SQL | 5", value: "sql_5" },
  { label: "DevOps | 1", value: "devops_1" },
  { label: "DevOps | 2", value: "devops_2" },
  { label: "DevOps | 3", value: "devops_3" },
  { label: "DevOps | 4", value: "devops_4" },
  { label: "DevOps | 5", value: "devops_5" },
  { label: "AWS | 1", value: "aws_1" },
  { label: "AWS | 2", value: "aws_2" },
  { label: "AWS | 3", value: "aws_3" },
  { label: "AWS | 4", value: "aws_4" },
  { label: "AWS | 5", value: "aws_5" },
  { label: "Azure | 1", value: "azure_1" },
  { label: "Azure | 2", value: "azure_2" },
  { label: "Azure | 3", value: "azure_3" },
  { label: "Azure | 4", value: "azure_4" },
  { label: "Azure | 5", value: "azure_5" },
  { label: "Web Programming | 1", value: "web_programming_1" },
  { label: "Web Programming | 2", value: "web_programming_2" },
  { label: "Web Programming | 3", value: "web_programming_3" },
  { label: "Web Programming | 4", value: "web_programming_4" },
  { label: "Web Programming | 5", value: "web_programming_5" },
  { label: "Mobile Programming | 1", value: "mobile_programming_1" },
  { label: "Mobile Programming | 2", value: "mobile_programming_2" },
  { label: "Mobile Programming | 3", value: "mobile_programming_3" },
  { label: "Mobile Programming | 4", value: "mobile_programming_4" },
  { label: "Mobile Programming | 5", value: "mobile_programming_5" },
  { label: "Data Science | 1", value: "data_science_1" },
  { label: "Data Science | 2", value: "data_science_2" },
  { label: "Data Science | 3", value: "data_science_3" },
  { label: "Data Science | 4", value: "data_science_4" },
  { label: "Data Science | 5", value: "data_science_5" },
  { label: "Machine Learning | 1", value: "machine_learning_1" },
  { label: "Machine Learning | 2", value: "machine_learning_2" },
  { label: "Machine Learning | 3", value: "machine_learning_3" },
  { label: "Machine Learning | 4", value: "machine_learning_4" },
  { label: "Machine Learning | 5", value: "machine_learning_5" },
];
export const SkillSelector = (props) => {
  const [options, setOptions] = useState(props.list);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [input1, setInput1] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(1);
  const handleChange = (selectedOption) => {
    //selectedOption is current list of selected options from select component
    console.log(selectedOption);
    setSelectedOptions(selectedOption);
  };
  const handleCreate = (inputValue) => {
    let newOption = {
      label: upperCase(inputValue) + " | " + selectedSkill,
      value: inputValue.toLowerCase() + "_" + selectedSkill,
    };
    if (!options.find((option) => option.value === newOption.value)) {
      setOptions([newOption, ...options]);
      setInput1(newOption);
    }
  };
  const handleDelete = (selectedOption) => {
    let newList = options.filter((option) => option.label !== selectedOption);
    setOptions(newList);
  };
  const upperCase = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };
  useEffect(() => {
    setOptions(initialOptions);
  }, []);
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
        <Select
          isMulti
          placeholder="Skill (ex. Web Programming)"
          controlShouldRenderValue={false}
          isClearable={false}
          onChange={handleChange}
          options={options}
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
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
      >
        {selectedOptions.map((skill, index) => {
          return (
            <Chip
              key={index}
              label={skill.label}
              onDelete={handleDelete}
              sx={{
                m: 0.5,
              }}
            />
          );
        })}
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
