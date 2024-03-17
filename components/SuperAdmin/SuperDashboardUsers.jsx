import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import CustomTable from "./Tables/CustomTable";

const SuperDashboardUsers = () => {
    const columns = [
        { id: "s/n", Header: "S/N", accessor: (row) => row.id },
        { id: "name", Header: "Name", accessor: (row) => row.name },
        { id: "email", Header: "Email", accessor: (row) => row.email },
        { id: "phoneNo", Header: "Phone No", accessor: (row) => row.phoneNo },
        // { id: "item", Header: "Item", accessor: (row) => row.item },
        // { id: "order_no", Header: "Order no", accessor: (row) => row.order_no },
        // {
        //     id: "price",
        //     Header: "Price",
        //     accessor: (row) => <Text> ₦{row.price}</Text>,
        // },
    ];

    const data = [
        {
            id: 1,
            name: "John Doe",
            date: "03/08/2024",
            email: "Adesh16@gmail.com",
            phoneNo: "07030075660",
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
                        Users
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
                <Text fontSize="20px">A list of all Users.</Text>

                <Box mt="2.5rem">
                    <CustomTable data={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
};

export default SuperDashboardUsers;
