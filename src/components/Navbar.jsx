import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
   const LINKS = [
      { to: '/', text: 'Go To Home' },
      { to: '/star', text: 'Go To Starred' },
   ];
   return (
      <div>
         <ul>
            {LINKS.map(item => {
               return (
                  <li key={item.to}>
                     <Link to={item.to}>{item.text}</Link>
                  </li>
               );
            })}
         </ul>
      </div>
   );
};

export default Navbar;
