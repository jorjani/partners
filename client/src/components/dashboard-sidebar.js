import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Typography, useMediaQuery, Container, Grid } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Selector as SelectorIcon } from "../icons/selector";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import IterationsContext from "src/context/IterationsContext";
import UserContext from "src/context/UserContext";

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const [items, setItems] = useState([
    {
      href: "/dashboard",
      icon: <ChartBarIcon fontSize="small" />,
      title: "Dashboard",
      collapse: false,
    },
  ]);
  const { iterations } = useContext(IterationsContext);
  const { userData } = useContext(UserContext);
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );
  useEffect(() => {
    console.log(userData)
    let curItems = items;
    let curIterationNames = iterations.map((iteration) => iteration.name);
    for (let i = 0; i < iterations.length; i++) {
      // if the iteration is not in the items, add it
      if (!curItems.find((item) => item.title === curIterationNames[i])) {
        // Here we restrict user roles
        if (userData.type == "student") {
          curItems.push({
            href: `/course/${iterations[i].name}`,
            title: iterations[i].name,
            collapse: true,
            children: [
              {
                href: `/course/${iterations[i]._id}/overview`,
                title: "Course Overview",
              },
              {
                href: `/course/${iterations[i]._id}/student-profile`,
                title: "Student Profile",
              },
              {
                href: `/course/${iterations[i]._id}/recieved-projects`,
                title: "Recieved Projects",
              },
              {
                href: `/course/${iterations[i]._id}/published-projects`,
                title: "Published Projects",
              },
            ],
          });
        } else if (userData.type == "partner") {
          curItems.push({
            href: `/course/${iterations[i].name}`,
            title: iterations[i].name,
            collapse: true,
            children: [
              {
                href: `/course/${iterations[i]._id}/overview`,
                title: "Course Overview",
              },
              {
                href: `/course/${iterations[i]._id}/skills-qualifications`,
                title: "Skills & Qualifications",
              },
              {
                href: `/course/${iterations[i]._id}/recieved-projects`,
                title: "Recieved Projects",
              },
              {
                href: `/course/${iterations[i]._id}/students`,
                title: "Students",
              },
              {
                href: `/course/${iterations[i]._id}/published-projects`,
                title: "Published Projects",
              },
            ],
          });
        } else if (userData.type == "management") {
          curItems.push({
            href: `/course/${iterations[i].name}`,
            title: iterations[i].name,
            collapse: true,
            children: [
              {
                href: `/course/${iterations[i]._id}/overview`,
                title: "Course Overview",
              },
              {
                href: `/course/${iterations[i]._id}/skills-qualifications`,
                title: "Skills & Qualifications",
              },
              {
                href: `/course/${iterations[i]._id}/recieved-projects`,
                title: "Recieved Projects",
              },
              {
                href: `/course/${iterations[i]._id}/students`,
                title: "Students",
              },
              {
                href: `/course/${iterations[i]._id}/published-projects`,
                title: "Published Projects",
              },
            ],
          });
        } else {
          curItems.push({
            href: `/course/${iterations[i].name}`,
            title: iterations[i].name,
            collapse: true,
            children: [
              {
                href: `/course/${iterations[i]._id}/overview`,
                title: "Course Overview",
              },
              {
                href: `/course/${iterations[i]._id}/published-projects`,
                title: "Published Projects",
              },
            ],
          });
        }
      }
    }
    setItems(curItems);
  }, [iterations, userData.type]);
  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/">
              <Container maxWidth={false}>
                <Grid container spacing={3}>
                  <Grid item lg={3} sm={3} xl={3} xs={3}>
                    <Logo
                      sx={{
                        height: 42,
                        width: 42,
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={6}
                    sx={{
                      marginTop: "8px",
                    }}
                  >
                    <Typography color="white" variant="title">
                      ATHENA
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Acme Inc
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your tier : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              href={item.href}
              icon={item.icon}
              title={item.title}
              children={item.children ? item.children : []}
              collapse={item.collapse}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
