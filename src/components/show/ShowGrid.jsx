import React, { useCallback } from 'react';
import ShowCard from './ShowCard';
import notFound from '../../images/not-found.png';
import { FlexGrid } from '../Styled';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ data }) => {
   const [StarredShow, dispatchStarred] = useShows();

   const onStarClick = useCallback(
      (isStarred, showId) => {
         if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId: showId });
         } else {
            dispatchStarred({ type: 'ADD', showId: showId });
         }
      },
      [dispatchStarred]
   );

   return (
      <FlexGrid>
         {data.map(({ show }) => {
            return (
               <ShowCard
                  key={show.id}
                  id={show.id}
                  name={show.name}
                  image={show.image ? show.image.medium : notFound}
                  summary={show.summary}
                  onStarClick={onStarClick}
                  isStarred={StarredShow.includes(show.id)}
               />
            );
         })}
      </FlexGrid>
   );
};

export default ShowGrid;
