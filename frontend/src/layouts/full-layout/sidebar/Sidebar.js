import React, {useEffect, useState, useContext} from 'react';
import { useLocation } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import { SidebarWidth } from '../../../assets/global/Theme-variable';
import createMenuItems from './Menuitems';
import Scrollbar from '../../../components/custom-scroll/Scrollbar';
import logo from '../../../assets/images/logos/long_logo.png';
import reporteIcon from '../../../assets/images/icons/insights.svg';
import facturaIcon from '../../../assets/images/icons/request_quote.svg';
import supportIcon from '../../../assets/images/icons/support_agent.svg';
import widgetIcon from '../../../assets/images/icons/widgets.svg';
import factoringIcon from '../../../assets/images/icons/receipt_long.svg';
import { backend_url } from '../../../config/variables';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = useState(true);
  const [paymentContract, setPaymentContract] = useState(false);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const rootPath = `/${pathname.split('/')[1]}`;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const Menuitems = createMenuItems();

  const { user: userData } = useContext(UserContext);


  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const handleClickChildren = (item) => {
    try {
      if (item.title === 'Chat') {
        Intercom('show');
      }
      if (item.new_tab === 'true') {
        const link = item.link; // get the link from the item object
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {}
  };

  const changeColor = () => {
    return { filter: 'brightness(0) invert(1)' };
  };

  const SidebarContent = (
    <Scrollbar style={{ height: 'calc(100vh - 5px)' }}>
      <Box sx={{ p: 2 }}>
        <Link underline='none' to='/'>
          <img
            src={logo}
            alt='bg'
            style={{
              width: '80%',
              maxWidth: '812px',
              marginLeft: '16px' 
            }}
          />
        </Link>
        <Box>
          <List>
            {
              Menuitems.map((item, index) => {
              const itemHref = item.href;
              // {/********SubHeader**********/}
              if(item.subheader === 'Administración' && userData.rol != 1) {
                return null;
              }
              if((item.title === 'Organización' || item.title === 'Cursos') && userData.rol != 1) {
                return null;
              }

              if (item.subheader) {
                return (
                  <li key={item.subheader}>
                    <Typography
                      variant='subtitle2'
                      fontWeight='500'
                      sx={{ my: 2, mt: 4, opacity: '0.4' }}>
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
                      component='li'
                      onClick={() => handleClick(index)}
                      selected={rootPath === itemHref}
                      sx={{
                        mb: 1,
                        ...(itemHref.includes(rootPath) &&
                          rootPath !== '/' && {
                            color: 'white',
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.main}!important`,
                          }),
                      }}>
                      <ListItemIcon
                        sx={{
                          ...(rootPath === itemHref && {
                            color: 'white',
                          }),
                        }}>
                        {item.icon === 'reporteIcon' && (
                          <img
                            src={reporteIcon}
                            alt='insight icon'
                            style={
                              pathname.includes('/report')
                                ? changeColor()
                                : null
                            }
                          />
                        )}
                        {item.icon === 'supportIcon' && (
                          <img
                            src={supportIcon}
                            alt='support icon'
                            style={
                              pathname.includes('/support')
                                ? changeColor()
                                : null
                            }
                          />
                        )}
                        {item.icon === 'facturaIcon' && (
                          <img
                            src={facturaIcon}
                            alt='facturation icon'
                            style={
                              pathname.includes('/billing')
                                ? changeColor()
                                : null
                            }
                          />
                        )}
                        {
                          <FeatherIcon
                            icon={item.icon}
                            width='20'
                            height='20'
                          />
                        }
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                      {index === open || rootPath === itemHref ? (
                        <FeatherIcon icon='chevron-down' size='16' />
                      ) : (
                        <FeatherIcon icon='chevron-right' size='16' />
                      )}
                    </ListItem>
                    <Collapse in={index === open} timeout='auto' unmountOnExit>
                      <List component='li' disablePadding>
                        {item.children.map((child) => {
                          return (
                            <ListItem
                              key={child.title}
                              button
                              component={NavLink}
                              to={child.href}
                              onClick={() => handleClickChildren(child)}
                              selected={pathDirect === child.href}
                              sx={{
                                mb: 1,
                                ...(pathDirect === child.href && {
                                  color: 'primary.main',
                                  backgroundColor: 'transparent!important',
                                }),
                              }}>
                              <ListItemIcon
                                sx={{
                                  svg: { width: '14px', marginLeft: '3px' },
                                  ...(pathDirect === child.href && {
                                    color: 'primary.main',
                                  }),
                                }}>
                                <FeatherIcon
                                  icon={child.icon}
                                  width='20'
                                  height='20'
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
                if (item.title === 'Transacciones' && !paymentContract) {
                  return null;
                }
                return (
                  <List component='li' disablePadding key={item.title}>
                    <ListItem
                      onClick={() => handleClick(index)}
                      button
                      component={NavLink}
                      to={itemHref}
                      selected={pathDirect === itemHref}
                      sx={{
                        mb: 1,
                        ...(rootPath === itemHref && {
                          color: 'white',
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}>
                      <ListItemIcon
                        sx={{
                          ...(rootPath === itemHref && { color: 'white' }),
                        }}>
                        {item.icon === 'widgetIcon' && (
                          <img
                            src={widgetIcon}
                            alt='widgets icon'
                            style={
                              rootPath === '/widgets' ? changeColor() : null
                            }
                          />
                        )}
                        {item.icon === 'factoringIcon' && (
                          <img
                            src={factoringIcon}
                            alt='factoring icon'
                            style={
                              rootPath === '/factoring' ? changeColor() : null
                            }
                          />
                        )}
                        {
                          <FeatherIcon
                            icon={item.icon}
                            width='20'
                            height='20'
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
        anchor='left'
        open={isSidebarOpen}
        variant='persistent'
        PaperProps={{
          sx: {
            width: SidebarWidth,
            border: '0 !important',
            boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)',
          },
        }}>
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor='left'
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: '0 !important',
        },
      }}
      variant='temporary'>
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
