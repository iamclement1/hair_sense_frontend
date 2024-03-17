import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { PrimaryButton } from "../Common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import client from "@/context/axiosInstance";

const CreateAdminForm = ({ setActivePage, onClose }) => {

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: (admin) => {
            return client.post("/admin/users", admin);
        },
        onSuccess: (data) => {
            if (data) {
                onClose();
                setActivePage(5)
                toast.success("Admin created successfully");
            }
            queryClient.invalidateQueries({ queryKey: ["alladmin"] });
        },
        onError: (error) => {
            console.log(error)
            toast.error("There is a problem creating the admin, please try again later!");
        },
    });
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                cPassword: "",
                firstName: "",
                lastName: "",
                phone: "",
                role: "",
            }}
            onSubmit={(values) => {
                mutate(values);
            }}
        >
            {({ handleSubmit, errors, touched, values }) => (
                <form onSubmit={handleSubmit}>
                    {/* First name / Last name */}

                    <Flex gap="22px">
                        <FormControl
                            isInvalid={!!errors?.firstName && touched.firstName}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="firstName"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                First Name
                            </FormLabel>
                            <Field
                                as={Input}
                                id="firstName"
                                name="firstName"
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
                                {errors?.firstName}
                            </FormErrorMessage>
                        </FormControl>

                        {/* {" "} */}

                        <FormControl
                            isInvalid={!!errors?.lastName && touched.lastName}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="lastName"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                LastName
                            </FormLabel>
                            <Field
                                as={Input}
                                id="lastName"
                                name="lastName"
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
                                {errors?.lastName}
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
                    <FormControl isInvalid={!!errors?.phone && touched.phone}>
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="phone"
                            mb="8px"
                            mt="4px"
                            fontWeight={"600"}
                        >
                            Phone Number
                        </FormLabel>
                        <Field
                            as={Input}
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Enter Phone Number"
                            fontSize={["12px"]}
                            px={["13px", null]}
                            validate={(value) => {
                                let error;
                                if (value?.length < 1) {
                                    error = "phone is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors?.phone}
                        </FormErrorMessage>
                    </FormControl>
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
                        text="Create Admin"
                        colorScheme="purple"
                        width="full"
                        mt="30px"
                        py="20px"
                        // disabled={loading}
                        isLoading={isPending}
                    />
                </form>
            )}
        </Formik>
    );
};

export default CreateAdminForm;
