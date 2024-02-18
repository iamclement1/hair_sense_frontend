import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import AddressDetailsPreview from "./AddressDetailsPreview";
import DeliveryDetailsPreview from "./DeliveryDetailsPreview";
import { PrimaryButton } from ".";
import { useRouter } from "next/router";
import { StateContext } from "@/context/StateProvider";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "@/http-request/http-request";

const PaymentMethod = ({ handleCheckOutStep }) => {


    const router = useRouter();

    const { addressDetails, deliveryMethod, user, loading, setLoading } =
        useContext(StateContext);

    const cartItems = JSON.parse(sessionStorage.getItem("cart"));

    if (!addressDetails) {
        handleCheckOutStep(1);
    }

    // delivery fee
    let deliverFee = deliveryMethod === "Pickup" ? 0.0 : 1200;
    //Get subtotal price
    let subTotal = 0;
    const semiSubTotal = cartItems?.map((item) => {
        return item.quantity * item.actualPrice;
    });

    // Adding all the prices together using a for-of loop
    for (const price of semiSubTotal) {
        subTotal += price;
    }

    let totalBill = subTotal + deliverFee;

    const formData = {
        firstName: addressDetails?.firstName,
        lastName: addressDetails?.lastName,
        phone: addressDetails?.phone,
        address: addressDetails?.address,
        state: "Kwara",
        city: addressDetails?.city,
        method: deliveryMethod,
        amount: totalBill,
    };


    //handle checkout payment button with paystack
    const sendCheckoutDetails = async () => {
        setLoading(true);


        await axios
            .post(`${baseUrl}/store/order/`, formData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((response) => {
                //success callback

                console.log(response)
                if (response?.data.status === 200) {
                    toast.success(
                        "Successful... You will now been Redirected to the payment page"
                    );

                    setLoading(false);
                    router.push(`${response?.data?.data?.url}`);
                }
            })
            .catch((error) => {

                setLoading(false);

                toast.error(error.message);
            }).finally(() => setLoading(false))
    };

    return (
        <Box>
            <AddressDetailsPreview
                handleCheckOutStep={handleCheckOutStep}
                addressDetails={addressDetails}
            />

            <Box>
                <DeliveryDetailsPreview
                    handleCheckOutStep={handleCheckOutStep}
                />
            </Box>

            <Box>
                <Box
                    mt="52px"
                    w="100%"
                    border="1px"
                    borderColor="dark_4"
                    rounded="6px"
                    p="20px"
                    pb="40px"
                >
                    <Flex align="center" justify={"space-between"}>
                        {" "}
                        <Text
                            fontSize={{ base: "18px", md: "15px", xl: "" }}
                            fontWeight="600"
                        >
                            Order Summary
                        </Text>
                    </Flex>
                    <Divider mt="8px" />
                    {/* *********** */}

                    <Box>
                        <Flex align={"center"} justify={"space-between"}>
                            <Text fontSize={["16px", "15px"]}>Subtotal</Text>
                            <Text fontSize={["16px", "21px"]} fontWeight={600}>
                                ₦ {subTotal}
                            </Text>
                        </Flex>

                        <Flex
                            mt="15px"
                            align={"center"}
                            justify={"space-between"}
                            fontWeight={"400"}
                        >
                            <Text fontSize={["16px", "15px"]}>
                                Delivery fee
                            </Text>
                            <Text fontSize={["16px", "21px"]} fontWeight={600}>
                                ₦ {deliverFee}
                            </Text>
                        </Flex>
                    </Box>

                    <Divider my="17px" />
                    <Flex
                        align={"center"}
                        justify={"space-between"}
                        fontWeight={600}
                    >
                        <Text fontSize={["16px", "15px"]}>Total</Text>
                        <Text fontSize={["16px", "21px"]}>₦ {totalBill}</Text>
                    </Flex>

                    {/* Button Section  */}

                    <Box mt="30px">
                        <PrimaryButton
                            text="Make Payment"
                            w="100%"
                            handleButton={sendCheckoutDetails}
                            isLoading={loading}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
