import {
    Box,
    Flex,
    Textarea,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { PrimaryButton } from ".";
import CustomInput from "./CustomInput";
import client from "@/context/axiosInstance";
import { StateContext } from "@/context/StateProvider";
import { toast } from "react-hot-toast";

const ContactForm = () => {

    const { loading, setLoading } = useContext(StateContext);
    const router = useRouter()

    const submitContactForm = async (values) => {
        setLoading(true);
        const formData = {
            fullName: values.full_name,
            email: values.email,
            message: values.message,
        };

        console.log(formData);

        try {
            const response = await client.post('/contact', formData);
            const data = await response.data;
            if (data?.status === 200) {
                setLoading(false)
                const message = data?.data;
                console.log(message)
                toast.success(message);
                router.push("/")
            }
        } catch (error) {
            setLoading(false);
            console.log(error.response)
            if (error.response) {
                const errorMessage = error.response.data.data;
                toast.error(errorMessage);
            }
        }
    };

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
                submitContactForm(values);
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
                            isLoading={loading}
                        />
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default ContactForm;
