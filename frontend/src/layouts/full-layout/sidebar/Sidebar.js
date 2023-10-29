import React, { useState, useContext } from "react";
import { useLocation } from "react-router";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { SidebarWidth } from "@assets/global/Theme-variable";
import createMenuItems from "./Menuitems";
import Scrollbar from "@components/custom-scroll/Scrollbar";
import logo from "@images/logos/long_logo.png";
import { UserContext } from "@context/UserContext";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const rootPath = `/${pathname.split("/")[1]}`;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const Menuitems = createMenuItems();

  const { user: userData } = useContext(UserContext);

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Scrollbar style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 2 }}>
        <Link underline="none" to="/">
          <img
            src={logo}
            alt="bg"
            style={{
              width: "80%",
              maxWidth: "812px",
              marginLeft: "16px",
            }}
          />
        </Link>
        <Box>
          <List>
            {Menuitems.map((item, index) => {
              const itemHref = item.href;
              // {/********SubHeader**********/}
              if (item.subheader === "Administración" && userData.role != 1) {
                return null;
              }
              if (
                (item.title === "Organización" || item.title === "Cursos") &&
                userData.role != 1
              ) {
                return null;
              }

              if (item.subheader) {
                return (
                  <li key={item.subheader}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="500"
                      sx={{ my: 2, mt: 4, opacity: "0.4" }}
                    >
                      {item.subheader}
                    </Typography>
                  </li>
                );
                // {/********If Sub Menu**********/}
                /* eslint no-else-return: "off" */
              } else if (item.children) {
                return (
                  <React.Fragment key={item.title}>
                    <ListItem
                      button
                      component="li"
                      onClick={() => handleClick(index)}
                      selected={rootPath === itemHref}
                      sx={{
                        mb: 1,
                        ...(itemHref.includes(rootPath) &&
                          rootPath !== "/" && {
                            color: "white",
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}!important`,
                          }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(rootPath === itemHref && {
                            color: "white",
                          }),
                        }}
                      >
                        {
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        }
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                      {index === open || rootPath === itemHref ? (
                        <FeatherIcon icon="chevron-down" size="16" />
                      ) : (
                        <FeatherIcon icon="chevron-right" size="16" />
                      )}
                    </ListItem>
                    <Collapse in={index === open} timeout="auto" unmountOnExit>
                      <List component="li" disablePadding>
                        {item.children.map((child) => {
                          return (
                            <ListItem
                              key={child.title}
                              button
                              component={NavLink}
                              to={child.href}
                              selected={pathDirect === child.href}
                              sx={{
                                mb: 1,
                                ...(pathDirect === child.href && {
                                  color: "primary.main",
                                  backgroundColor: "transparent!important",
                                }),
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  svg: { width: "14px", marginLeft: "3px" },
                                  ...(pathDirect === child.href && {
                                    color: "primary.main",
                                  }),
                                }}
                              >
                                <FeatherIcon
                                  icon={child.icon}
                                  width="20"
                                  height="20"
                                />
                              </ListItemIcon>
                              <ListItemText onClick={onSidebarClose}>
                                {child.title}
                              </ListItemText>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
                // {/********If Sub No Menu**********/}
              } else {
                if(item.title === "Mi Asistencia" && userData.role === 1){
                  return null;
                }
                return (
                  <List component="li" disablePadding key={item.title}>
                    <ListItem
                      onClick={() => handleClick(index)}
                      button
                      component={NavLink}
                      to={itemHref}
                      selected={pathDirect === itemHref}
                      sx={{
                        mb: 1,
                        ...(rootPath === itemHref && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(rootPath === itemHref && { color: "white" }),
                        }}
                      >
                        {
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        }
                      </ListItemIcon>
                      <ListItemText onClick={onSidebarClose}>
                        {item.title}
                      </ListItemText>
                    </ListItem>
                  </List>
                );
              }
            })}
          </List>
        </Box>
      </Box>
    </Scrollbar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
