import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { BsArrowUpShort } from 'react-icons/bs';

const BackToTop = () => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 300) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (
      <Box>
         {
            isVisible && (
               <Button onClick={handleClick}
                  position='fixed'
                  bottom='20px'
                  right={['16px', '84px']}
                  zIndex={3}
                  bgColor="accent_4">
                  <BsArrowUpShort />
               </Button>
            )
         }
      </Box>
   );
};

export default BackToTop;
