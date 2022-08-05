import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import CourseCard from "./course-card";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import IterationsContext from "src/context/IterationsContext";

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

export const CourseViewer = () => {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [addToggle, setAddToggle] = useState(false);
  const { iterations, setIterations } = useContext(IterationsContext);
  useEffect(() => {
    if (iterations.length !== 0) {
      setFilteredList(iterations.filter((course) => course.name.includes(search)));
    }
  }, [search, iterations]);
  const getCourses = () => {
    let res = filteredList.map((course, index) => (
      <CourseCard
        key={index}
        course_id={course._id}
        course_code={course.name}
        course_title={course.course_title}
        course_organization={course.organization}
        course_projects={course.projects.length}
      />
    ));
    res.push(
      <Grid item
ml={5}
onClick={() => addCourse()}>
        <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
      </Grid>
    );
    return res;
  };
  const addCourse = async () => {
    const { value: code } = await Swal.fire({
      title: "Join course",
      input: "text",
      inputLabel: "Your course code",
      inputPlaceholder: "Enter your course code",
    });

    if (code) {
      Swal.fire(`Entered code: ${code}`);
    }
  };
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container
spacing={3}
sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary"
gutterBottom
variant="overline">
              MY COURSES
            </Typography>
            <Search onChange={(e) => setSearch(e.target.value)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…"
inputProps={{ "aria-label": "search" }} />
            </Search>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {getCourses()}
        </Box>
      </CardContent>
    </Card>
  );
};
