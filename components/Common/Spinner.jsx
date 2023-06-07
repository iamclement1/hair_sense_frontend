import { Flex, Spinner } from "@chakra-ui/react";

const CustomSpinner = () => {
   return (
      <Flex align="center" justify="center" height="100vh">
         <Spinner color="blue.600" size="lg" />
      </Flex>
   )
};

export default CustomSpinner;
