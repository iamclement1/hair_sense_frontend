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
import React from "react";
import { FaTimes } from "react-icons/fa";

const AddressDetails = ({ handleCheckOutStep }) => {
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
                            first_name: "",
                            last_name: "",
                            phone_number: "",
                            delivery_address_1: "",
                            delivery_address_2: "",
                            state: "",
                            city: "",
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
                            if (!values.state) {
                                errors.state = "State is required";
                            }
                            if (!values.city) {
                                errors.city = "City is required";
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            handleCheckOutStep(2);
                        }}
                    >
                        {({
                            handleSubmit,
                            errors,
                            touched,
                            isValid,
                            dirty,
                        }) => (
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

                                <Box mt="16px">
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
                                    >
                                        <option value="admin">State 1</option>
                                        <option value="user">State 2</option>
                                    </Field>
                                    <ErrorMessage
                                        name="state"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box>

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
                                        <option value="admin">City 1</option>
                                        <option value="user">City 2</option>
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
