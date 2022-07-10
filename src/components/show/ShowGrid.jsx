import React from 'react';
import ShowCard from './ShowCard';
import notFound from '../../images/not-found.png';
import { FlexGrid } from '../Styled';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ data }) => {
   const [StarredShow, dispatchStarred] = useShows();
   return (
      <FlexGrid>
         {data.map(({ show }) => {
            const isStarred = StarredShow.includes(show.id);
            const onStarClick = () => {
               if (isStarred) {
                  dispatchStarred({ type: 'REMOVE', showId: show.id });
               } else {
                  dispatchStarred({ type: 'ADD', showId: show.id });
               }
            };
            return (
               <ShowCard
                  key={show.id}
                  id={show.id}
                  name={show.name}
                  image={show.image ? show.image.medium : notFound}
                  summary={show.summary}
                  onStarClick={onStarClick}
                  isStarred={isStarred}
               />
            );
         })}
      </FlexGrid>
   );
};

export default ShowGrid;