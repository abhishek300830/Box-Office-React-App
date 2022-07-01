import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Test from './components/Test.jsx';

function App() {
   return (
      <Routes>
         <Route path="/" element={<Test />}></Route>
         <Route path="/star" element={'thsi is Stared'}></Route>
         <Route path="*" element={'This is 404 error : Page Not Found'}></Route>
      </Routes>
   );
}

export default App;
