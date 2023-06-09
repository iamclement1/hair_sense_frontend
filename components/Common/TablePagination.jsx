import { Flex } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

const TablePagination = ({ pageCount, onPageChange }) => {
   const handlePageClick = (data) => {
      const selectedPage = data.selected + 1;
      onPageChange(selectedPage);
   };

   return (
      <ReactPaginate
         pageCount={pageCount}
         onPageChange={handlePageClick}
         previousLabel={
            <Flex align="center">
               <BsArrowLeftSquareFill />
               Previous
            </Flex>
         }
         nextLabel={
            <Flex align="center">
               Next
               <BsArrowRightSquareFill />
            </Flex>
         }
         breakLabel={"..."}
         marginPagesDisplayed={2}
         containerClassName={"flex justify-center mt-8"}
         pageClassName={"mr-1"}
         previousClassName={"mr-1 "}
         nextClassName={"mr-1"}
         activeClassName={"font-bold"}
         disabledClassName={"opacity-50 cursor-not-allowed"}
         previousLinkClassName={"px-4 py-2 bg-[#FFCB03] text-black rounded"}
         nextLinkClassName={"px-4 py-2 bg-[#FFCB03] text-black rounded"}
         pageLinkClassName={"px-4 py-2 bg-white text-black rounded"}
      />
   );
};

export default TablePagination;
