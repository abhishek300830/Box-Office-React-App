import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Starred from './pages/Starred.jsx';

function App() {
   return (
      <>
         {/* <Navbar /> */}
         <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/star" element={<Starred />}></Route>
            <Route path="*" element={'404 : Not Found'}></Route>
         </Routes>
      </>
   );
}

export default App;
