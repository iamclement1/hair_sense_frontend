import {
    Box,
    Flex,
    Icon,
    Image,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";

import { BsHeart, BsHeartFill, AiOutlineShoppingCart } from "react-icons/bs";
import { StarRating } from ".";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { baseUrl, httpPost } from "@/http-request/http-request";
import { CartContext, StateContext } from "@/context/StateProvider";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const ProductBox = ({ productData }, isLiked) => {
    const router = useRouter();
    // const { id, imageUrl, text, rating, price } = productData;
    const { products, cart, setCart, user } = useContext(StateContext);
    // console.log("hey dude find the products here",products)
    // console.log(user);
    const {
        id,
        name,
        actual_price,
        sales_price,
        // first_description,
        desc,
        product_img,
    } = productData;

    const handleAddFavorite = async (event) => {
        event.stopPropagation();
        const data = {
            product: productData.id,
        };

        await httpPost(`${baseUrl}/store/favourite/items/`, data)
            .then((response) => {
                if (response && response.status === 201) {
                    // console.log(response);
                    toast.success(" Favorite item added successfully");
                } else {
                    toast.error("Please login to add item as favorite!");
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log("favorite item added");
        // console.log("favorite item details will be ", productData);
        // console.log("favorite item ID will be ", productData && productData.id);
    };

    //cart context
    const GlobalCart = useContext(CartContext);
    const prevCartStateRef = useRef(GlobalCart.state);

    const handleAddToCart = (event) => {
        event.stopPropagation();
        const dispatch = GlobalCart.dispatch;

        // Check if the product ID already exists in the cart
        const isItemExist = GlobalCart.state.some(
            (item) => item.id === productData.id
        );

        // Check if the item already exists in localStorage
        const existingCartData = JSON.parse(localStorage.getItem("cart")) || [];
        const isItemInLocalStorage = existingCartData.some(
            (item) => item.id === productData.id
        );

        if (isItemExist) {
            toast.error("Item already exists in the cart");
        } else if (isItemInLocalStorage) {
            toast.error("Item already exists in the localStorage");
        } else {
            dispatch({
                type: "ADD_ITEM_TO_CART",
                payload: {
                    product: productData,
                },
            });
            toast.success("Item added successfully");

            // Update the cart data in localStorage
            localStorage.setItem(
                "cart",
                JSON.stringify([...existingCartData, productData])
            );
        }
    };

    useEffect(() => {
        localStorage.setItem("cartState", JSON.stringify(GlobalCart.state));
        const stateCart = localStorage.getItem("cartState");
        // console.log(stateCart);
    }, [GlobalCart.state]);

    // console.log(GlobalCart.state); // Log the updated state
    // const dispatch = GlobalCart.dispatch;
    function handleProductDetails(productData) {
        // OnClick of the whole box the Box detaill will be open on the new product Details page.
        localStorage.setItem("current_product", JSON.stringify(productData));
        router.push(`/product_details/${productData.name}`);
        console.log("Here is the product data", productData);
    }
    return (
        <Box onClick={() => handleProductDetails(productData)}>
            <Box
                cursor={"pointer"}
                bgColor=""
                maxW="272px"
                textAlign={"center"}
                // mx="auto"
            >
                <Flex w="100%" mx="auto" maxW="247px" pos={"relative"}>
                    <Image
                        mx="auto"
                        boxSize={["137px", null, "200px", "247px"]}
                        objectFit="cover"
                        src={product_img}
                        display="inline-block"
                        alt={name}
                        fallbackSrc="https://via.placeholder.com/150"
                    />
                    {/* Add to favourite ICON */}
                    <Popover trigger="hover">
                        <PopoverTrigger>
                            <Icon
                                as={!isLiked ? BsHeartFill : BsHeart}
                                cursor={"pointer"}
                                color={!isLiked ? "gray" : "gray"}
                                pos={"absolute"}
                                top={3}
                                right={3}
                                onClick={handleAddFavorite}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            bgColor="White"
                            w="fit-content"
                            rounded="200px"
                            fontSize="12px"
                            px="20px"
                            py="5px"
                        >
                            <PopoverArrow />
                            Add to Favourite
                        </PopoverContent>
                    </Popover>

                    {/* Add to Cart ICON */}

                    <Popover trigger="hover">
                        <PopoverTrigger>
                            <Icon
                                as={FaShoppingCart}
                                cursor={"pointer"}
                                color={!true ? "primary_1" : "accent_2"}
                                pos={"absolute"}
                                top={10}
                                right={3}
                                onClick={handleAddToCart}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            bgColor="White"
                            w="fit-content"
                            rounded="200px"
                            fontSize="12px"
                            px="20px"
                            py="5px"
                        >
                            <PopoverArrow />
                            Add to Cart
                        </PopoverContent>
                    </Popover>
                </Flex>
                <Box mt="1.24rem" textAlign="center">
                    <Text
                        fontSize={["13px", null, "14px", "16px"]}
                        noOfLines={2}
                        h="3rem"
                    >
                        {desc}
                    </Text>
                    <Flex mt="13px" justify="center">
                        {/* <Icon as={AiFillStar} /> */}
                        <StarRating rating={3.5} />
                    </Flex>
                    <Text
                        mt="10px"
                        fontSize={["18px", null, "24px"]}
                        fontWeight={600}
                    >
                        ₦{actual_price}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductBox;
