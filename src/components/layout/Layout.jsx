import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Collapse from "@mui/material/Collapse";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaidIcon from "@mui/icons-material/Paid";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ClassIcon from "@mui/icons-material/Class";
import ColorizeIcon from "@mui/icons-material/Colorize";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

import "./layout.scss";
import { RoutesConstant } from "../../assets/constants";

const drawerWidth = 250;

const Layout = (props) => {
  const [open, setOpen] = useState(true);
  const [registration, setRegistration] = useState(false);
  const [payment, setPayment] = useState(false);
  const [isCollaps, setIsCollaps] = useState("");

  const handleDrawerHandler = () => {
    {
      setOpen(!open);
    }
    let styleName = "";
    switch (isCollaps) {
      case "":
        styleName = "show";
        break;
      case "show":
        styleName = "";
        break;
    }
    setIsCollaps(styleName);
  };

  const registrationClick = () => {
    setRegistration(!registration);
  };

  const paynebtClick = () => {
    setPayment(!payment);
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);
  const title = pathnames[0].toUpperCase();

  return (
    <div className="layout">
      <Box className="layout-box">
        <AppBar
          className={"layout-appbar" + isCollaps}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerHandler}
              edge="start"
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className="drawer"
          width={drawerWidth}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div className="layout-logo">
            <img src={require("../../images/logo.png")} alt="LOGO" />
          </div>
          <List className="layout-list">
            <Link className="layout-links" to={RoutesConstant.dashboard}>
              <ListItem key={"Dashboard"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon style={{ color: "#2192FF" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <ListItemButton
              className="layout-links"
              onClick={registrationClick}
            >
              <ListItemIcon>
                <AppRegistrationIcon style={{ color: "#2192FF" }} />
              </ListItemIcon>
              <ListItemText primary="Registration" />
              {registration ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={registration} timeout="auto" unmountOnExit>
              <Link
                className="layout-links"
                to={RoutesConstant.studentRegistration}
              >
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonAddAltIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Student" />
                  </ListItemButton>
                </List>
              </Link>

              <Link
                className="layout-links"
                to={RoutesConstant.teacherRegistration}
              >
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonAddAltIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Teacher" />
                  </ListItemButton>
                </List>
              </Link>

              <Link
                className="layout-links"
                to={RoutesConstant.staffRegistration}
              >
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonAddAltIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Staff" />
                  </ListItemButton>
                </List>
              </Link>
            </Collapse>

            <Link className="layout-links" to={RoutesConstant.categories}>
              <ListItem key={"categories"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon style={{ color: "#2192FF" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Categories"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link className="layout-links" to={RoutesConstant.halls}>
              <ListItem key={"hall"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MapsHomeWorkIcon style={{ color: "#2192FF" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Halls"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link className="layout-links" to={RoutesConstant.subjects}>
              <ListItem key={"Subjects"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MenuBookIcon style={{ color: "#2192FF" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Subjects"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <ListItemButton onClick={paynebtClick}>
              <ListItemIcon>
                <PaidIcon style={{ color: "#2192FF" }} />
              </ListItemIcon>
              <ListItemText primary="Payment" />
              {payment ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={payment} timeout="auto" unmountOnExit>
              <Link className="layout-links" to={RoutesConstant.studentPayment}>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonOutlineIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Student Payment" />
                  </ListItemButton>
                </List>
              </Link>
              <Link className="layout-links" to={RoutesConstant.teacherPayment}>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonOutlineIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Teacher Payment" />
                  </ListItemButton>
                </List>
              </Link>
              <Link className="layout-links" to={RoutesConstant.staffPayment}>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonOutlineIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Staff Payment" />
                  </ListItemButton>
                </List>
              </Link>
              <Link className="layout-links" to={RoutesConstant.otherPayment}>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PersonOutlineIcon style={{ color: "#7A0BC0" }} />
                    </ListItemIcon>
                    <ListItemText primary="Other Payment" />
                  </ListItemButton>
                </List>
              </Link>
            </Collapse>

            <Link className="layout-links" to={RoutesConstant.classes}>
              <ListItem key={"Classes"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ClassIcon style={{ color: "#2192FF" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Classes"} />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link className="layout-links" to={RoutesConstant.extraClasses}>
              <ListItem key={"extra-class"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ColorizeIcon style={{ color: "#2192FF" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Extra Classes"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <div className="layout-logout">
            <List>
              <Link className="layout-links" to={RoutesConstant.login}>
                <ListItem key={"logout"} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
        <div className={"main-render" + isCollaps}>{props.component}</div>
      </Box>
    </div>
  );
};

export default Layout;
