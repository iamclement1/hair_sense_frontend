import { PrimaryButton, ProductSlider, StarRating } from "@/components/Common";
import { SecondaryButton } from "@/components/Common/Button";
import { CartContext } from "@/context/StateProvider";
import { Box, Flex, Image, Text, Divider, Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";

const ProductDetails = ({ productData }) => {
    const [prod, setProd] = useState();

    useEffect(() => {
        let getProductDetails = localStorage.getItem("current_product");
        if (getProductDetails) {
            setProd(JSON.parse(getProductDetails));
        }
        // console.log(prod);
    }, [prod]);

    // cart context
    const GlobalCart = useContext(CartContext);
    const prevCartStateRef = useRef(GlobalCart.state);
    const handleAddToCart = async (event) => {
        // //add item to localstorage
        const dispatch = GlobalCart.dispatch;
        dispatch({
            type: "ADD_ITEM_TO_CART",
            payload: {
                product: prod,
            },
        });

        // Retrieve the existing cart items from localStorage
        const existingCartItems =
            JSON.parse(localStorage.getItem("cartItems")) || [];

        // Add the new product to the cart items array
        const updatedCartItems = [...existingCartItems, productData];

        // Save the updated cart items to localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        console.log("Updated cart items");
    };

    useEffect(() => {
        if (prevCartStateRef.current !== GlobalCart.state) {
            // setCart(GlobalCart.state);
            prevCartStateRef.current = GlobalCart.state;
            // console.log(GlobalCart.state); // Log the updated state
        }
    }, [GlobalCart.state]);

    return (

        <Box>
            {
                prod && (

                    <main>
                        <Flex
                            align="center"
                            justify="center"
                            flexDir={["column", "row"]}
                            gap={["40px", "0px"]}
                            mt={["32px", null, "100px"]}
                        >
                            <Box w="100%">
                                <Image
                                    src={prod.product_img}
                                    display="block"
                                    mx="auto"
                                    alt=""
                                    w="50%"
                                    h="50%"
                                    maxW={["232px", "571px"]}
                                    maxH={["232px", "471px"]}
                                />
                            </Box>
                            <Box w="100%">
                                <Box>
                                    <Text
                                        fontSize={["20px", null, "30px", null, "38px"]}
                                        fontWeight="600"
                                    >
                                        {prod.name}
                                    </Text>
                                    <Box mt={["16px", null, null, "20px"]}>
                                        <StarRating rating={4.5} />
                                    </Box>

                                    <Box mt="18px">
                                        <Text
                                            fontSize={["20px", null, "28px", null, "32px"]}
                                            fontWeight="600"
                                            color="primary_1"
                                        >
                                            {prod.actual_price}
                                        </Text>
                                    </Box>

                                    <Divider my={["14px", null, "18px"]} />
                                </Box>

                                <Flex align="center" gap="10px" mt={["18px", null, "35px"]}>
                                    <SecondaryButton
                                        text="Add to Cart"
                                        onClick={handleAddToCart}
                                    />
                                    <PrimaryButton
                                        text="Buy Now"
                                        onClick={handleAddToCart}
                                    />
                                </Flex>
                            </Box>
                        </Flex>
                        {/* Describtion */}

                        <Box>
                            <Box
                                mt={["80px", null, null, "100px"]}
                                mb={["40px", null, null, "80px"]}
                            >
                                <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                                    <Divider />
                                    <Text
                                        flexShrink={0}
                                        fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                                        fontWeight={600}
                                        color="accent_2"
                                    >
                                        Description
                                    </Text>
                                    <Divider />
                                </Flex>
                            </Box>

                            <Flex
                                gap="20px"
                                flexDir={["column", null, "row"]}
                                align="center"
                                justify="center"
                            >
                                {/* firat row */}
                                <Box w="100%">
                                    <Text fontWeight="600" fontSize="24px">
                                        Why you need this product?
                                    </Text>

                                    <Box>
                                        <Text fontWeight="600" fontSize="18px" mt="18px">
                                            Weightless Texture
                                        </Text>

                                        <Text>
                                            This sunscreen has an essence-cream structure
                                            that makes it spread and absorb quickly. All day
                                            long, the skin feels comfortable because to the
                                            lightweight and breathable material.
                                        </Text>
                                    </Box>

                                    <Box>
                                        <Text fontWeight="600" fontSize="18px" mt="18px">
                                            Nourishing & Moisturizing
                                        </Text>

                                        <Text>
                                            It is made with marine algae extract and beet
                                            root extract to hydrate and revitalize your
                                            skin.
                                        </Text>
                                    </Box>
                                </Box>
                                {/* Second row */}
                                <Box
                                    bgColor="gray.200"
                                    display={["none", null, "block"]}
                                    minH="100%"
                                    // border="1px"
                                    w="100%"
                                    alignSelf="stretch"
                                    maxW="1px"
                                />
                                {/* Third row */}

                                <Box w="100%">
                                    Watch your skin improve by using this vegan sunscreen
                                    right away! the Hyggee Vegan Sun Cream has five
                                    different chemical UV filter types that provide maximum
                                    protection without leaving a white cast. They also
                                    provide long-lasting hydration to keep skin hydrated and
                                    happy throughout the day.
                                </Box>
                            </Flex>
                        </Box>
                    </main>
                )
            }


            {/* **********Other Component ************** */}

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
    );
};

export default ProductDetails;
