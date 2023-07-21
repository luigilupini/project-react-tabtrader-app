import { useMemo } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { themeSettings } from './theme';

import Navbar from '@/scenes/navbar';
import Dashboard from '@/scenes/dashboard';
import Predictions from './scenes/predictions';

export default function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width='100%' height='100%' padding='1rem 2rem 4rem 2rem'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/predictions' element={<Predictions />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
