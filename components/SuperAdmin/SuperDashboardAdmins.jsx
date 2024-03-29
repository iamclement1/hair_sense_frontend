import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import CustomTable from "./Tables/CustomTable";
import AdminMode from "./AdminModeModals";
import { FaUser } from "react-icons/fa";
import CreateAdmin from "./CreateAdmin";
import useAdmin from "@/hooks/useAdmin";
import CustomSpinner from "../Common/Spinner";
import useDataErrorToast from "@/hooks/useErrorToast";

const SuperDashboardAdmins = ({ setActivePage }) => {

    const { data: adminData, isLoading, error } = useAdmin();

    useDataErrorToast(error, adminData, setActivePage);

    const allAdmins = adminData?.data?.data?.data;



    const columns = [
        { id: "name", Header: "Name", accessor: (row) => `${row.firstName} ${row.lastName}` },
        { id: "email", Header: "Email", accessor: (row) => row.email },
        { id: "phoneNo", Header: "Phone No", accessor: (row) => row.phone },
        {
            id: "",
            Header: "Set Status",
            accessor: (row) => (
                <Flex gap="12px">
                    {/* <AdminMode
                        title={"Enable"}
                        textContent={`Are you sure you want to enable ${row.firstName} ${row.lastName} as an admin?`}
                        rowData={row}
                    />
                    <AdminMode
                        title={"Disable"}
                        textContent={`Are you sure you want to Disable ${row.firstName} ${row.lastName} as an admin?`}
                        rowData={row}
                    /> */}
                    <AdminMode
                        title={"Delete"}
                        textContent={`Are you sure you want to permanently delete ${row.firstName} ${row.lastName} as an admin?`}
                        rowData={row}
                    />
                </Flex>
            ),
        },
    ];

    if (isLoading) return <CustomSpinner />;




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
                        <CreateAdmin setActivePage={setActivePage} />
                    </Box>
                </Flex>
                <Text fontSize="20px">A list of all Admins.</Text>

                <Box mt="2.5rem">
                    <CustomTable data={allAdmins} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
};

export default SuperDashboardAdmins;
