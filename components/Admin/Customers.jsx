import React, { useEffect, useRef, useState } from "react";
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
    Button,
} from "@chakra-ui/react";
import { PrimaryButton } from "@/components/Common";
import { SecondaryButton } from "../Common/Button";
import useCustomers from "@/hooks/useCustomers";
import CustomSpinner from "../Common/Spinner";
import { toast } from "react-toastify";
import useDataErrorToast from "@/hooks/useErrorToast";

const Customers = ({ setActivePage }) => {
    const { data, isLoading, error } = useCustomers();
    console.log(data)
    const customerData = data?.data?.data;

    // Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(customerData?.length / itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomers = customerData && customerData?.length > 0 && customerData?.slice(startIndex, endIndex);


    useDataErrorToast(error, data, setActivePage);
    return (
        <Box>
            {isLoading && <CustomSpinner />}
            <Box>
                <Flex align="center" justify="space-between" gap="20px">
                    <Box>
                        <Text fontSize={["24px"]} fontWeight="600">
                            Customers
                        </Text>
                        <Text mt={["10px", null, "16px"]}>
                            A list of all Customers.
                        </Text>
                    </Box>
                    <Flex align="center" gap="10px" flexWrap={["wrap", "nowrap"]}>
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
                                        maxW="100px"
                                    >
                                        S/N
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Name
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Phone number
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Email{" "}
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody bgColor="white">
                                {currentCustomers?.length > 0 ? (
                                    currentCustomers?.map((customer, index) => (
                                        <Tr key={customer.id}>
                                            <Td maxW="100px">{index + 1}</Td>
                                            <Td>{`${customer.firstName} ${customer.lastName}`}</Td>
                                            <Td>{customer.phone}</Td>
                                            <Td>{customer.email}</Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan="4" textAlign="center">
                                            No records found
                                        </Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {totalPages > 1 && (
                        <Flex mt="20px" justify="center" alignItems={"center"} textAlign={"center"} justifyContent={"center"}>
                            <Button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                mr="10px"
                            >
                                Previous
                            </Button>
                            <Text mx="10px">{currentPage}</Text>
                            <Button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                ml="10px"
                                cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
                            >
                                Next
                            </Button>
                        </Flex>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Customers;
