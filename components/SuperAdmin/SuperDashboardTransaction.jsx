import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import CustomTable from "./Tables/CustomTable";
import useTransactions from "@/hooks/useTransactions";
import CustomSpinner from "../Common/Spinner";
import { toast } from "react-toastify";
import useDataErrorToast from "@/hooks/useErrorToast";
import { format } from "date-fns";

const SuperDashboardTransaction = ({ setActivePage }) => {

    const { isLoading, data: transData, error } = useTransactions();

    useDataErrorToast(error, transData, setActivePage)

    if (isLoading) return <CustomSpinner />

    if (error) {
        return toast.error("We couldn't fetch data, please contact support!")

    }
    const transactions = transData?.data?.data;
    const columns = [
        { id: "name", Header: "Customer", accessor: (row) => row.name },
        { id: "date", Header: "Date", accessor: (row) => format(new Date(row.date), "MMMM dd, yyyy") }, // Format the date
        { id: "orderNo", Header: "Order no", accessor: (row) => row.orderNo },
        { id: "reference", Header: "Reference", accessor: (row) => row.reference },
        { id: "amount", Header: "Amount", accessor: (row) => <Text> ₦ {row.amount}</Text> },
    ];
    return (
        <Box>
            <Box>
                <Flex
                    align="center"
                    justify={"space-between"}
                    flexDir={["column", null, "row"]}
                >
                    <Text fontSize={"2rem"} fontWeight="bold">
                        Transactions
                    </Text>

                    <Box>
                        <Button
                            bgColor={"primary_1"}
                            color={"white"}
                            _hover={{}}
                            mr="1rem"
                        >
                            <Icon
                                as={AiOutlineCloudDownload}
                                mr="0.3125rem"
                                boxSize={"1.5rem"}
                            />
                            <Text fontSize="0.775rem">Download PDF</Text>
                        </Button>

                        <Button
                            bgColor={"transparent"}
                            border="1px"
                            borderColor={"primary_1"}
                            fontSize="0.875rem"
                            color={"primary_1"}
                            _hover={{}}
                        >
                            <Icon
                                as={AiOutlineCloudDownload}
                                mr="0.3125rem"
                                boxSize={"1.5rem"}
                            />
                            <Text fontSize="0.775rem">Export as DOCX</Text>
                        </Button>
                    </Box>
                </Flex>
                <Text fontSize="20px">A list of all transactions.</Text>

                <Box mt="2.5rem">
                    <CustomTable data={transactions} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
};

export default SuperDashboardTransaction;
