import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import CustomTable from "./Tables/CustomTable";
import AdminMode from "./AdminModeModals";
import { FaUser } from "react-icons/fa";
import CreateAdmin from "./CreateAdmin";

const SuperDashboardAdmins = () => {
    const columns = [
        { id: "s/n", Header: "S/N", accessor: (row) => row.id },
        { id: "name", Header: "Name", accessor: (row) => row.name },
        { id: "email", Header: "Email", accessor: (row) => row.email },
        { id: "phoneNo", Header: "Phone No", accessor: (row) => row.phoneNo },
        {
            id: "",
            Header: "Set Status",
            accessor: (row) => (
                <Flex gap="12px">
                    <AdminMode
                        title={"Enable"}
                        textContent={`Are you sure you want to enable ${row.name} as an admin?`}
                        callBackFunc={() => console.log("input your fuc here")}
                    />
                    <AdminMode
                        title={"Disable"}
                        textContent={`Are you sure you want to Disable ${row.name} as an admin?`}
                        callBackFunc={() => console.log("input your fuc here")}
                    />
                    <AdminMode
                        title={"Delete"}
                        textContent={`Are you sure you want to permanently delete ${row.name} as an admin?`}
                        callBackFunc={() => console.log("input your fuc here")}
                    />
                </Flex>
            ),
        },
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
                    flexDir={["row", null, "row"]}
                >
                    <Text fontSize={"2rem"} fontWeight="bold">
                        Admin
                    </Text>

                    <Box>
                        <CreateAdmin />
                    </Box>
                </Flex>
                <Text fontSize="20px">A list of all Admins.</Text>

                <Box mt="2.5rem">
                    <CustomTable data={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
};

export default SuperDashboardAdmins;
