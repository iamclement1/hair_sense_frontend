import Pagination from "@/components/Common/Pagination";
import ProductBox from "@/components/Common/ProductBox";
import { whatsNew } from "@/utils/dummyData";
import { Box, Divider, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const Category = ({ data }) => {
    return (
        <Box>
            <Box
                mt={["80px", null, null, "100px"]}
                mb={["40px", null, null, "80px"]}
            >
                <Text
                    color="accent_2"
                    fontSize={["16px", null, "25px", null, "40px"]}
                    mb="12px"
                    fontWeight={600}
                    textTransform={"capitalize"}
                >
                    {data}
                </Text>
                <Divider />
            </Box>
            <Box>
                {/* <SimpleGrid columns={[2, 3, 4]}>
                    {whatsNew.map((productData, i) => {
                        return <ProductBox key={i} productData={productData} />;
                    })}
                </SimpleGrid> */}
                <Pagination />
            </Box>
        </Box>
    );
};

export default Category;
