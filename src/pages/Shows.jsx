import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Shows = () => {
   //    const params = useParams();
   const { id } = useParams();
   const [show, setShow] = useState(null);

   useEffect(() => {
      apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result => {
         setShow(result);
      });
   }, [id]);

   console.log('show', show);

   return <div>This is hunks {id}</div>;
};

export default Shows;
