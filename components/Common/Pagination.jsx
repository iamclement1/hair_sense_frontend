import { Box, Text, Button, SimpleGrid, Flex } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { whatsNew } from "@/utils/dummyData";
import ProductBox from "./ProductBox";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ITEMS_PER_PAGE = 16;

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const RenderBoxes = () => {
        const start = currentPage * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const boxesOnPage = whatsNew && whatsNew.slice(start, end);
        return (
            <SimpleGrid
                columns={[2, 3, 4]}
                spacingY={["40px", null, null, "60px"]}
            >
                {boxesOnPage.map((item, i) => (
                    <ProductBox key={i} productData={item} />
                ))}
            </SimpleGrid>
        );
    };

    return (
        <>
            <RenderBoxes />
            <Flex
                mt={["30px", null, null, "50px"]}
                justify={"center"}
                align={"center"}
            >
                <Box>
                    <ReactPaginate
                        previousLabel={
                            <Box>
                                <FaChevronLeft mr={2} color="accent_7" />
                            </Box>
                        }
                        nextLabel={
                            <Box>
                                <FaChevronRight ml={2} color="accent_7" />
                            </Box>
                        }
                        breakLabel={"..."}
                        breakClassName="break-me"
                        pageCount={Math.ceil(whatsNew.length / ITEMS_PER_PAGE)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageChange}
                        containerClassName="cont"
                        activeClassName="active"
                    />
                </Box>
            </Flex>
        </>
    );
};

export default Pagination;
