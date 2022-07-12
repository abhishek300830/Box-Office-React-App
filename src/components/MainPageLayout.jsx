import React from 'react';
import Navbar from './Navbar';
import Title from './Title';
// import Title from '../components/Title';

const MainPageLayout = ({ children }) => {
   return (
      <>
         <Title
            title={'BOX OFFICE'}
            subTitle={'Are you Looking for a Movie or a Actor.'}
         />
         <Navbar />
         {children}
      </>
   );
};

export default MainPageLayout;
