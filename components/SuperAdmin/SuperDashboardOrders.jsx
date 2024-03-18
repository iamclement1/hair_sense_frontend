import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import CustomTable from "./Tables/CustomTable";
import CustomSpinner from "../Common/Spinner";
import useOrder from "@/hooks/useOrder";

const SuperDashboardOrders = () => {

    const { data: orderData, isLoading } = useOrder();

    if (isLoading) return <CustomSpinner />

    // console.log(orderData?.data?.data)
    const orders = orderData?.data?.data
    const columns = [
        // { id: "s/n", Header: "S/N", accessor: (row) => row.id },
        { id: "customer", Header: "Customer", accessor: (row) => `${row.firstName} ${row.lastName}` },
        // { id: "order_no", Header: "Order no", accessor: (row) => row.order_no },
        {
            id: "price",
            Header: "Price",
            accessor: (row) => {
                // Calculate total price based on products in the products array
                const totalPrice = row.products.reduce((acc, product) => acc + product.amount, 0);
                return totalPrice;
            }
        },
        { id: "payment", Header: "Payment", accessor: (row) => row.method },
        {
            id: "status",
            Header: "Status",
            accessor: (row) => <Text color="accent_3">{row.payment}</Text>,
        },
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
                        Orders
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
                <Text fontSize="20px">A list of all Orders.</Text>

                <Box mt="2.5rem">
                    <CustomTable data={orders} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
};

export default SuperDashboardOrders;
