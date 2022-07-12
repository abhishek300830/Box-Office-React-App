import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Shows from './pages/Shows.jsx';
import Starred from './pages/Starred.jsx';
import { ThemeProvider } from 'styled-components';

const theme = {
   mainColors: {
      blue: '#2400ff',
      gray: '#c6c6c6',
      dark: '#353535',
   },
};

function App() {
   return (
      <>
         {/* <Navbar /> */}
         <ThemeProvider theme={theme}>
            <Routes>
               <Route path="/" element={<Home />}></Route>
               <Route path="/star" element={<Starred />}></Route>
               <Route path="/show/:id" element={<Shows />}></Route>
               <Route path="*" element={'404 : Not Found'}></Route>
            </Routes>
         </ThemeProvider>
      </>
   );
}

export default App;
