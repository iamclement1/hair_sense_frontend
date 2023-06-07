import { baseUrl, httpGet } from '@/http-request/http-request';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table';

const Products = () => {
   const [products, setProducts] = useState(null);

   const accessToken = Cookies.get('access_token');

   useEffect(() => {
      async function fetchProduct() {
         const response = await httpGet(`${baseUrl}/store/products`, {
            headers: {
               Authorization: `Bearer ${accessToken}`,
            }
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

   const columns = useMemo(() => [
      {
         Header: 'SN',
         accessor: 'id'
      },
      {
         Header: 'Product Name',
         accessor: 'name'
      },
      {
         Header: 'Product Description',
         accessor: 'first_description'
      },
      {
         Header: 'Product Price',
         accessor: 'actual_price'
      },
      {
         Header: 'Product Image',
         accessor: 'product_img'
      }
   ], [])

   const EnvData = useMemo(() => products, [products])

   const EnvColumn = useMemo(() => {
      if (products && products.length > 0) {
         const validKeys = Object.keys(products[0]).filter(
            key => !["comment", "rate", "commenter", "product", "views"].includes(key)
         );
         return validKeys.map(key => ({
            Header: key,
            accessor: key
         }));
      } else {
         return [];
      }
   }, [products]);


   const tableInstance = useTable({ columns: EnvColumn, data: EnvData });
   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

   return (
      <React.Fragment>
         {products && products.length > 0 ? (
            <Table {...getTableProps()} >
               <Thead variant="simple" bgColor="#D0DAF2">
                  {headerGroups.map((headerGroup, header) => (
                     <Tr {...headerGroup.getHeaderGroupProps()} key={header}>
                        {headerGroup.headers.map((column, col) => (
                           <Th {...column.getHeaderProps()} key={col}>
                              {column.render('Header')}
                           </Th>
                        ))}
                        <Th>Action</Th> {/* Add a column for action buttons */}
                     </Tr>
                  ))}
               </Thead>

               <Tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                     prepareRow(row);
                     return (
                        <Tr {...row.getRowProps()} key={row.id}>
                           {row.cells.map(cell => (
                              <Td {...cell.getCellProps()} key={cell.id}>
                                 {cell.render('Cell')}
                              </Td>
                           ))}
                           <Td>
                              <Button colorScheme="blue" size="sm" mr={2}>
                                 Edit
                              </Button>
                           </Td>
                        </Tr>
                     );
                  })}
               </Tbody>
            </Table>
         ) : (
            <div></div>
         )}
      </React.Fragment>

   )
}

export default Products