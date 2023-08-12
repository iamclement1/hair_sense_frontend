import { PrimaryButton, ProductSlider } from "@/components/Common";
import Badge from "@/components/Common/Badge";
import {
    Box,
    Divider,
    Flex,
    Text,
    Icon,
    Image,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import OrderBox from "./OrderBox";
import { baseUrl, httpGet } from "@/http-request/http-request";
import Cookies from "js-cookie";
import axios from "axios";

const Orders = ({ onToggle }) => {
    const [clientOrders, setClientOrders] = useState([]);
    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        async function fetchOrders() {
            const response = await axios.get(`${baseUrl}/store/orders/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response && response.status === 200) {
                setClientOrders(response.data && response.data.data);
            }
            console.log(response);
        }

        fetchOrders();
    }, []);

    return (
        <Box>
            <Flex
                align="center"
                onClick={onToggle}
                mb="4"
                display={{ base: "flex", sm: "none", md: "none", xl: "none" }}
            >
                <FiChevronLeft />

                {/* <Text fontSize={"12px"}>Back</Text> */}
            </Flex>
            <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                <Divider borderColor="accent_10" />
                <Text
                    flexShrink={0}
                    fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                    fontWeight={600}
                    color="accent_2"
                >
                    Orders
                </Text>
                <Divider />
            </Flex>

            <Box>
                {clientOrders.length < 1 ? (
                    <Flex minH="20vh" align="center">
                        <Text>You currently do not have any order</Text>
                    </Flex>
                ) : (
                    <Stack>
                        {clientOrders.map((order, i) => {
                            return <OrderBox data={order} key={i} />;
                        })}
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default Orders;
