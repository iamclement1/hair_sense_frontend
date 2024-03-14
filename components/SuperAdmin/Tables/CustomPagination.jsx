import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CustomPagination = ({
    rowsPerPage,
    handlePageChange,
    currentPage,
    totalPages,
}) => {
    const getPageButtons = () => {
        const buttons = [];
        const windowSize = 5; // Number of pages to show around current page
        const midpoint = Math.ceil(windowSize / 2);

        // Handle cases where total pages are less than the window size
        if (totalPages <= windowSize) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <Button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        isActive={currentPage === i}
                        rounded="full"
                        bgColor="transparent"
                        p="0"
                        w="fit-content"
                        _active={{
                            bgColor: "primary_1",
                            color: "white",
                            width: "fit-content",
                        }}
                    >
                        {i}
                    </Button>
                );
            }
            return buttons;
        }

        // Handle cases where current page is within the window
        if (currentPage <= midpoint) {
            for (let i = 1; i <= windowSize; i++) {
                buttons.push(
                    <Button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        isActive={currentPage === i}
                        rounded="full"
                        bgColor="transparent"
                        p="0"
                        w="fit-content"
                        _active={{
                            bgColor: "primary_1",
                            color: "white",
                            width: "fit-content",
                        }}
                    >
                        {i}
                    </Button>
                );
            }
            buttons.push(<Text key="ellipsis">...</Text>);
            buttons.push(
                <Button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    rounded="full"
                    bgColor="transparent"
                    p="0"
                    w="fit-content"
                    _active={{
                        bgColor: "primary_1",
                        color: "white",
                        width: "fit-content",
                    }}
                >
                    {totalPages}
                </Button>
            );
        } else if (currentPage >= totalPages - midpoint + 1) {
            buttons.push(
                <Button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    rounded="full"
                    bgColor="transparent"
                    p="0"
                    w="fit-content"
                    _active={{
                        bgColor: "primary_1",
                        color: "white",
                        width: "fit-content",
                    }}
                >
                    1
                </Button>
            );
            buttons.push(<Text key="ellipsis">...</Text>);
            for (let i = totalPages - windowSize + 1; i <= totalPages; i++) {
                buttons.push(
                    <Button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        isActive={currentPage === i}
                        rounded="full"
                        bgColor="transparent"
                        p="0"
                        w="fit-content"
                        _active={{
                            bgColor: "primary_1",
                            color: "white",
                            width: "fit-content",
                        }}
                    >
                        {i}
                    </Button>
                );
            }
        } else {
            buttons.push(
                <Button key={1} onClick={() => handlePageChange(1)}>
                    1
                </Button>
            );
            buttons.push(<Text key="ellipsis">...</Text>);
            for (
                let i = currentPage - midpoint + 1;
                i <= currentPage + midpoint - 1;
                i++
            ) {
                buttons.push(
                    <Button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        isActive={currentPage === i}
                        rounded="full"
                        bgColor="transparent"
                        p="0"
                        w="fit-content"
                        _active={{
                            bgColor: "primary_1",
                            color: "white",
                            width: "fit-content",
                        }}
                    >
                        {i}
                    </Button>
                );
            }
            buttons.push(<Text key="ellipsis">...</Text>);
            buttons.push(
                <Button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    rounded="full"
                    bgColor="transparent"
                    p="0"
                    w="fit-content"
                    _active={{
                        bgColor: "primary_1",
                        color: "white",
                        width: "fit-content",
                    }}
                >
                    {totalPages}
                </Button>
            );
        }

        return buttons;
    };
    return (
        <>
            <Flex
                justifyContent="center"
                alignItems="center"
                bgColor="white"
                rounded="1.625rem"
                py="0.575rem"
                px=".8rem"
                gap=".5rem"
            >
                <IconButton
                    as="button"
                    rounded="full"
                    bg="transparent"
                    icon={<FaChevronLeft />}
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    cursor="pointer"
                    // h="auto"
                    p="0"
                    mr="1rem"
                />
                {getPageButtons()}

                <IconButton
                    as="button"
                    rounded="full"
                    bg="transparent"
                    icon={<FaChevronRight />}
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    cursor="pointer"
                    // h="auto"
                    p="0"
                    ml="1rem"
                />
            </Flex>
        </>
    );
};

export default CustomPagination;
