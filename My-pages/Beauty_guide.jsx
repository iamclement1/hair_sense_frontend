import {
    Box,
    Divider,
    Flex,
    Icon,
    ListItem,
    OrderedList,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const Beauty_guide = () => {
    return (
        <Box>
            <Box
                mt={["59px", null, null, "60px"]}
                mb={["40px", null, null, "59px"]}
            >
                <Flex align="center" justify="space-between" w="100%">
                    <Text
                        fontSize={{ base: "16px", md: "20px", xl: "30px" }}
                        fontWeight="600"
                        color="accent_2"
                    >
                        Beauty Guide
                    </Text>
                    <Icon as={FaTimes} />
                </Flex>
                <Divider mt="10px" />
            </Box>
            <Box>
                <Box mt="30px">
                    <Box>
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            fontWeight={"600"}
                        >
                            The Ultimate Guide to Healthy and Beautiful Hair
                        </Text>
                        <Box
                            fontSize={["0.87rem", null, "1rem"]}
                            mt="1.3rem"
                            lineHeight={"1.95313rem"}
                        >
                            <Text>
                                {` Welcome to our comprehensive guide for achieving
                                healthy and beautiful hair. Whether you're
                                looking to enhance your natural locks, address
                                specific hair concerns, or experiment with new
                                styles, we've got you covered. Read on to
                                discover expert tips, product recommendations,
                                and step-by-step tutorials to help you achieve
                                your hair goals. Understanding Your Hair Type To
                                care for your hair effectively, it's crucial to
                                understand your hair type.`}
                            </Text>
                            <Box mt="0.8rem">
                                <Text>
                                    Here are the main hair types and their
                                    characteristics:
                                </Text>
                                <OrderedList mt="1.5rem">
                                    <ListItem>
                                        Straight Hair: Learn how to add volume
                                        and maintain sleekness.
                                    </ListItem>
                                    <ListItem>
                                        Curly Hair: Embrace your curls and find
                                        out how to enhance their definition and
                                        manage frizz.
                                    </ListItem>
                                    <ListItem>
                                        Wavy Hair: Discover styling techniques
                                        to maximize your waves and create
                                        effortless beachy looks.
                                    </ListItem>
                                </OrderedList>
                            </Box>

                            <Box mt="0.8rem">
                                <Text>
                                    Building a Daily Hair Care Routine A
                                    consistent hair care routine is the
                                    foundation of healthy hair. Follow these
                                    steps for optimal results:
                                </Text>
                                <OrderedList mt="1.5rem">
                                    <ListItem>
                                        Choosing the Right Shampoo and
                                        Conditioner: Find the perfect products
                                        for your hair type and concerns, such as
                                        hydrating shampoos or color-safe
                                        formulas.
                                    </ListItem>
                                    <ListItem>
                                        Washing Techniques: Master the art of
                                        proper hair washing to avoid product
                                        buildup and maintain a balanced scalp.
                                    </ListItem>
                                    <ListItem>
                                        Conditioning Tips: Learn how to
                                        effectively condition your hair,
                                        focusing on the ends and incorporating
                                        deep conditioning treatments for added
                                        nourishment.
                                    </ListItem>
                                    <ListItem>
                                        Styling and Protecting: Discover how to
                                        protect your hair from heat damage,
                                        minimize breakage, and create
                                        long-lasting styles.
                                    </ListItem>
                                </OrderedList>
                            </Box>

                            <Box mt="0.8rem">
                                <Text>
                                    Styling Techniques and Tools Elevate your
                                    hair game with these styling techniques and
                                    tools:
                                </Text>
                                <OrderedList mt="1.5rem">
                                    <ListItem>
                                        Heat Styling: Master the art of using
                                        flat irons, curling wands, and hair
                                        dryers to achieve different looks while
                                        minimizing damage.
                                    </ListItem>
                                    <ListItem>
                                        Braiding and Updos: Explore various
                                        braid styles, from classic French braids
                                        to intricate fishtail braids. Get
                                        step-by-step instructions for elegant
                                        updos suitable for special occasions.
                                    </ListItem>
                                    <ListItem>
                                        Hair Accessories: Discover the
                                        transformative power of hair
                                        accessories, including headbands, clips,
                                        and barrettes. Learn how to incorporate
                                        them into your hairstyles for added
                                        flair.
                                    </ListItem>
                                </OrderedList>
                            </Box>

                            <Box mt="0.8rem">
                                <Text>
                                    Addressing Common Hair Concerns {`Let's`}{" "}
                                    tackle some common hair concerns and offer
                                    solutions:
                                </Text>
                                <OrderedList mt="1.5rem">
                                    <ListItem>
                                        Frizz Management: Combat frizz with
                                        anti-frizz serums, smoothing treatments,
                                        and humidity-resistant hairstyles.
                                    </ListItem>
                                    <ListItem>
                                        Dry Hair Remedies: Restore moisture to
                                        dry locks with hydrating masks, leave-in
                                        conditioners, and natural oil
                                        treatments.
                                    </ListItem>
                                    <ListItem>
                                        Repairing Damaged Hair: Revitalize
                                        damaged hair with reconstructive
                                        treatments, protein-rich products, and
                                        gentle care practices.
                                    </ListItem>
                                    <ListItem>
                                        Promoting Hair Growth: Explore tips for
                                        promoting healthy hair growth, such as
                                        scalp massages, biotin supplements, and
                                        specialized hair growth products.
                                    </ListItem>
                                </OrderedList>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Beauty_guide;
