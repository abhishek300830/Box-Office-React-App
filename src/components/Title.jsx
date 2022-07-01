import React from 'react';

const Title = ({ title, subTitle }) => {
   return (
      <>
         <h1>{title} </h1>
         <p>{subTitle}</p>
      </>
   );
};

export default Title;
