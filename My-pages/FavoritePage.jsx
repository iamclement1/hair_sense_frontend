"use client";
import { ProductSlider } from "@/components/Common";
import ProductBox from "@/components/Common/ProductBox";
import { StateContext } from "@/context/StateProvider";
import { baseUrl } from "@/http-request/http-request";

import {
    Box,
    CloseButton,
    Divider,
    Flex,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const FavouritePage = () => {
    const [fav, setFav] = useState([]);
    const { user } = useContext(StateContext);


    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        async function fetchFavorite() {
            const response = await axios.get(`${baseUrl}/store/favourite/`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            });
            if (response?.data && response.status === 200) {
                setFav(
                    response?.data?.data.favourite
                );
            }
        }

        if (fav.length < 1) {
            fetchFavorite();
        }
    }, []); //eslint-disable-line


    return (
        <Box pt={["40px", null, "40px"]}>
            <Box>
                <Flex justify="space-between" align="center">
                    <Text
                        color="accent_2"
                        fontSize={["16px", null, "25px", null, "40px"]}
                        mb="12px"
                        fontWeight={600}
                        textTransform={"capitalize"}
                    >
                        Favourite
                    </Text>

                    <CloseButton _hover={{}} />
                </Flex>
                <Divider />
                {/* Favourite List  */}
                <Box mt={["30px", null, "40px", "50px"]}>
                    <SimpleGrid
                        columns={[2, 3, 4]}
                        spacingY={["30px", null, "50px"]}
                    >
                        {fav?.map((item, i) => {

                            return (
                                <ProductBox
                                    isLiked="true"
                                    productData={item?.product}
                                    key={i}
                                />
                            );
                        })}
                    </SimpleGrid>
                </Box>

                {/* Clients Also Bought */}
                <Box>
                    <ProductSlider
                        section="Clients Also Bought"
                        type="other"
                        productDatas={[]}
                    />
                </Box>

                {/* Related Products */}
                <Box>
                    <ProductSlider
                        section="Related Product"
                        type="other"
                        productDatas={[]}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default FavouritePage;
