import { PrimaryButton, ProductSlider, StarRating } from "@/components/Common";
import { SecondaryButton } from "@/components/Common/Button";
import CartModal from "@/components/modal/CartModal";
import { CartContext } from "@/context/StateProvider";
import { Box, Flex, Image, Text, Divider, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
    const router = useRouter()

    const url = router.asPath
    const { onOpen,
        isOpen,
        onClose, } = useDisclosure()

    const [prod, setProd] = useState();

    useEffect(() => {
        let getProductDetails = sessionStorage.getItem("current_product");
        if (getProductDetails) {
            setProd(JSON.parse(getProductDetails));
        }

    }, [url]);

    // cart context
    const GlobalCart = useContext(CartContext);
    const prevCartStateRef = useRef(GlobalCart.state);
    const handleAddToCart = async (event) => {
        // //add item to sessionStorage
        const dispatch = GlobalCart.dispatch;
        dispatch({
            type: "ADD_ITEM_TO_CART",
            payload: {
                product: prod,
            },
        });

        // Retrieve the existing cart items from sessionStorage
        const existingCartItems =
            JSON.parse(sessionStorage.getItem("cart")) || [];

        // Check if the item already exists in sessionStorage
        const isItemInLocalStorage = existingCartItems.some(
            (item) => item.id === prod?.id
        );

        if (isItemInLocalStorage) {
            toast.error("Item already exists in the cart");
        }
        else {
            // Add the new product to the cart items array
            const updatedCartItems = [...existingCartItems, prod];
            // Save the updated cart items to sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
            toast.success("Item added succesfully");
        }
    };


    useEffect(() => {
        if (prevCartStateRef.current !== GlobalCart.state) {

            prevCartStateRef.current = GlobalCart.state;

        }
    }, [GlobalCart.state]);


    const handleBuyNow = () => {
        handleAddToCart()
        onOpen()

    }


    return (

        <Box>
            <CartModal onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose} />

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
                                    src={prod?.productImg}
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
                                        {prod?.name}
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
                                            {prod?.actualPrice}
                                        </Text>
                                    </Box>

                                    <Divider my={["14px", null, "18px"]} />
                                </Box>

                                <Flex align="center" gap="10px" mt={["18px", null, "35px"]}>
                                    <SecondaryButton
                                        text="Add to Cart"
                                        handleButton={() => {

                                            handleAddToCart()
                                        }}
                                    />
                                    <PrimaryButton
                                        text="Buy Now"
                                        handleButton={handleBuyNow}
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
