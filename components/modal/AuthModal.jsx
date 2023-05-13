import React, { useContext, useState } from "react";
import {
    Box,
    Divider,
    Flex,
    Text,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Select,
} from "@chakra-ui/react";
import { PrimaryButton, SocialButton } from "../Common/Button";
import { Formik, Field } from "formik";
import NextLink from "next/link";
import { baseUrl, httpPost } from "@/http-request/http-request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import StateProvider, { StateContext } from "@/context/StateProvider";
import axios from "axios";

const AuthModal = ({ isOpen, onOpen, onClose }) => {
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

                        <Box>
                            {currentPage === "login" && <SignInWithSocials />}
                        </Box>
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
    const { isLoading, setIsLoading } = useContext(StateContext);
    // import user from context api
    const { setUser } = useContext(StateContext);
    const loginUser = async (values) => {
        setIsLoading(true);
        const formData = {
            username: values.username,
            password: values.password,
        };
        const { username, password } = formData;

        // console.table({ username, password });

        await axios
            .post(`${baseUrl}/accounts/sign_in/`, formData)
            .then((response) => {
                if (
                    response &&
                    response.data &&
                    response.data.role === "client"
                ) {
                    // console.log(response.data.role);
                    const { access, refresh } = response.data;
                    Cookies.set("currentUser", access);
                    Cookies.set("refreshToken", refresh);
                    Cookies.set("access_token", access);
                    setUser(access);
                    //success callback
                    toast("Login successful...");
                    onClose();
                } else if (response.data.role === "admin") {
                    router.push("/admin");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);

                console.log(error);
                toast.error(error.message);
            });
    };
    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            onSubmit={(values) => {
                // alert(JSON.stringify(values, null, 2));
                loginUser(values);
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl
                        isInvalid={!!errors.username && touched.username}
                    >
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="username"
                            mb="8px"
                            fontWeight={"600"}
                        >
                            Username
                        </FormLabel>
                        <Field
                            as={Input}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            fontSize={["12px"]}
                            px={["13px", null]}
                            validate={(value) => {
                                let error;
                                if (value.length < 1) {
                                    error = "Username is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors.username}
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
                        <Field
                            as={Input}
                            id="password"
                            name="password"
                            fontSize={["12px"]}
                            type="password"
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
                        isLoading={isLoading}
                    />
                </form>
            )}
        </Formik>
    );
};

// {
//     "data": {
//         "status": 201,
//         "message": "proceed to login"
//     },
//     "status": 201,
//     "statusText": "Created",
//     "headers": {
//         "content-length": "43",
//         "content-type": "application/json"
//     },
//     "config": {
//         "transitional": {
//             "silentJSONParsing": true,
//             "forcedJSONParsing": true,
//             "clarifyTimeoutError": false
//         },
//         "adapter": [
//             "xhr",
//             "http"
//         ],
//         "transformRequest": [
//             null
//         ],
//         "transformResponse": [
//             null
//         ],
//         "timeout": 0,
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN",
//         "maxContentLength": -1,
//         "maxBodyLength": -1,
//         "env": {},
//         "headers": {
//             "Accept": "application/json, text/plain, */*",
//             "Content-Type": "application/json"
//         },
//         "method": "post",
//         "url": "https://hairshine.pythonanywhere.com/accounts/register/",
//         "data": "{\"username\":\"faruq4\",\"first_name\":\"Faruq\",\"last_name\":\"Azeez\",\"phone\":8149557484,\"password\":\"password\"}"
//     },
//     "request": {}
// }

const Register = ({ handleCurrentForm }) => {
    const [currentPassword, setCurrentPassword] = useState("");

    const { isLoading, setIsLoading } = useContext(StateContext);

    const regUser = async (values) => {
        setIsLoading(true);
        const formData = {
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            password: values.password,
        };
        const { username, first_name, last_name, phone, password } = formData;

        console.table({ username, first_name, last_name, phone, password });

        await axios
            .post(`${baseUrl}/accounts/register/`, formData)
            .then((response) => {
                console.log(response);
                // if (response && response.message === "proceed to login") {
                //     handleCurrentForm("login");
                //     toast("Account Created Successfully, Process To Login");
                // }
                if (response.data.status === "201") {
                    toast("Account Created Successfully, Process To Login");
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };
    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                password: "",
                username: "",
                phone: "",
                confirm_password: "",
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
                                !!errors.first_name && touched.first_name
                            }
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="first_name"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                First Name
                            </FormLabel>
                            <Field
                                as={Input}
                                id="first_name"
                                name="first_name"
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
                                {errors.first_name}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Last Name  */}
                        <FormControl
                            isInvalid={!!errors.last_name && touched.last_name}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="last_name"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Last Name
                            </FormLabel>
                            <Field
                                as={Input}
                                id="last_name"
                                name="last_name"
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
                                {errors.last_name}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    {/* UserName Section  */}
                    <FormControl
                        isInvalid={!!errors.username && touched.username}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            fontSize={"14px"}
                            htmlFor="username"
                            mb="8px"
                            fontWeight={"600"}
                        >
                            Username
                        </FormLabel>
                        <Field
                            as={Input}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            fontSize={["12px"]}
                            px={["13px", null]}
                            validate={(value) => {
                                let error;
                                if (value.length < 1) {
                                    error = "Username is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px"]}>
                            {errors.username}
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
                            type="number"
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
                                !!errors.confirm_password &&
                                touched.confirm_password
                            }
                            mt={["14px", null, "24px"]}
                        >
                            <FormLabel
                                fontSize={"14px"}
                                htmlFor="confirm_password"
                                mb="8px"
                                fontWeight={"600"}
                            >
                                Confirm Password
                            </FormLabel>
                            <Field
                                as={Input}
                                id="confirm_password"
                                name="confirm_password"
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
                                {errors.confirm_password}
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
                    <ToastContainer />
                </form>
            )}
        </Formik>
    );
};

// Layout Components
const SignInWithSocials = () => {
    return (
        <Box>
            <Flex
                align={"center"}
                gap={["12px", null, "12px"]}
                mt="23px"
                mb={["14px", null, "35px"]}
            >
                <Divider />
                <Text
                    flexShrink={0}
                    fontSize={["14px", null, null, "20px"]}
                    fontWeight={600}
                    color="accent_2"
                >
                    or
                </Text>
                <Divider />
            </Flex>
            <Box>
                <Box mb={["15px", null, "30px"]}>
                    <SocialButton
                        icon={false}
                        text={"Continue with Google"}
                        imageUrl={"/images/googleIcon.svg"}
                        imageText={"Login with Google"}
                    />
                </Box>
                <Box mb={["16px", null, "30px"]}>
                    <SocialButton
                        icon={false}
                        text={"Continue with Facebook"}
                        imageUrl={"/images/faceBook.svg"}
                        imageText={"Login with facebook"}
                    />
                </Box>
                <Box mb={["15px", null, "24px"]}>
                    <SocialButton
                        icon={false}
                        text={"Continue with Apple"}
                        imageUrl={"/images/apple.svg"}
                        imageText={"Login with Apple"}
                    />
                </Box>
            </Box>
        </Box>
    );
};
