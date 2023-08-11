import AdminLayout from "@/components/layouts/AdminLayout";
import {
    Box,
    Flex,
    Image,
    Link,
    Icon,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { PrimaryButton } from "@/components/Common";
import { SecondaryButton } from "../Common/Button";
import Cookies from 'js-cookie'
import { baseUrl, httpGet } from "@/http-request/http-request";

const Orders = () => {
    const tableData = [1, 2];
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchOrders = async () => {
            await httpGet(`${baseUrl}/store/orders/all/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    const data = response.data.results;
                    console.log(data);
                    // setCatData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchOrders();
    }, [accessToken])
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
                                {tableData.length > 0 ? (
                                    <Tr>
                                        <Td>Salaudeen Shina</Td>
                                        <Td>07030075660</Td>
                                        <Td>25.4</Td>
                                        <Td>25.4</Td>
                                        <Td>Pending</Td>
                                    </Tr>
                                ) : (
                                    ""
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {tableData.length <= 0 ? (
                        <Flex
                            px={["17px", "27px", "47px"]}
                            bgColor="white"
                            py="24px"
                            align="center"
                            justify="center"
                        >
                            <Text>No record found</Text>
                        </Flex>
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Orders;
