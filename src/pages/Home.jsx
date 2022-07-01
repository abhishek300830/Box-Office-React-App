import React from 'react';
import MainPageLayout from '../components/MainPageLayout';
import Title from '../components/Title';

const Home = () => {
   return (
      <>
         <Title
            title={'BOX OFFICE'}
            subTitle={'Are you Looking for a Movie or a Actor.'}
         />
         <MainPageLayout>This is my Home Page</MainPageLayout>
      </>
   );
};

export default Home;
