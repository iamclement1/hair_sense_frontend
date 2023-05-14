import React, { useState } from "react";

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

const ModalCartItem = () => {
    const [quantity, setQuantity] = useState(1);
    return (
        <Box>
            {/* Cart Item Section  */}
            <Flex align={""} w="100%" justify="space-between" mt="30px">
                <Flex>
                    <Image
                        src="/images/hc_3.svg"
                        alt="product Image"
                        w={{ base: "98px", md: "120px", xl: "177px" }}
                        h={{ base: "98px", md: "120px", xl: "177px" }}
                        objectFit="cover"
                    />
                    <Flex flexDir={"column"} h="100%" justify="space-between">
                        <Text
                            fontSize={{
                                base: "12px",
                                md: "16px",
                                lg: "24px",
                                xl: "32px",
                            }}
                            fontWeight={"600"}
                        >
                            Hyggee Vegan Sun Cream - 50ml
                        </Text>
                        <Box>
                            <StarRating rating={3.5} />
                        </Box>

                        <Flex align="center" justify={"space-between"}>
                            <Text
                                fontSize={{
                                    base: "12px",
                                    md: "16px",
                                    lg: "24px",
                                    xl: "32px",
                                }}
                                fontWeight="600"
                            >
                                {" "}
                                ₦4,000
                            </Text>
                            <Flex
                                align="center"
                                alignSelf="flex-end"
                                display={{
                                    base: "flex",
                                    md: "none",
                                    lg: "none",
                                    xl: "none",
                                }}
                            >
                                <Button
                                    aria-label="reduce quantity"
                                    onClick={() => setQuantity(quantity - 1)}
                                    fontSize="10px"
                                    w="15px"
                                    minW="15px"
                                    h="15px"
                                >
                                    -
                                </Button>
                                <Text
                                    w="20px"
                                    fontSize="10px"
                                    textAlign="center"
                                >
                                    {quantity}
                                </Text>
                                <Button
                                    aria-label="Add to quantity"
                                    onClick={() => setQuantity(quantity + 1)}
                                    fontSize="10px"
                                    w="15px"
                                    minW="15px"
                                    h="15px"
                                >
                                    +
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                {/* increaes cart item buttons for large Desktop */}
                <Flex
                    align="center"
                    alignSelf="flex-end"
                    display={{
                        base: "none",
                        md: "flex",
                        lg: "flex",
                        xl: "flex",
                    }}
                >
                    <Button
                        aria-label="reduce quantity"
                        onClick={() => setQuantity(quantity - 1)}
                    >
                        -
                    </Button>
                    <Text w="54px" textAlign="center">
                        {quantity}
                    </Text>
                    <Button
                        aria-label="Add to quantity"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                        +
                    </Button>
                </Flex>
            </Flex>
            <Divider my={["24px", null, "34px"]} />
        </Box>
    );
};

export default ModalCartItem;
