import React, { useContext, useState } from "react";
import {
    Box,
    Divider,
    Flex,
    Text,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Icon,
} from "@chakra-ui/react";
import { PrimaryButton } from "../Common/Button";
import { Formik, Field } from "formik";
import { baseUrl } from "@/http-request/http-request";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import { StateContext } from "@/context/StateProvider";

const AuthModal = ({ isOpen, onClose }) => {
    const [currentPage, setCurrentPage] = useState("login");
    const handleCurrentForm = (page) => {
        setCurrentPage(page);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalOverlay />
            <ModalContent
                bgColor={"white"}
                mx={["16px"]}
                px={["0px", null, "64px"]}
                py={["83px", null, "100px"]}
                rounded={["12px", null, "none"]}
            >
                <ModalCloseButton
                    border={"1px"}
                    rounded={"full"}
                    top={["20px", null, "50px"]}
                    right={["14px", null, "34px"]}
                />
                <Box
                    bgColor={""}
                    pos={"relative"}
                    w={"100%"}
                    maxW={["100%", null, "100%", "533px"]}
                    mx="auto"
                >
                    {" "}
                    <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                        <Divider />
                        <Text
                            flexShrink={0}
                            fontSize={["18px", null, "40px"]}
                            fontWeight={600}
                            color="accent_2"
                        >
                            {currentPage === "login"
                                ? "Welcome Back"
                                : currentPage === "register"
                                    ? "Create An Account"
                                    : "Recover your Password"}
                        </Text>
                        <Divider />
                    </Flex>
                    <Box
                        mt={["0px", null, "40px"]}
                        pt={["24px", null, "34px"]}
                        pb={["0px", null, "54px"]}
                        border={"1px"}
                        borderColor={["transparent", null, "dark_1"]}
                        rounded={"12px"}
                        px={["20px", null, "30px"]}
                    >
                        {/* ************* */}
                        {/* Form Are being Use here  Check the Components Below for forms */}
                        {currentPage === "login" ? (
                            <Login
                                handleCurrentForm={handleCurrentForm}
                                onClose={onClose}
                            />
                        ) : currentPage === "register" ? (
                            <Register handleCurrentForm={handleCurrentForm} />
                        ) : currentPage === "forgetPassword" ? (
                            "forget password Form  will be here"
                        ) : (
                            ""
                        )}

                        {/* ************    * */}

                        {/* <Box>
                            {currentPage === "login" && <SignInWithSocials />}
                        </Box> */}
                        <Box>
                            <Box
                                fontSize={"14px"}
                                textAlign={"center"}
                                onClick={() => {
                                    currentPage === "login"
                                        ? handleCurrentForm("register")
                                        : currentPage === "register"
                                            ? handleCurrentForm("login")
                                            : handleCurrentForm("login");
                                }}
                            >
                                {currentPage === "login"
                                    ? "Don’t have an account? "
                                    : currentPage === "register"
                                        ? "Already have an account? "
                                        : "Already have an account? "}
                                <Box
                                    as="button"
                                    color="accent_2"
                                    fontWeight={"600"}
                                >
                                    {currentPage === "login"
                                        ? "Sign up"
                                        : currentPage === "register"
                                            ? "Sign in"
                                            : "Sign in"}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;

// Forms Start
const Login = ({ handleCurrentForm, onClose }) => {
    const router = useRouter();
    const [showPassWord, setShowPassWord] = useState(false);
    const { isLoading, setIsLoading, setUser } = useContext(StateContext);

    //show password
    const togglePassword = () => {
        setShowPassWord(!showPassWord);
    };


    const loginUser = async (values) => {
        setIsLoading(true);
        const formData = {
            email: values.email,
            password: values.password,
        };

        try {
            const response = await axios.post(`${baseUrl}/accounts/sign_in/`, formData);
            const { access, refresh, role } = response.data.data;

            if (role === "client") {
                setIsLoading(false);

                handleClientLogin(access, refresh);
            } else if (role === "admin") {
                setIsLoading(false);
                handleAdminLogin(access, refresh);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error.response)
            if (error.response) {
                const errorMessage = error.response.data.data;
                toast.error(errorMessage);
            }
        }
    };

    const setAccessTokenSessionStorage = (access, refresh) => {
        sessionStorage.setItem("refreshToken", refresh);
        sessionStorage.setItem("access_token", access);
    };
    const handleClientLogin = (access, refresh) => {
        setAccessTokenSessionStorage(access, refresh);
        sessionStorage.setItem("role", "client");
        setUser(access);
        toast.success("Client login successful...");
        onClose();

    };

    const handleAdminLogin = (access, refresh) => {
        setAccessTokenSessionStorage(access, refresh);
        sessionStorage.setItem("role", "admin");
        setUser(access);
        toast.success("Admin login successful...");
        onClose();
        router.push("/admin");
    };


    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values) => {
                loginUser(values);
                handleSubmit();
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl isInvalid={!!errors.email && touched.email}>
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
                                if (value.length < 1) {
                                    error = "email is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors.email}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isInvalid={!!errors.password && touched.password}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="password"
                            mb="8px"
                            fontWeight={"600"}
                        >
                            Password
                        </FormLabel>
                        <Flex position={"relative"}>
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                fontSize={["12px"]}
                                type={showPassWord ? "text" : "password"}
                                placeholder="Password"
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;

                                    if (value.length < 6) {
                                        error =
                                            "Password must contain at least 6 characters";
                                    }

                                    return error;
                                }}
                            />

                            <Icon
                                zIndex={"overlay"}
                                as={showPassWord ? ViewIcon : ViewOffIcon}
                                onClick={togglePassword}
                                cursor={"pointer"}
                                transform={"auto"}
                                position={"absolute"}
                                top={"50%"}
                                right="20px"
                                translateY={"-50%"}
                            />
                        </Flex>
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors.password}
                        </FormErrorMessage>
                    </FormControl>

                    <Box
                        display={"inline-block"}
                        fontWeight={"600"}
                        fontSize={["14px", null, ""]}
                        mt="12px"
                        textDecor={"underline"}
                        cursor={"pointer"}
                        onClick={() => handleCurrentForm("forgetPassword")}
                    >
                        Forgot Password?
                    </Box>

                    <PrimaryButton
                        type="submit"
                        text="Login"
                        colorScheme="purple"
                        width="full"
                        mt="30px"
                        py="20px"
                        disabled={isLoading} // Disable submit button if reCAPTCHA is not clicked or while submitting
                        isLoading={isLoading}
                    />
                </form>
            )}
        </Formik>
    );
};

