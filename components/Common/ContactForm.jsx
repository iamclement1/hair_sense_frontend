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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PrimaryButton } from ".";
import CustomInput from "./CustomInput";

const ContactForm = () => {
    return (
        <Formik
            initialValues={{
                full_name: "",
                email: "",
                message: "",
            }}
            validate={(values) => {
                let errors = {};
                if (!values.full_name) {
                    errors.full_name = "Full Name is required";
                }
                if (!values.email) {
                    errors.email = "Email is required";
                }
                if (!values.message) {
                    errors.message = "Message is required";
                }

                return errors;
            }}
            onSubmit={(values) => {
                handleCheckOutStep(2);
            }}
        >
            {({ handleSubmit, errors, touched, isValid, dirty }) => (
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Flex
                        flexDir={{
                            base: "column",
                            md: "row",
                        }}
                        gap={["0px", "20px"]}
                        w="100%"
                    >
                        <CustomInput
                            label="Full Name"
                            name="full_name"
                            type="text"
                            placeholder="John Doe"
                            errors={errors}
                            touched={touched}
                        />

                        <CustomInput
                            label="Email"
                            name="email"
                            type="email "
                            placeholder="Enter your Email"
                            errors={errors}
                            touched={touched}
                        />
                    </Flex>

                    {/* Text Arear */}
                    <Box mt="35px">
                        <Field
                            as={Textarea}
                            id="message"
                            name="message"
                            placeholder="Please describe your request here"
                            className={
                                errors.message && touched.message ? "error" : ""
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
                            h="242px"
                        />
                        <ErrorMessage
                            name="message"
                            component="div"
                            className="error-message"
                        />
                    </Box>

                    {/* create new store  */}
                    <Box mt="40px">
                        <PrimaryButton
                            text="Submit"
                            type="submit"
                            maxW="300px"
                        />
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default ContactForm;
