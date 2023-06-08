import { Flex, Spinner } from "@chakra-ui/react";

const CustomSpinner = () => {
   return (
      <Flex
         align="center"
         justify="center"
         height="100vh"
         position="fixed"
         top="0"
         left="0"
         right="0"
         bottom="0"
         backgroundColor="rgba(255, 255, 255, 0.7)" // Optional: Add a semi-transparent background color
      >
         <Spinner color="blue.600" size="lg" />
      </Flex>
   );
};

export default CustomSpinner;
