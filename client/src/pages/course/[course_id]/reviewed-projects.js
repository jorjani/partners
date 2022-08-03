import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import { NavPath } from "src/components/nav-path";
import { SkillSelector } from "src/components/skills-qualifications/skill-selector";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

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

const ReviewedProjects = () => {
  const [skillList, setSkillList] = useState([]);
  const [search, setSearch] = useState("");
  const getCourseFromURL = () => {
    const url = window.location.href;
    const courseId = url.split("/")[4];
    return courseId;
  };
  useEffect(() => {
    console.log(skillList);
  }, [skillList]);
  return (
    <>
      <Head>
        <title>Reviewed Projects | Athena</title>
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
                Reviewed Projects
              </Typography>
            </Grid>
            <Grid item mr={3} lg={12} sm={12} xl={12} xs={12}>
              <Search onChange={(e) => setSearch(e.target.value)}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
              </Search>
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
ReviewedProjects.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ReviewedProjects;
