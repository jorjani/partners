import Head from "next/head";
import { Box, Container, Grid, Tabs, Tab, Typography } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { SkillSelector } from "src/components/skills-qualifications/skill-selector";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ProjectsTable from "src/components/reviewed-projects/table";
import Axios from "axios";
import StudentsTable from "src/components/students/table";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Students = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const [groups, setGroups] = useState([]);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const getIterationIdFromURL = () => {
    const url = window.location.href;
    const courseId = url.split("/")[4];
    return courseId;
  };
  const getStudents = () => {
    const courseId = getIterationIdFromURL();
    const url = `http://localhost:5000/users/student/iteration/${getIterationIdFromURL()}`;
    Axios.get(url).then((res) => {
      setStudents(res.data);
    });
  };
  const filterStudents = (search) => {
    const filtered = students.filter((student) => student.first_name.includes(search)).map((student) => {
      return ({
        name: student.first_name+" "+student.last_name,
        email: student.email,
        group: "None",
        profile: "pending",
      })
    });
    
    setStudentsFiltered(filtered);  
  }
  useEffect(() => {
    getStudents();
  }, []);
  useEffect(() => {
    filterStudents(search)
  }, [search, students]);
  useEffect(() => {
    console.log(studentsFiltered);
    console.log(students)
  });
  return (
    <>
      <Head>
        <title>Students | Athena</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={9} sm={9} xl={9} xs={9}>
              <NavPath />
            </Grid>
            <Grid item lg={4} sm={4} xl={4} xs={4}>
              <Typography color="textPrimary" variant="h4">
                Students
              </Typography>
            </Grid>
            <Grid item mr={3} lg={12} sm={12} xl={12} xs={12}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Students" />
                  <Tab label="Groups" />
                </Tabs>
              </Box>
              <TabPanel value={tab} index={0}>
                <Grid container spacing={3}>
                  <Grid item mr={3} lg={12} sm={12} xl={12} xs={12}>
                    <Search onChange={(e) => setSearch(e.target.value)}>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase placeholder="Search People" inputProps={{ "aria-label": "search" }} />
                    </Search>
                  </Grid>
                  <Grid item mr={3} lg={12} sm={12} xl={12} xs={12}>
                    <StudentsTable students={studentsFiltered} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                Groups division
              </TabPanel>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
Students.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Students;
