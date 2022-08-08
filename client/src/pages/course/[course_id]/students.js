import Head from "next/head";
import { Box, Container, Grid, Tabs, Tab, Typography } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { SkillSelector } from "src/components/skills-qualifications/skill-selector";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ProjectsTable from "src/components/reviewed-projects/table";
import Axios from "axios";
import StudentsTable from "src/components/students/student_table";
import GroupsTable from "src/components/students/group_table";
import IterationsContext from "src/context/IterationsContext";
import AuthEnforce from "src/enforce/AuthEnforce";

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
    // vertical padding + font size from searchPeopleIcon
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
  const [searchPeople, setSearchPeople] = useState("");
  const [searchGroups, setSearchGroups] = useState("");
  const [students, setStudents] = useState([]);
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupsFiltered, setGroupsFiltered] = useState([]);
  const {iterations} = useContext(IterationsContext);
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
    const url = `/api/users/student/iteration/${courseId}`;
    Axios.get(url).then((res) => {
      setStudents(res.data);
    });
  };
  const getGroups = () => {
    const courseId = getIterationIdFromURL();
    const url = `/api/iterations/${courseId}/groups`;
    Axios.get(url).then((res) => {
      setGroups(res.data);
    }
    );
  }
  const filterStudents = (searchPeople) => {
    const filtered = students.filter((student) => student.first_name.includes(searchPeople)).map((student) => {
      return ({
        name: student.first_name+" "+student.last_name,
        email: student.email,
        group: "None",
        profile: "pending",
      })
    });
    
    setStudentsFiltered(filtered);  
  }
  const filterGroups = (searchGroup) => {
    const filtered = groups.filter((group) => group.group_name.includes(searchGroup)).map((group) => {
      return (group)
    });
    
    setGroupsFiltered(filtered);  
  }
  useEffect(() => {
    getStudents();
    getGroups();
  }, [iterations]);
  useEffect(() => {
    filterStudents(searchPeople)
  }, [searchPeople, students]);
  useEffect(() => {
    filterGroups(searchGroups)
  }, [searchGroups, groups]);
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
          <AuthEnforce />
          <Grid container
spacing={3}>
            <Grid item
lg={9}
sm={9}
xl={9}
xs={9}>
              <NavPath />
            </Grid>
            <Grid item
lg={4}
sm={4}
xl={4}
xs={4}>
              <Typography color="textPrimary"
variant="h4">
                Students
              </Typography>
            </Grid>
            <Grid item
mr={3}
lg={12}
sm={12}
xl={12}
xs={12}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab}
onChange={handleChange}
aria-label="basic tabs example">
                  <Tab label="Students" />
                  <Tab label="Groups" />
                </Tabs>
              </Box>
              <TabPanel value={tab}
index={0}>
                <Grid container
spacing={3}>
                  <Grid item
mr={3}
lg={12}
sm={12}
xl={12}
xs={12}>
                    <Search onChange={(e) => setSearchPeople(e.target.value)}>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase placeholder="Search People"
inputProps={{ "aria-label": "searchPeople" }} />
                    </Search>
                  </Grid>
                  <Grid item
mr={3}
lg={12}
sm={12}
xl={12}
xs={12}>
                    <StudentsTable students={studentsFiltered} />
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={tab}
index={1}>
                <Grid container
spacing={3}>
                  <Grid item
mr={3}
lg={12}
sm={12}
xl={12}
xs={12}>
                    <Search onChange={(e) => setSearchGroups(e.target.value)}>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase placeholder="Search Groups"
inputProps={{ "aria-label": "searchGroups" }} />
                    </Search>
                  </Grid>
                  <Grid item
mr={3}
lg={12}
sm={12}
xl={12}
xs={12}>
                    <GroupsTable groups={groupsFiltered} />
                  </Grid>
                </Grid>
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
