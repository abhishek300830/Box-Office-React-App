import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.styled';

const Navbar = () => {
   const LINKS = [
      { to: '/', text: 'Home' },
      { to: '/star', text: 'Starred' },
   ];

   const location = useLocation();
   // console.log('Location:', location);
   return (
      <div>
         <NavList>
            {LINKS.map(item => {
               return (
                  <li key={item.to}>
                     <LinkStyled
                        to={item.to}
                        className={
                           item.to === location.pathname ? 'active' : ''
                        }
                     >
                        {item.text}
                     </LinkStyled>
                  </li>
               );
            })}
         </NavList>
      </div>
   );
};

export default memo(Navbar);
