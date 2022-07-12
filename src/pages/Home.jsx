import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
   RadioInputsWrapper,
   SearchButtonWrapper,
   SearchInput,
} from './Home.styled';

const renderResults = result => {
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

const Home = () => {
   const [input, setInput] = useLastQuery();
   const [result, setResult] = useState(null);
   const [searchOption, setSearchOption] = useState('shows');

   const isShowSelected = searchOption === 'shows';

   const onChangeInput = useCallback(
      event => {
         setInput(event.target.value);
         // console.log(event.target.value);
      },
      [setInput]
   );

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

   const onRadioChange = useCallback(event => {
      setSearchOption(event.target.value);
   }, []);
   // console.log(searchOption);

   return (
      <>
         <MainPageLayout>
            <SearchInput
               type="text"
               placeholder="Search for Something"
               onChange={onChangeInput}
               value={input}
               onKeyDown={onKeyDown}
            />
            <RadioInputsWrapper>
               <CustomRadio
                  label="Shows"
                  id="show-search"
                  value={'shows'}
                  checked={isShowSelected}
                  onChange={onRadioChange}
               />
               <CustomRadio
                  label={'Actors'}
                  id="actor-search"
                  value={'people'}
                  checked={!isShowSelected}
                  onChange={onRadioChange}
               />
            </RadioInputsWrapper>
            <SearchButtonWrapper>
               <button type="button" onClick={onSearch}>
                  Search
               </button>
            </SearchButtonWrapper>
            {renderResults(result)}
         </MainPageLayout>
      </>
   );
};

export default Home;
