import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Shows = () => {
   //    const params = useParams();
   const { id } = useParams();
   const [show, setShow] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      let isMounted = true;
      apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
         .then(result => {
            if (isMounted) {
               setShow(result);
               setIsLoading(false);
            }
         })
         .catch(err => {
            if (isMounted) {
               setError(err.message);
               setIsLoading(false);
            }
         });
      return () => {
         isMounted = false;
      };
   }, [id]);

   console.log('show', show);

   if (isLoading) {
      return <div>The Data is Loading</div>;
   }
   if (error) {
      return <div>Error Occured : {error}</div>;
   }

   return <div>This is hunks {id}</div>;
};

export default Shows;
