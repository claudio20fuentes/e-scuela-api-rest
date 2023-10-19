import React, { useState, useContext, useEffect } from 'react';
import {
  experimentalStyled,
  useMediaQuery,
  Container,
  Box,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Footer from './footer/Footer';
import { TopbarHeight } from '../../assets/global/Theme-variable';
import Protected from '../../Protected';
import { createBrowserHistory } from "history"
import { UserContext } from '../../context/UserContext';
import { checkSessionFront } from '../../utils/CheckSession';

const MainWrapper = experimentalStyled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('lg')]: {
    paddingTop: TopbarHeight,
  },
  [theme.breakpoints.down('lg')]: {
    paddingTop: '64px',
  },
}));

const history = createBrowserHistory()

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [logged, setLogged] = useState(false);
  const { user } = useContext(UserContext);

  const token = localStorage.getItem('token');
  useEffect( () => {
    if (token) {
      console.log('hay sesion');
      setLogged(true)
    }
  }, [])
  return (
    <Protected>
      <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg' : ''}>
        <Header
          sx={{
            paddingLeft: isSidebarOpen && lgUp ? '265px' : '',
            backgroundColor:
              customizer.activeMode === 'dark' ? '#20232a' : '#fafbfb',
          }}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <Sidebar
          isSidebardir={customizer.activeDir === 'ltr' ? 'left' : 'right'}
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />

        <PageWrapper>
          <Container
            maxWidth={false}
            sx={{
              paddingTop: '20px',
              paddingLeft: isSidebarOpen && lgUp ? '280px!important' : '',
            }}>
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Outlet />
            </Box>
            <Footer />
          </Container>
        </PageWrapper>
      </MainWrapper>
    </Protected>
  );
};

export default FullLayout;
