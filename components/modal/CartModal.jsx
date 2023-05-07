import React from "react";
import {
    Box,
    Divider,
    Flex,
    Text,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Select,
    Image,
} from "@chakra-ui/react";
import { StarRating } from "../Common";

const CartModal = ({ isOpen, onClose, onOpen }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent
                bgColor={"white"}
                mx={["16px"]}
                px={["0px", null, "64px"]}
                py={["23px", null, "46px"]}
                rounded={["12px", null, "none"]}
            >
                <Flex gap="20px" justify="space-between" align="center">
                    <Text fontSize={["28px", null, "40px"]} color="accent_2">
                        My Cart
                    </Text>
                    <ModalCloseButton
                        position={"relative"}
                        top={"0px"}
                        right="0px"
                    />
                </Flex>
                <Divider mt="15px" />
                {/* Cart Item Section  */}

                <Flex align={""} w="100%" justify="space-between">
                    <Flex>
                        <Image
                            src="/images/hc_3.svg"
                            alt="product Image"
                            w="177px"
                            h="177px"
                            objectFit="cover"
                        />
                        <Flex
                            flexDir={"column"}
                            h="100%"
                            justify="space-between"
                        >
                            <Text fontSize="32px" fontWeight={"600"}>
                                Hyggee Vegan Sun Cream - 50ml
                            </Text>
                            <Box>
                                <StarRating rating={3.5} />
                            </Box>
                            <Text> ₦4,000</Text>
                        </Flex>
                    </Flex>

                    <Flex align="center" alignSelf="flex-end">
                        <Button
                            aria-label="reduce quantity"
                            py={["16px", null, null, null, "18px"]}
                            px={["16px", null, null, null, "18px"]}
                        >
                            -
                        </Button>
                        <Text w="54px" textAlign="center">
                            {" "}
                            1{" "}
                        </Text>
                        <Button
                            aria-label="Add to quantity"
                            py={["16px", null, null, null, "18px"]}
                            px={["16px", null, null, null, "18px"]}
                        >
                            +
                        </Button>
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    );
};

export default CartModal;
