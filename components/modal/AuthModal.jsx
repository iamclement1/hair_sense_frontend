import React, { useState } from "react";
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

const AuthModal = ({ isOpen, onOpen, onClose }) => {
    const [currentPage, setCurrentPage] = useState("login");
    const handleCurrentForm = (page) => {
        setCurrentPage(page);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
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
                    maxW={["100%", null, "100%", "733px"]}
                    mx="auto"
                >
                    {" "}
                    <Flex align={"center"} gap={["20px"]} px={["20px"]}>
                        <Divider />
                        <Text
                            flexShrink={0}
                            fontSize={[
                                "18px",
                                null,
                                null,
                                null,
                                "20px",
                                "40px",
                            ]}
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
                        pt={["24px", null, "54px"]}
                        pb={["0px", null, "54px"]}
                        border={"1px"}
                        borderColor={["transparent", null, "dark_1"]}
                        rounded={"12px"}
                        px={["20px", null, "30px"]}
                    >
                        {/* ************* */}
                        {/* Form Are being Use here  Check the Components Below for forms */}
                        {currentPage === "login" ? (
                            <Login handleCurrentForm={handleCurrentForm} />
                        ) : currentPage === "register" ? (
                            <Register />
                        ) : currentPage === "forgetPassword" ? (
                            "forget password Form  will be here"
                        ) : (
                            <Login handleCurrentForm={handleCurrentForm} />
                        )}

                        {/* ************    * */}

                        <Box>
                            {currentPage === "login" && <SignInWithSocials />}
                        </Box>
                        <Box>
                            <Box
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
const Login = ({ handleCurrentForm }) => {
    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <FormControl
                        isInvalid={!!errors.username && touched.username}
                    >
                        <FormLabel
                            htmlFor="username"
                            fontSize={[
                                "14px",
                                null,
                                "18px",
                                null,
                                null,
                                "24px",
                            ]}
                            mb="12px"
                            fontWeight={"600"}
                        >
                            Username
                        </FormLabel>
                        <Field
                            h={["50px", null]}
                            as={Input}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            fontSize={[
                                "12px",
                                null,
                                "15px",
                                null,
                                null,
                                "20px",
                            ]}
                            px={["13px", null, "18px", null, "26px"]}
                            py="23px"
                            validate={(value) => {
                                let error;
                                if (value.length < 1) {
                                    error = "Username is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px", null, "15px"]}>
                            {errors.username}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isInvalid={!!errors.password && touched.password}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            htmlFor="password"
                            fontSize={["14px", null, "18px", null, "20px"]}
                            mb="12px"
                            fontWeight={"600"}
                        >
                            Password
                        </FormLabel>
                        <Field
                            h={["50px", null]}
                            as={Input}
                            id="password"
                            name="password"
                            fontSize={[
                                "12px",
                                null,
                                "15px",
                                null,
                                null,
                                "20px",
                            ]}
                            type="password"
                            placeholder="Password"
                            px={["13px", null, "18px", "26px"]}
                            py="23px"
                            validate={(value) => {
                                let error;

                                if (value.length < 6) {
                                    error =
                                        "Password must contain at least 6 characters";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px", null, "15px"]}>
                            {errors.password}
                        </FormErrorMessage>
                    </FormControl>

                    <Box
                        display={"inline-block"}
                        fontWeight={"600"}
                        fontSize={["14px", null, "15px"]}
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
                    />
                </form>
            )}
        </Formik>
    );
};

const Register = () => {
    const [currentPassword, setCurrentPassword] = useState("");

    // const [username, setUsername] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    // const registerUser = async (event) => {
    //     event.preventDefault();

    // const formData = {
    //     "username" : username,
    //     "firstName" : firstName,
    //     "lastName" : lastName,
    //     "email" : email,
    //     "password" : password,
    //     "confirmPassword" : confirmPassword,
    // }

    // console.table({username, firstName, lastName, email, password });
    // }

    const regUser = async (values) => {
        const formData = {
            username: values.username,
            firstName: values.first_name,
            lastName: values.last_name,
            email: values.email,
            password: values.password,
        };
        const { username, firstName, lastName, email, password } = formData;

        console.table({ username, firstName, lastName, email, password });
    };
    return (
        <Formik
            initialValues={{
                first_name: "",
                last_name: "",
                password: "",
                username: "",
                email: "",
                confirm_password: "",
                // location: "",
            }}
            // consume Api here
            onSubmit={(values) => {
                // alert(JSON.stringify(values, null, 2));
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
                                htmlFor="first_name"
                                fontSize={[
                                    "14px",
                                    null,
                                    "18px",
                                    null,
                                    null,
                                    "24px",
                                ]}
                                mb="12px"
                                fontWeight={"600"}
                            >
                                First Name
                            </FormLabel>
                            <Field
                                h={["50px", null]}
                                as={Input}
                                id="first_name"
                                name="first_name"
                                type="text"
                                placeholder="John"
                                fontSize={[
                                    "12px",
                                    null,
                                    "15px",
                                    null,
                                    null,
                                    "20px",
                                ]}
                                px={["13px", null, "18px", null, "26px"]}
                                py="23px"
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "First name is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px", null, "15px"]}>
                                {errors.first_name}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Last Name  */}
                        <FormControl
                            isInvalid={!!errors.last_name && touched.last_name}
                        >
                            <FormLabel
                                htmlFor="last_name"
                                fontSize={[
                                    "14px",
                                    null,
                                    "18px",
                                    null,
                                    null,
                                    "24px",
                                ]}
                                mb="12px"
                                fontWeight={"600"}
                            >
                                Last Name
                            </FormLabel>
                            <Field
                                h={["50px", null]}
                                as={Input}
                                id="last_name"
                                name="last_name"
                                type="text"
                                placeholder="Doe"
                                fontSize={[
                                    "12px",
                                    null,
                                    "15px",
                                    null,
                                    null,
                                    "20px",
                                ]}
                                px={["13px", null, "18px", null, "26px"]}
                                py="23px"
                                validate={(value) => {
                                    let error;
                                    if (value.length < 1) {
                                        error = "Last name is Required";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px", null, "15px"]}>
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
                            htmlFor="username"
                            fontSize={[
                                "14px",
                                null,
                                "18px",
                                null,
                                null,
                                "24px",
                            ]}
                            mb="12px"
                            fontWeight={"600"}
                        >
                            Username
                        </FormLabel>
                        <Field
                            h={["50px", null]}
                            as={Input}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            fontSize={[
                                "12px",
                                null,
                                "15px",
                                null,
                                null,
                                "20px",
                            ]}
                            px={["13px", null, "18px", null, "26px"]}
                            py="23px"
                            validate={(value) => {
                                let error;
                                if (value.length < 1) {
                                    error = "Username is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px", null, "15px"]}>
                            {errors.username}
                        </FormErrorMessage>
                    </FormControl>
                    {/* Email Section  */}
                    <FormControl
                        isInvalid={!!errors.email && touched.email}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            htmlFor="email"
                            fontSize={[
                                "14px",
                                null,
                                "18px",
                                null,
                                null,
                                "24px",
                            ]}
                            mb="12px"
                            fontWeight={"600"}
                        >
                            Email
                        </FormLabel>
                        <Field
                            h={["50px", null]}
                            as={Input}
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your Email"
                            fontSize={[
                                "12px",
                                null,
                                "15px",
                                null,
                                null,
                                "20px",
                            ]}
                            px={["13px", null, "18px", null, "26px"]}
                            py="23px"
                            validate={(value) => {
                                let error;
                                if (value.length < 1) {
                                    error = "Email is Required";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage fontSize={["12px", null, "15px"]}>
                            {errors.email}
                        </FormErrorMessage>
                    </FormControl>
                    {/* Password Section  */}
                    <Flex gap="20px" flexDir={["column", null, "row"]}>
                        <FormControl
                            isInvalid={!!errors.password && touched.password}
                            mt={["14px", null, "24px"]}
                        >
                            <FormLabel
                                htmlFor="password"
                                fontSize={["14px", null, "18px", null, "20px"]}
                                mb="12px"
                                fontWeight={"600"}
                            >
                                Password
                            </FormLabel>
                            <Field
                                h={["50px", null]}
                                as={Input}
                                id="password"
                                name="password"
                                fontSize={[
                                    "12px",
                                    null,
                                    "15px",
                                    null,
                                    null,
                                    "20px",
                                ]}
                                type="password"
                                placeholder="Password"
                                px={["13px", null, "18px", "26px"]}
                                py="23px"
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
                            <FormErrorMessage fontSize={["12px", null, "15px"]}>
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
                                htmlFor="confirm_password"
                                fontSize={["14px", null, "18px", null, "20px"]}
                                mb="12px"
                                fontWeight={"600"}
                            >
                                Confirm Password
                            </FormLabel>
                            <Field
                                h={["50px", null]}
                                as={Input}
                                id="confirm_password"
                                name="confirm_password"
                                fontSize={[
                                    "12px",
                                    null,
                                    "15px",
                                    null,
                                    null,
                                    "20px",
                                ]}
                                type="password"
                                placeholder="Confirm your Password"
                                px={["13px", null, "18px", "26px"]}
                                py="23px"
                                validate={(value) => {
                                    let error;

                                    if (value !== currentPassword) {
                                        error = "Password does not Match ";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage fontSize={["12px", null, "15px"]}>
                                {errors.confirm_password}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                    {/* Location */}
                    {/* <FormControl
                        isInvalid={!!errors.location && touched.location}
                        mt={["14px", null, "24px"]}
                    >
                        <FormLabel
                            htmlFor="location"
                            fontSize={[
                                "14px",
                                null,
                                "18px",
                                null,
                                null,
                                "24px",
                            ]}
                            mb="12px"
                            fontWeight={"600"}
                        >
                            Location
                        </FormLabel>
                        <Field
                            h={["50px", null]}
                            as={Select}
                            id="location"
                            name="location"
                            type="text"
                            placeholder="Enter your Location"
                            fontSize={[
                                "12px",
                                null,
                                "15px",
                                null,
                                null,
                                "20px",
                            ]}
                            // px={["13px", null, "18px", null, "26px"]}
                            // py="23px"
                            validate={(value) => {
                                let error;
                                if (value.length < 1) {
                                    error = "Location is Required";
                                }

                                return error;
                            }}
                        >
                            <option value="new-york">New York</option>
                            <option value="los-angeles">Los Angeles</option>
                            <option value="chicago">Chicago</option>
                        </Field>
                        <FormErrorMessage fontSize={["12px", null, "15px"]}>
                            {errors.location}
                        </FormErrorMessage>
                    </FormControl> */}
                    {/* Prvacy and policy */}
                    <FormControl mt="27px">
                        <FormLabel
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
                            <Text fontSize={["12px", null, "14px"]}>
                                I have read and acknowledge Hair Sense’s Privacy
                                Policy
                            </Text>
                        </FormLabel>
                    </FormControl>
                    <Box mt={["10px", null, "27px"]}>
                        <Text fontSize={["12px", null, "14px"]}>
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
                        // handleButton={registerUser}
                    />
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
