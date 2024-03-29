import * as React from 'react';
// import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { useShows } from '../misc/custom-hooks';
import { apiGet } from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';

// loder
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Starred = () => {
   const [starred] = useShows();
   const [shows, setShows] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      if (starred && starred.length > 0) {
         const promises = starred.map(showId => apiGet(`/shows/${showId}`));
         Promise.all(promises)
            // .then(apiData => apiData.map(show => ({ show })))
            .then(apiData => {
               // console.log(apiData);
               // console.log(apiData.map(show => ({ show })));
               return apiData.map(show => ({ show }));
            })
            .then(results => {
               setShows(results);
               setIsLoading(false);
            })
            .catch(err => {
               setError(err.message);
               setIsLoading(false);
            });
      } else {
         setIsLoading(false);
      }
   }, [starred]);

   return (
      <MainPageLayout>
         {
            <div>
               {isLoading && (
                  <Box sx={{ display: 'flex' }}>
                     <CircularProgress />
                  </Box>
               )}
            </div>
         }
         {error && <div>Error Occured : {error}</div>}
         {!isLoading && !shows && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               No Shows are Starred
            </div>
         )}
         {!isLoading && !error && shows && <ShowGrid data={shows} />}
      </MainPageLayout>
   );
};

export default Starred;
