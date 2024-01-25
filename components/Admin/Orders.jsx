import {
    Box,
    Flex,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { PrimaryButton } from "@/components/Common";
import { SecondaryButton } from "../Common/Button";
import Cookies from 'js-cookie'
import { baseUrl } from "@/http-request/http-request";
import axios from "axios";
import { StateContext } from "@/context/StateProvider";

const Orders = () => {

    const { user } = useContext(StateContext);

    const [catData, setCatData] = React.useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            await axios.get(`${baseUrl}/store/orders/all/`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
                .then((response) => {
                    const data = response?.data.data.results;
                    setCatData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchOrders();
    }, [user])

    const getStatusStyle = (status) => {
        let textColor;

        if (status === "received") {
            textColor = "green";
        } else if (status === "failed") {
            textColor = "red";
        } else {
            textColor = "yellow";
        }

        return {
            color: textColor,
        };
    };
    return (
        <Box>
            <Box>
                <Flex align="center" justify="space-between" gap="20px">
                    <Box>
                        <Text fontSize={["24px"]} fontWeight="600">
                            Orders
                        </Text>
                        <Text mt={["10px", null, "16px"]}>
                            A list of all oders.
                        </Text>
                    </Box>
                    <Flex
                        align="center"
                        gap="10px"
                        flexWrap={["wrap", "nowrap"]}
                    >
                        <PrimaryButton text="Download PDF" />
                        <SecondaryButton text="Export as DOCX" />
                    </Flex>
                </Flex>

                <Box mt="40px">
                    <TableContainer p="0px">
                        <Table variant="simple" p="0px" className="noBorder">
                            <Thead
                                borderRadius={"20px"}
                                rounded="20px"
                                fontWeight="600"
                                fontSize={["16px", "18px"]}
                            >
                                <Tr>
                                    <Th
                                        borderTopLeftRadius={"16px"}
                                        bgColor="shades_9"
                                        py="20px"
                                    >
                                        Customer
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Order no.
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Total
                                    </Th>

                                    <Th bgColor="shades_9" py="20px">
                                        Payment
                                    </Th>
                                    <Th
                                        borderTopRightRadius={"16px"}
                                        bgColor="shades_9"
                                        py="20px"
                                    >
                                        Status
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody bgColor="white">
                                {catData.length > 0 ? (
                                    catData.map((order) => (
                                        <Tr key={order.id}>
                                            <Td>{`${order.first_name} ${order.last_name}`}</Td>
                                            <Td>{order.id}</Td>
                                            <Td>{order.amount}</Td>
                                            <Td>{order.method}</Td>
                                            <Td style={getStatusStyle(order.status)}>
                                                {order.status}
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan="5" textAlign="center">
                                            No records found
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>



                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default Orders;
