import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { PrimaryButton } from "../Common";

const CreateAdminForm = () => {
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                cPassword: "",
                fName: "",
                lName: "",
                role: "",
            }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {({ handleSubmit, errors, touched, values }) => (
                <form onSubmit={handleSubmit}>
                    {/* First name / Last name */}

                    <Flex gap="22px">
                        <FormControl
                            isInvalid={!!errors?.fName && touched.fName}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="fName"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                First Name
                            </FormLabel>
                            <Field
                                as={Input}
                                id="fName"
                                name="fName"
                                type="text"
                                placeholder="John"
                                fontSize={["12px"]}
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;
                                    if (value?.length < 1) {
                                        error = "First Name is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors?.fName}
                            </FormErrorMessage>
                        </FormControl>

                        {/* {" "} */}

                        <FormControl
                            isInvalid={!!errors?.lName && touched.lName}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="lName"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Email
                            </FormLabel>
                            <Field
                                as={Input}
                                id="lName"
                                name="lName"
                                type="text"
                                placeholder="Enter your Email"
                                fontSize={["12px"]}
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;
                                    if (value?.length < 1) {
                                        error = "Last Name is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors?.lName}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    {/* {"Email address"} */}

                    <FormControl
                        isInvalid={!!errors?.email && touched.email}
                        mt="16px"
                    >
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="email"
                            mb="8px"
                            fontWeight={"600"}
                        >
                            Email
                        </FormLabel>
                        <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                            fontSize={["12px"]}
                            px={["13px", null]}
                            validate={(value) => {
                                let error;
                                if (value?.length < 1) {
                                    error = "email is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors?.email}
                        </FormErrorMessage>
                    </FormControl>

                    {/* {"Password & Confirm Password"} */}

                    <Flex gap="22px" mt="16px">
                        <FormControl
                            isInvalid={!!errors?.password && touched.password}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="password"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Password
                            </FormLabel>
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                type="password"
                                placeholder="********"
                                fontSize={["12px"]}
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;
                                    if (value?.length < 1) {
                                        error = "password is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors?.password}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={!!errors?.cPassword && touched.cPassword}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="cPassword"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Confirm Password
                            </FormLabel>
                            <Field
                                as={Input}
                                id="cPassword"
                                name="cPassword"
                                type="password"
                                placeholder="*********"
                                fontSize={["12px"]}
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;
                                    if (value?.length < 1) {
                                        error = "Password does not match";
                                    }
                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors?.cPassword}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    {/* {"Role Type"} */}

                    <FormControl isInvalid={!!errors?.role && touched.role}>
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="role"
                            mb="8px"
                            fontWeight={"600"}
                        >
                            Role
                        </FormLabel>
                        <Field
                            as={Input}
                            id="role"
                            name="role"
                            type="text"
                            placeholder="Type Admin"
                            fontSize={["12px"]}
                            px={["13px", null]}
                            validate={(value) => {
                                let error;
                                if (value?.length < 1) {
                                    error = "role is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors?.role}
                        </FormErrorMessage>
                    </FormControl>

                    <PrimaryButton
                        type="submit"
                        text="Login"
                        colorScheme="purple"
                        width="full"
                        mt="30px"
                        py="20px"
                        // disabled={loading}
                        // isLoading={loading}
                    />
                </form>
            )}
        </Formik>
    );
};

export default CreateAdminForm;
