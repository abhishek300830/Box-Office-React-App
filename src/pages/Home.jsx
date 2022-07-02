import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import Title from '../components/Title';

const Home = () => {
   const [input, setInput] = useState('');

   const onChangeInput = event => {
      setInput(event.target.value);
      // console.log(event.target.value);
   };

   const onKeyDown = event => {
      if (event.keyCode === 13) {
         onSearch();
      }
      // console.log(event.keyCode);
   };

   const onSearch = () => {
      // https://api.tvmaze.com/search/shows?q=girls
      fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
         .then(Response => {
            // console.log('response', Response);
            return Response.json();
         })
         .then(result => {
            console.log('result', result);
         });
   };
   return (
      <>
         <Title
            title={'BOX OFFICE'}
            subTitle={'Are you Looking for a Movie or a Actor.'}
         />
         <MainPageLayout>
            <input
               type="text"
               onChange={onChangeInput}
               value={input}
               onKeyDown={onKeyDown}
            />
            <button type="button" onClick={onSearch}>
               Search
            </button>
         </MainPageLayout>
      </>
   );
};

export default Home;
