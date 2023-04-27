import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
    return (
        <Flex align="center" justify="center" h="240px" bgColor={"green.800"} mt="30px">
            <Text textAlign={"center"} fontFamily={"inter"} color={"white"}>
                {" "}
                Footer
            </Text>
        </Flex>
    )
}

export default Footer