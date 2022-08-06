import React from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { useShow } from '../misc/custom-hooks';
import { InfoBlock, ShowPageWrapper } from './Show.styled';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Shows = () => {
   //    const params = useParams();
   const { id } = useParams();
   const { isLoading, error, show } = useShow(id);

   // console.log('show', show);

   if (isLoading) {
      return (
         <div>
            <Box sx={{ display: 'flex' }}>
               <CircularProgress />
            </Box>
         </div>
      );
   }
   if (error) {
      return <div>Error Occured : {error}</div>;
   }

   return (
      <ShowPageWrapper>
         <ShowMainData
            image={show.image}
            name={show.name}
            rating={show.rating}
            summary={show.summary}
            tags={show.genres}
         />
         <InfoBlock>
            <h2>Details</h2>
            <Details
               status={show.status}
               network={show.network}
               premiered={show.premiered}
            />
         </InfoBlock>
         <InfoBlock>
            <h2>Seasons</h2>
            <Seasons seasons={show._embedded.seasons} />
         </InfoBlock>
         <InfoBlock>
            <h2>Casts</h2>
            <Cast cast={show._embedded.cast} />
         </InfoBlock>
      </ShowPageWrapper>
   );
};

export default Shows;
