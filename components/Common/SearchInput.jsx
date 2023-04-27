import React from "react";
import {
    Flex,
    Box,
    InputGroup,
    Input,
    InputRightElement,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image,
    Link,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
    return (
        <InputGroup w="100%" maxW={["100%", "100%", "460px"]} mx="auto">
            <Input
                placeholder="Search favorite product..."
                bgColor={"white"}
                py="14px"
                px="20px"
            />
            <InputRightElement>
                <IconButton
                    _hover={{}}
                    _active={{}}
                    rounded="0px"
                    bg="primary_1"
                    aria-label="Search"
                    icon={<FaSearch />}
                    color="white"
                    borderRightRadius="6px"
                />
            </InputRightElement>
        </InputGroup>
    );
};

export default SearchInput;
