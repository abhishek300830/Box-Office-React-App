import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import Title from '../components/Title';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {
   const [input, setInput] = useLastQuery();
   const [result, setResult] = useState(null);
   const [searchOption, setSearchOption] = useState('shows');

   const isShowSelected = searchOption === 'shows';

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
      apiGet(`/search/${searchOption}?q=${input}`).then(result => {
         setResult(result);
      });
   };
   const renderResults = () => {
      if (result && result.length === 0) {
         return <div>No Results Found!</div>;
      }
      if (result && result.length > 0) {
         return result[0].show ? (
            <ShowGrid data={result} />
         ) : (
            <ActorGrid data={result} />
         );
      }
      return null;
   };
   const onRadioChange = event => {
      setSearchOption(event.target.value);
   };
   console.log(searchOption);
   return (
      <>
         <Title
            title={'BOX OFFICE'}
            subTitle={'Are you Looking for a Movie or a Actor.'}
         />
         <MainPageLayout>
            <input
               type="text"
               placeholder="Search for Something"
               onChange={onChangeInput}
               value={input}
               onKeyDown={onKeyDown}
            />
            <div>
               <label htmlFor="show-search">
                  Shows
                  <input
                     type="radio"
                     name=""
                     id="show-search"
                     value={'shows'}
                     checked={isShowSelected}
                     onChange={onRadioChange}
                  />
               </label>
               <label htmlFor="actor-search">
                  Actors
                  <input
                     type="radio"
                     name=""
                     id="actor-search"
                     value={'people'}
                     checked={!isShowSelected}
                     onChange={onRadioChange}
                  />
               </label>
            </div>
            <button type="button" onClick={onSearch}>
               Search
            </button>
            {renderResults()}
         </MainPageLayout>
      </>
   );
};

export default Home;
