import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import Title from '../components/Title';
import { apiGet } from '../misc/config';

const Home = () => {
   const [input, setInput] = useState('');
   const [result, setResult] = useState(null);

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
      // fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      //    .then(Response => {
      //       return Response.json();
      //    })
      //    .then(result => {
      //       // setting result to useState
      //       setResult(result);
      //       console.log('result', result);
      //    });
      // this thing is encapsulated in another file
      apiGet(`/search/shows?q=${input}`).then(result => {
         setResult(result);
      });
   };
   const renderResults = () => {
      if (result && result.length === 0) {
         return <div>No Results Found!</div>;
      }
      if (result && result.length > 0) {
         return (
            <div>
               {result.map(item => {
                  return <div key={item.show.id}>{item.show.name}</div>;
               })}
            </div>
         );
      }
      return null;
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
            {renderResults()}
         </MainPageLayout>
      </>
   );
};

export default Home;
