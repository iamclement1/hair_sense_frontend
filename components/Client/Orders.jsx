
import {
    Box,
    Divider,
    Flex,
    Text,
    Stack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import OrderBox from "./OrderBox";
import { baseUrl } from "@/http-request/http-request";
import { toast } from "react-toastify";
import { StateContext } from "@/context/StateProvider";


const Orders = ({ onToggle }) => {
    const [clientOrders, setClientOrders] = useState([]);
    const { user } = useContext(StateContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) {
                    console.error("Access token not available");
                    toast.error("Access Denied");
                    return;
                }

                const response = await fetch(`${baseUrl}/store/orders/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${user}`,
                    },

                });

                if (response) {
                    const responseData = await response.json();
                    setClientOrders(responseData?.data.data);
                    console.log("Orders:", responseData?.data.data);
                } else {
                    console.error("Failed to fetch orders:", response.statusText);
                }
            } catch (error) {
                if (error?.response) {
                    const errorMessage = error.response.data.message;
                    toast.error(errorMessage);
                }
            }
        };

        console.log(clientOrders)

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
