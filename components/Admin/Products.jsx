import { baseUrl, httpDelete, httpGet } from "@/http-request/http-request";
import {
    Flex,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Spinner,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import EditProduct from "./EditProduct";
import { useTable } from "react-table";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import TablePagination from "../Common/TablePagination";

const Products = () => {
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit,
    } = useDisclosure();

    const [products, setProducts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleting, setDeleting] = useState(false);
    const [editData, setEditData] = useState(null);
    const accessToken = Cookies.get("access_token");

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


    //pagination session ends here

    // Fetch product to be global
    async function fetchProduct() {
        const response = await httpGet(`${baseUrl}/store/products`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response?.status === 200) {
            const data = response?.data.results;
            setProducts(data);

            console.log(response);

        }

        //     "product data fetched is here mf",
        //     response.data.results
        // );
    }

    useEffect(() => {
        if (!products) {
            fetchProduct();
        }
    }, [accessToken, products, setProducts]);


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

    // Handler for the delete action
    const handleDelete = async (productId) => {
        // Implement the logic for handling the delete action
        await httpDelete(`${baseUrl}/store/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response) {
                    toast.success("Product deleted successfully");
                    window.location.reload();
                    setActivePage(5);
                    fetchProduct();
                }

            })
            .catch((error) => {

            });
    };

    // Import edit Modal disclosure

    // Handler for the edit action
    const handleEdit = (product) => {
        // Implement the logic for handling the edit action

        setEditData(product);
        onOpenEdit();
    };

    return (
        <>
            {products && products.length > 0 ? (
                <Table
                    {...getTableProps()}
                    className="noBorder"
                    variant="simple"
                    overflowX={"auto"}
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
                                key={header.id}
                            >
                                {headerGroup.headers.map((column, col) => (
                                    <Th
                                        {...column.getHeaderProps()}
                                        key={col.id}
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
                            const productData = row.original;

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
                                        <Flex gap="10px">
                                            {/* Edit Icon  */}
                                            <Icon
                                                as={FiEdit}
                                                cursor="pointer"
                                                boxSize="20px"
                                                onClick={() => {
                                                    handleEdit(productData);
                                                }}
                                            />
                                            {/* Delete content Icon/trigger  */}
                                            {deleting ? (
                                                <Spinner size="md" />
                                            ) : (
                                                <Icon
                                                    as={MdOutlineDelete}
                                                    cursor="pointer"
                                                    boxSize="20px"
                                                    onClick={() =>
                                                        handleDelete(id)
                                                    }
                                                />
                                            )}
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

            {/* **************** */}

            <EditProduct
                isOpen={isOpenEdit}
                onOpen={onOpenEdit}
                onClose={onCloseEdit}
                data={editData}
            />
        </>
    );
};

export default Products;
