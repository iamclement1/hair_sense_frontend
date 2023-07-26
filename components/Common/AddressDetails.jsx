import { PrimaryButton } from "@/components/Common";
import CustomInput from "@/components/Common/CustomInput";
import {
    Box,
    Flex,
    Button,
    Divider,
    Icon,
    Text,
    Image,
    Textarea,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Select,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Country, State, City } from "country-state-city";
import { StateContext } from "@/context/StateProvider";
import { useRouter } from "next/router";

const AddressDetails = ({ handleCheckOutStep }) => {
    const router = useRouter();
    const { addressDetails, setAddressDetails, cart } =
        useContext(StateContext);

    
    const [selectedState, setSelectedState] = useState("");

    const cities = City.getCitiesOfState("NG", "KW");

    // if (!cart) {
    //     router.push("/");
    // }

    return (
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
                <Text
                    fontSize={{ base: "13px", md: "15px", xl: "" }}
                    fontWeight="600"
                >
                    1. Address Details
                </Text>
                <Divider mt="8px" />

                <Box>
                    <Formik
                        initialValues={{
                            first_name: addressDetails?.first_name || "",
                            last_name: addressDetails?.last_name || "",
                            phone_number: addressDetails?.phone_number || "",
                            delivery_address_1:
                                addressDetails?.delivery_address_1 || "",
                            delivery_address_2: "",
                            city: addressDetails?.city || "",
                        }}
                        validate={(values) => {
                            let errors = {};
                            if (!values.first_name) {
                                errors.first_name = "First Name is required";
                            }
                            if (!values.last_name) {
                                errors.last_name = "Last Name is required";
                            }
                            if (!values.delivery_address_1) {
                                errors.delivery_address_1 =
                                    "Delivery Address is required";
                            }

                            if (!values.city) {
                                errors.city = "City is required";
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            setAddressDetails(values);
                            handleCheckOutStep(2);
                        }}
                    >
                        {({ handleSubmit, errors, touched, handleChange }) => (
                            <form onSubmit={handleSubmit}>
                                {/* store_name  */}
                                <Flex
                                    flexDir={{
                                        base: "column",
                                        md: "row",
                                    }}
                                    gap={["0px", "20px"]}
                                >
                                    <CustomInput
                                        label="First Name"
                                        name="first_name"
                                        type="text"
                                        placeholder="Enter first name"
                                        errors={errors}
                                        touched={touched}
                                    />

                                    <CustomInput
                                        label="Last name"
                                        name="last_name"
                                        type="text"
                                        placeholder="Enter last name  "
                                        errors={errors}
                                        touched={touched}
                                    />
                                </Flex>

                                <CustomInput
                                    label="Phone Number"
                                    name="phone_number"
                                    type="text"
                                    placeholder="00 0000 0000"
                                    errors={errors}
                                    touched={touched}
                                />
                                {/* Text Arear */}
                                <Box mt="16px">
                                    <FormLabel
                                        htmlFor="delivery_address_1"
                                        fontSize="14px"
                                        color="accent_2"
                                        fontWeight={600}
                                    >
                                        Delivery Address
                                    </FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="delivery_address_1"
                                        name="delivery_address_1"
                                        placeholder="Enter delivery address"
                                        className={
                                            errors.delivery_address_1 &&
                                            touched.delivery_address_1
                                                ? "error"
                                                : ""
                                        }
                                        fontSize="15px"
                                        px={"20px"}
                                        py="12px"
                                        display="inline-block"
                                        _focusVisible={{
                                            border: "1px",
                                            borderColor: "dark_4",
                                        }}
                                        border="1px"
                                        borderColor="dark_4"
                                        rounded="5px"
                                    />
                                    <ErrorMessage
                                        name="delivery_address_1"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box>

                                {/* State */}

                                {/* <Box mt="16px">
                                    <FormLabel
                                        htmlFor="state"
                                        fontSize="14px"
                                        color="accent_2"
                                        fontWeight={600}
                                    >
                                        State
                                    </FormLabel>
                                    <Field
                                        as={Select}
                                        id="state"
                                        name="state"
                                        placeholder="Please select"
                                        className={
                                            errors.state && touched.state
                                                ? "error"
                                                : ""
                                        }
                                        fontSize="15px"
                                        // px={"20px"}
                                        // py="12px"
                                        display="inline-block"
                                        _focusVisible={{
                                            border: "1px",
                                            borderColor: "dark_4",
                                        }}
                                        border="1px"
                                        borderColor="dark_4"
                                        rounded="5px"
                                        onChange={(event) =>
                                            handleStateSelect(
                                                event,
                                                handleChange
                                            )
                                        }
                                    >
                                        {states.map((item, i) => {
                                            return (
                                                <option
                                                    value={item?.name}
                                                    key={i}
                                                >
                                                    {item?.name}
                                                </option>
                                            );
                                        })}
                                    </Field>
                                    <ErrorMessage
                                        name="state"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box> */}

                                {/* City */}

                                <Box mt="16px">
                                    <FormLabel
                                        htmlFor="state"
                                        fontSize="14px"
                                        color="accent_2"
                                        fontWeight={600}
                                    >
                                        City
                                    </FormLabel>
                                    <Field
                                        as={Select}
                                        id="city"
                                        name="city"
                                        placeholder="Please select"
                                        className={
                                            errors.city && touched.city
                                                ? "error"
                                                : ""
                                        }
                                        fontSize="15px"
                                        // px={"20px"}
                                        // py="12px"
                                        display="inline-block"
                                        _focusVisible={{
                                            border: "1px",
                                            borderColor: "dark_4",
                                        }}
                                        border="1px"
                                        borderColor="dark_4"
                                        rounded="5px"
                                    >
                                        {cities.map((item, i) => {
                                            return (
                                                <option
                                                    value={item?.name}
                                                    key={i}
                                                >
                                                    {item?.name}
                                                </option>
                                            );
                                        })}
                                    </Field>
                                    <ErrorMessage
                                        name="city"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box>

                                {/* create new store  */}
                                <Box mt="40px">
                                    <PrimaryButton
                                        text="Continue"
                                        type="submit"
                                    />
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>

            <Box
                mt="50px"
                border={"1px"}
                borderColor={"dark_4"}
                rounded={"5px"}
                px="19px"
                py="15px"
            >
                <Text fontSize={{ base: "13px", md: "15px" }} fontWeight="600">
                    2. Delivery Method
                </Text>
            </Box>

            <Box
                mt="15px"
                border={"1px"}
                borderColor={"dark_4"}
                rounded={"5px"}
                px="19px"
                py="15px"
            >
                <Text fontSize={{ base: "13px", md: "15px" }} fontWeight="600">
                    3. Payment Method
                </Text>
            </Box>
        </Box>
    );
};

export default AddressDetails;
