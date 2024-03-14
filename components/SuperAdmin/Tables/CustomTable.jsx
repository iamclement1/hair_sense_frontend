import React, { useState } from "react";
import { useTable } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Button,
    Text,
    Select,
    Flex,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { FaAddressBook, FaChevronLeft } from "react-icons/fa";
import CustomPagination from "./CustomPagination";

const CustomTable = ({ data, columns }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const {
        getTableProps,
        headerGroups,
        rows: originalRows,
        prepareRow,
    } = useTable({
        data,
        columns,
        initialState: { pageIndex: currentPage - 1, pageSize: rowsPerPage },
    });

    // Pagination logic
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    // Sliced data for current page
    const slicedData = originalRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const totalPages = Math.ceil(data.length / rowsPerPage);

    return (
        <Box>
            <Box
                rounded="16px"
                overflow={["auto", null, null, "hidden"]}
                bgColor={"white"}
            >
                <Table
                    {...getTableProps()}
                    className="noBorder"
                    variant="simple"
                    overflowX={"auto"}
                >
                    <Thead
                        bgColor="#D0DAF2"
                        fontWeight="600"
                        fontSize={["16px", "18px"]}
                    >
                        {headerGroups.map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((column) => (
                                    <Th
                                        key={column.id}
                                        {...column.getHeaderProps()}
                                        bgColor="shades_9"
                                        py="20px"
                                        // _first={{ : "16px" }}
                                    >
                                        {column.render("Header")}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody bgColor="white">
                        {slicedData.map((row, i) => {
                            prepareRow(row);
                            return (
                                <Tr key={i} {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <Td
                                            key={cell.id}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </Td>
                                    ))}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>

            {/* Pagination code  */}

            <Flex align="center" justify={"center"} mt="2.5rem">
                <CustomPagination
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </Flex>
        </Box>
    );
};

export default CustomTable;
