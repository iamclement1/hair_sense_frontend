import { baseUrl, httpGet } from "@/http-request/http-request";
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useTable } from "react-table";
import TablePagination from "../Common/TablePagination";
import Spinner from "../Common/Spinner";

const Products = () => {
    const [products, setProducts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const accessToken = Cookies.get("access_token");

    //pagination session starts here
    const itemsPerPage = 10;

    //calculate the total number of page
    const totalPages = Math.ceil(products && products.length / itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    //the calculation of the start and end index per page starts here
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay =
        products && products.length > 0 && products.slice(startIndex, endIndex);
    // console.log(itemsToDisplay);

    //pagination session ends here

    useEffect(() => {
        async function fetchProduct() {
            const response = await httpGet(`${baseUrl}/store/products`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response && response.data && response.status === 200) {
                const data = response.data.results;
                setProducts(data);
                console.log("Response is here", data);
            }
            // console.log(
            //     "product data fetched is here mf",
            //     response.data.results
            // );
        }
        if (!products) {
            fetchProduct();
        }
    }, [accessToken, products, setProducts]);

    const columns = useMemo(
        () => [
            {
                Header: "SN",
                accessor: "id",
            },
            {
                Header: "Product Name",
                accessor: "name",
            },
            {
                Header: "Product Description",
                accessor: "first_description",
            },
            {
                Header: "Product Price",
                accessor: "actual_price",
            },
            {
                Header: "Product Image",
                accessor: "product_img",
            },
        ],
        []
    );

    const EnvData = useMemo(() => itemsToDisplay, [itemsToDisplay]);

    const EnvColumn = useMemo(() => {
        if (products && products.length > 0) {
            const validKeys = Object.keys(products[0]).filter(
                (key) =>
                    ![
                        "comment",
                        "rate",
                        "commenter",
                        "second_description",
                        "sales_price",
                        "product",
                        "views",
                        "product_img",
                    ].includes(key)
            );
            return validKeys.map((key) => ({
                Header: key,
                accessor: key,
            }));
        } else {
            return [];
        }
    }, [products]);

    const tableInstance = useTable({ columns: EnvColumn, data: EnvData });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    // Handler for the edit action
    const handleEdit = (productId) => {
        // Implement the logic for handling the edit action
        console.log("Edit product with ID:", productId);
    };

    // Handler for the delete action
    const handleDelete = (productId) => {
        // Implement the logic for handling the delete action
        console.log("Delete product with ID:", productId);
    };

    return (
        <React.Fragment>
            {products && products.length > 0 ? (
                <Table
                    {...getTableProps()}
                    className="noBorder"
                    variant="simple"
                >
                    <Thead
                        bgColor="#D0DAF2"
                        borderRadius={"20px"}
                        rounded="20px"
                        fontWeight="600"
                        fontSize={["16px", "18px"]}
                    >
                        {headerGroups.map((headerGroup, header) => (
                            <Tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={header}
                            >
                                {headerGroup.headers.map((column, col) => (
                                    <Th
                                        {...column.getHeaderProps()}
                                        key={col}
                                        bgColor="shades_9"
                                        py="20px"
                                        _first={{
                                            borderTopLeftRadius: "16px",
                                        }}
                                    >
                                        {column.render("Header")}
                                    </Th>
                                ))}
                                <Th borderTopRightRadius="16px">Action</Th>{" "}
                                {/* Add a column for action buttons */}
                            </Tr>
                        ))}
                    </Thead>

                    <Tbody {...getTableBodyProps()} bgColor="white">
                        {rows.map((row) => {
                            prepareRow(row);
                            const { id } = row.original; // Get the ID of the product

                            return (
                                <Tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map((cell) => (
                                        <Td
                                            {...cell.getCellProps()}
                                            key={cell.id}
                                        >
                                            {cell.render("Cell")}
                                        </Td>
                                    ))}
                                    <Td>
                                        <Flex>
                                            <AiFillEdit
                                                color="blue"
                                                // size="xs"
                                                mr={2}
                                                cursor={"pointer"}
                                                onClick={() => handleEdit(id)}
                                            />
                                            <MdDelete
                                                color="red"
                                                // size="xs"
                                                cursor={"pointer"}
                                                onClick={() => handleDelete(id)}
                                            />
                                        </Flex>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            ) : (
                <div>
                    <Spinner />
                </div>
            )}

            {totalPages > 1 && (
                <TablePagination
                    pageCount={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </React.Fragment>
    );
};

export default Products;