const Register = ({ handleCurrentForm }) => {
    const [currentPassword, setCurrentPassword] = useState("");

    const { isLoading, setIsLoading } = useContext(StateContext);

    const regUser = async (values) => {
        setIsLoading(true);
        const formData = {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            password: values.password,
            email: values.email,
        };

        try {
            const response = await axios.post(`${baseUrl}/accounts/register/`, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });


            if (response?.data?.status === 200) {
                toast.success(response?.data?.data?.message);
                handleCurrentForm("login");
            } else {
                let errorMessage = "Registration failed";
                if (response?.data?.data) {
                    errorMessage = response?.data?.data;
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            let errorMessage = "An error occurred";
            if (error?.response?.data?.data) {
                errorMessage = error?.response?.data?.data;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                phone: "",
                confirmPassword: "",
            }}
            // consume Api here
            onSubmit={(values) => {
                regUser(values);
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    {/* First Name and last name Input  */}
                    <Flex gap="20px" flexDir={["column", null, "row"]}>
                        {/* First Name  */}
                        <FormControl
                            isInvalid={
                                !!errors.firstName && touched.firstName
                            }
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
                                fontSize={["12px"]}
                                placeholder="John"
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "First name is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors.firstName}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Last Name  */}
                        <FormControl
                            isInvalid={!!errors.lastName && touched.lastName}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="lastName"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Last Name
                            </FormLabel>
                            <Field
                                as={Input}
                                id="lastName"
                                name="lastName"
                                type="text"
                                fontSize={["12px"]}
                                placeholder="Doe"
                                px={["13px", null]}
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "Last name is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors.lastName}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    {/* EMAIL Section  */}
                    <FormControl
                        isInvalid={!!errors.email && touched.email}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="username"
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
                                if (value.length < 1) {
                                    error = "Email is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors.email}
                        </FormErrorMessage>
                    </FormControl>
                    {/* Phone number Section  */}
                    <FormControl
                        isInvalid={!!errors.phone && touched.phone}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="phone"
                            mb="8px"
                            fontWeight={"600"}
                        >
                            Phone
                        </FormLabel>
                        <Field
                            as={Input}
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            fontSize={["12px"]}
                            px={["13px", null]}
                            validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Phone number is required";
                                } else if (
                                    !/^(\+?\d{11}|\d{10})$/.test(value)
                                ) {
                                    error = "Please enter a valid phone number";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors.phone}
                        </FormErrorMessage>
                    </FormControl>
                    {/* Password Section  */}
                    <Flex gap="20px" flexDir={["column", null, "row"]}>
                        <FormControl
                            isInvalid={!!errors.password && touched.password}
                            mt={["14px", null, "24px"]}
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
                                placeholder="Password"
                                px={["13px", null]}
                                fontSize={["12px"]}
                                validate={(value) => {
                                    let error;

                                    if (value.length < 6) {
                                        error =
                                            "Password must contain at least 6 characters";
                                    }
                                    setCurrentPassword(value);

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Confirm password  */}

                        <FormControl
                            isInvalid={
                                !!errors.confirmPassword &&
                                touched.confirmPassword
                            }
                            mt={["14px", null, "24px"]}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="confirmPassword"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Confirm Password
                            </FormLabel>
                            <Field
                                as={Input}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your Password"
                                px={["13px", null]}
                                fontSize={["12px"]}
                                validate={(value) => {
                                    let error;

                                    if (value !== currentPassword) {
                                        error = "Password does not Match ";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px"]}>
                                {errors.confirmPassword}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    {/* Prvacy and policy */}
                    <FormControl mt="27px">
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="rememberMe"
                            mt={4}
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <Field
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                as={Checkbox}
                                mr={2}
                            />
                            <Text fontSize={["12px"]}>
                                I have read and acknowledge Hair Sense’s Privacy
                                Policy
                            </Text>
                        </FormLabel>
                    </FormControl>
                    <Box mt={["10px", null, "27px"]}>
                        <Text fontSize={["12px"]}>
                            By providing us with your email, you agree to Hair
                            Sense Terms of Service and to receive email updates
                            on new products
                        </Text>
                    </Box>

                    {/* Button to submit */}
                    <PrimaryButton
                        type="submit"
                        text="Create Account"
                        width="full"
                        mt="30px"
                        py="20px"
                        maxW="602.79px"
                        mb="15px"
                        mx="auto"
                        isLoading={isLoading}
                    // handleButton={registerUser}
                    />
                </form>
            )}
        </Formik>
    );
};