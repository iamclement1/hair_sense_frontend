import useSuperDashboard from "@/hooks/useSuperDashboard";
import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import React from "react";
import CustomSpinner from "../Common/Spinner";
import { toast } from "react-toastify";

const SuperDashboard = () => {

    const { isLoading, error, data } = useSuperDashboard();

    if (isLoading) return <CustomSpinner />

    if (error) return toast.error("Unable to fetch data at the moment, Please contact support!")

    const superRecord = (data?.data?.data?.data);


    const superAdminData = [
        { id: 1, label: "Orders Placed", status: "(Today)", value: superRecord?.dailyOrders },
        { id: 2, label: "Today Sales", status: "(Today)", value: superRecord?.dailyAmount },
        {
            id: 3,
            label: "Total Products",
            status: "(In Stock)",
            value: superRecord?.totalProducts,
        },
        {
            id: 4,
            label: "Total Orders",
            status: "(General)",
            value: superRecord?.totalOrders,
        },
        {
            id: 5,
            label: "Total Amount",
            status: "(General)",
            value: superRecord?.totalAmount,
        },
    ];

    return (
        <Box>
            <Box mt="3.125rem">
                <SimpleGrid spacing={"2.25rem"} columns={[1, 2, null, 3]}>
                    {superAdminData?.map((item) => {
                        return (
                            <Flex
                                key={item?.id}
                                w="100%"
                                py="3.125rem"
                                bgColor={"white"}
                                rounded="1rem"
                                align="center"
                                justify="center"
                            // maxW={["100%", "25rem"]}
                            >
                                <Box textAlign={"center"}>
                                    <Text fontSize="1.25rem" fontWeight="600">
                                        {item?.label}
                                    </Text>
                                    <Text
                                        fontSize="1rem"
                                        fontWeight="400"
                                        mt="0.25rem"
                                        color="primary_1"
                                    >
                                        {item?.status}
                                    </Text>
                                    <Text
                                        fontSize="3rem"
                                        fontWeight="600"
                                        mt="1rem"
                                        color="primary_1"
                                    >
                                        {item?.label === "Total Sales" && "₦"}{" "}
                                        {item?.value}
                                    </Text>
                                </Box>
                            </Flex>
                        );
                    })}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default SuperDashboard;
