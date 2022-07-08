import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
   switch (action.type) {
      case 'FETCH_SUCCESS': {
         return { isLoading: false, show: action.show, error: null };
      }
      case 'FETCH_FAILED': {
         return { ...prevState, isLoading: false, error: action.error };
      }
      default:
         return prevState;
   }
};

const initialState = {
   show: null,
   isLoading: true,
   error: null,
};

const Shows = () => {
   //    const params = useParams();
   const { id } = useParams();

   const [state, dispatch] = useReducer(reducer, initialState);
   const { isLoading, error, show } = state;
   // const [show, setShow] = useState(null);
   // const [isLoading, setIsLoading] = useState(true);
   // const [error, setError] = useState(null);

   useEffect(() => {
      let isMounted = true;
      apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
         .then(result => {
            if (isMounted) {
               dispatch({ type: 'FETCH_SUCCESS', show: result });
               // setShow(result);
               // setIsLoading(false);
            }
         })
         .catch(err => {
            if (isMounted) {
               dispatch({ type: 'FETCH_FAILED', error: err.message });
               // setError(err.message);
               // setIsLoading(false);
            }
         });
      return () => {
         isMounted = false;
      };
   }, [id]);

   // console.log('show', show);

   if (isLoading) {
      return <div>The Data is Loading</div>;
   }
   if (error) {
      return <div>Error Occured : {error}</div>;
   }

   return (
      <div>
         <ShowMainData
            image={show.image}
            name={show.name}
            rating={show.rating}
            summary={show.summary}
            tags={show.genres}
         />
         <div>
            <h2>Details</h2>
            <Details
               status={show.status}
               network={show.network}
               premiered={show.premiered}
            />
         </div>
         <div>
            <h2>Seasons</h2>
            <Seasons seasons={show._embedded.seasons} />
         </div>
         <div>
            <h2>Casts</h2>
            <Cast cast={show._embedded.cast} />
         </div>
      </div>
   );
};

export default Shows;
