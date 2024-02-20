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
    Text,
    Image,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import EditProduct from "./EditProduct";
import { useTable } from "react-table";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import TablePagination from "../Common/TablePagination";
import { StateContext } from "@/context/StateProvider";
import CustomSpinner from "../Common/Spinner";
import useProducts from "@/hooks/useProducts";
import { useRouter } from "next/router";

const Products = () => {
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit,
    } = useDisclosure();



    const { isLoading, data: product } = useProducts();
    const products = product?.data?.data
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [deleting, setDeleting] = useState(false);
    const [editData, setEditData] = useState(null);

    const { user } = useContext(StateContext);


    const itemsPerPage = 10;

    const totalPages = Math.ceil(products && products.length / itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay =
        products && products.length > 0 && products.slice(startIndex, endIndex);


    const EnvData = useMemo(() => itemsToDisplay || [], [itemsToDisplay]);

    const EnvColumn = useMemo(() => [
        // { Header: "ID", accessor: "id" },
        { Header: "Name", accessor: "name" },
        { Header: "Actual Price", accessor: "actualPrice" },
        {
            Header: "Image",
            accessor: "productImg",
            Cell: ({ value }) => <Image src={value} alt="product-image" boxSize="50px" />,
        },
    ], []);

    const tableInstance = useTable({ columns: EnvColumn, data: EnvData });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        tableInstance;

    const handleDelete = async (productId) => {
        setDeleting(true);
        try {
            const response = await httpDelete(`${baseUrl}/store/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            // console.log("Delete response:", response);
            if (response.status === 200) {
                setDeleting(false);
                window.location.reload();
                toast.success("Product deleted successfully");
            }
        } catch (error) {
            setDeleting(false);
            console.log(error.response)
            if (error.response) {
                const errorMessage = error.response.data.data;
                toast.error(errorMessage);
            }
        }
    };


    const handleEdit = (product) => {
        setEditData(product);
        onOpenEdit();
    };

    return (
        <>
            {deleting || isLoading && <CustomSpinner />}
            {products?.length > 0 ? (
                <Table {...getTableProps()} className="noBorder" variant="simple" overflowX={"auto"}>
                    <Thead bgColor="#D0DAF2" borderRadius={"20px"} rounded="20px" fontWeight="600" fontSize={["16px", "18px"]}>
                        {headerGroups.map((headerGroup, header) => (
                            <Tr {...headerGroup.getHeaderGroupProps()} key={header.id}>
                                {headerGroup.headers.map((column, col) => (
                                    <Th {...column.getHeaderProps()} key={col.id} bgColor="shades_9" py="20px" _first={{ borderTopLeftRadius: "16px" }}>
                                        {column.render("Header")}
                                    </Th>
                                ))}
                                <Th borderTopRightRadius="16px">Action</Th>
                            </Tr>
                        ))}
                    </Thead>

                    <Tbody {...getTableBodyProps()} bgColor="white">
                        {rows.map((row) => {
                            prepareRow(row);
                            const { id } = row.original;
                            const productData = row.original;

                            return (
                                <Tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map((cell) => (
                                        <Td {...cell.getCellProps()} key={cell.id}>
                                            {cell.render("Cell")}
                                        </Td>
                                    ))}
                                    <Td>
                                        <Flex gap="10px">
                                            <Icon as={FiEdit} cursor="pointer" boxSize="20px" onClick={() => handleEdit(productData)} />
                                            <Icon as={MdOutlineDelete} cursor="pointer" boxSize="20px" onClick={() => handleDelete(id)} />
                                        </Flex>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            ) : (
                <Text>No product available</Text>
            )}

            {totalPages > 1 && (
                <TablePagination pageCount={totalPages} onPageChange={handlePageChange} />
            )}

            <EditProduct isOpen={isOpenEdit} onOpen={onOpenEdit} onClose={onCloseEdit} data={editData} />
        </>
    );
};

export default Products;
