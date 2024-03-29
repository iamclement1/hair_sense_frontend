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
import React from "react";
import { PrimaryButton } from "@/components/Common";
import { SecondaryButton } from "../Common/Button";
import useTransactions from "@/hooks/useTransactions";
import CustomSpinner from "../Common/Spinner";
import "react-toastify/dist/ReactToastify.css";
import useDataErrorToast from "@/hooks/useErrorToast";

const Transactions = ({ setActivePage }) => {
    const { isLoading, data, error } = useTransactions();
    const transaction = data?.data?.data
    //prevent toast from showing twice
    useDataErrorToast(error, data, setActivePage);

    if (isLoading) return <CustomSpinner />;



    return (
        <Box>
            <Box>
                <Flex align="center" justify="space-between" gap="20px">
                    <Box>
                        <Text fontSize={["24px"]} fontWeight="600">
                            Transactions
                        </Text>
                        <Text mt={["10px", null, "16px"]}>
                            A list of all Transactions.
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
                            <Thead borderRadius={"20px"} rounded="20px" fontWeight="600" fontSize={["16px", "18px"]}>
                                <Tr>
                                    <Th borderTopLeftRadius={"16px"} bgColor="shades_9" py="20px">
                                        Name
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Date
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Order no.
                                    </Th>
                                    <Th bgColor="shades_9" py="20px">
                                        Reference
                                    </Th>
                                    <Th borderTopRightRadius={"16px"} bgColor="shades_9" py="20px">
                                        Amount
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody bgColor="white">
                                {transaction.map((transaction) => (
                                    <Tr key={transaction.id}>
                                        <Td>{transaction.name}</Td>
                                        <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
                                        <Td>{transaction.id}</Td>
                                        <Td>{transaction.reference}</Td>
                                        <Td>{transaction.amount}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {data.length === 0 && (
                        <Flex
                            px={["17px", "27px", "47px"]}
                            bgColor="white"
                            py="24px"
                            align="center"
                            justify="center"
                        >
                            <Text>No record found</Text>
                        </Flex>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Transactions;
