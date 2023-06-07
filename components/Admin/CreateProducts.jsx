import { PrimaryButton } from "@/components/Common";
import CustomInput from "@/components/Common/CustomInput";
import { baseUrl, httpGet } from "@/http-request/http-request";
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
    Input,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CreateProducts = () => {

    const accessToken = Cookies.get('access_token');
    useEffect(() => {
        const fetchSubCategory = async () => {
            await httpGet(`${baseUrl}/store/sub_categories`, {
                headers: {
                    Authrization: `${accessToken}`
                }
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        fetchSubCategory();
    }, [accessToken])
    return (
        <Box>
            <Box>
                <Text fontWeight="600" fontSize="20px">
                    Create product
                </Text>
            </Box>
            <Box maxW="541px">
                <Box>
                    <Formik
                        initialValues={{
                            name: "",
                            price: "",
                            category: "",
                            description: "",
                            category: "",
                            quantity: "",
                            size: "",
                        }}
                        validate={(values) => {
                            let errors = {};
                            if (!values.name) {
                                errors.name = "Name is required";
                            }
                            if (!values.price) {
                                errors.price = "Price is required";
                            }
                            if (!values.description) {
                                errors.description = "Description is required";
                            }
                            if (!values.category) {
                                errors.category = "Category is required";
                            }
                            if (!values.quantity) {
                                errors.quantity = "Quantity is required";
                            }
                            if (!values.size) {
                                errors.size = "Size is required";
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
                                {/* Product Name */}
                                <CustomInput
                                    label="Name"
                                    name="name"
                                    type="text"
                                    bgColor="white"
                                    errors={errors}
                                    touched={touched}
                                />

                                <Flex
                                    flexDir={{
                                        base: "column",
                                        md: "row",
                                    }}
                                    gap={["0px", "20px"]}
                                >
                                    {/* Category Input */}
                                    <Box mt="16px" w="100%">
                                        <FormLabel
                                            htmlFor="category"
                                            fontSize="14px"
                                            color="accent_2"
                                            fontWeight={600}
                                        >
                                            Category
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="category"
                                            name="category"
                                            bgColor="white"
                                            placeholder="Select Category"
                                            className={
                                                errors.category &&
                                                    touched.category
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
                                            <option value="1">
                                                Category 1
                                            </option>
                                            <option value="2">
                                                Category 2
                                            </option>
                                        </Field>
                                        <ErrorMessage
                                            name="category"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Box>

                                    {/* Price */}

                                    <CustomInput
                                        label="Price"
                                        name="price"
                                        type="text"
                                        bgColor="white"
                                        errors={errors}
                                        touched={touched}
                                    />
                                </Flex>

                                {/* Text Arear */}
                                <Box mt="16px">
                                    <FormLabel
                                        htmlFor="description"
                                        fontSize="14px"
                                        color="accent_2"
                                        fontWeight={600}
                                    >
                                        Description
                                    </FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="description"
                                        name="description"
                                        bgColor="white"
                                        className={
                                            errors.description &&
                                                touched.description
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
                                        name="description"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box>

                                {/* Cover Image Section */}

                                <Box mt="16px">
                                    <label>Cover image</label>
                                    <Input
                                        type="file"
                                        name=""
                                        id=""
                                        py="10px"
                                        bgColor="white"
                                    />
                                </Box>

                                {/* Size Section  */}

                                <Flex
                                    flexDir={{
                                        base: "column",
                                        md: "row",
                                    }}
                                    gap={["0px", "20px"]}
                                >
                                    {/* Size Select */}
                                    <Box mt="16px" w="100%">
                                        <FormLabel
                                            htmlFor="size"
                                            fontSize="14px"
                                            color="accent_2"
                                            fontWeight={600}
                                        >
                                            Size
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="size"
                                            name="size"
                                            bgColor="white"
                                            placeholder="Select Size"
                                            className={
                                                errors.size && touched.size
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
                                            <option value="1">size 1</option>
                                            <option value="2">size 2</option>
                                        </Field>
                                        <ErrorMessage
                                            name="size"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Box>

                                    {/* Price */}

                                    <CustomInput
                                        label="Quantity"
                                        name="quantity"
                                        type="text"
                                        bgColor="white"
                                        errors={errors}
                                        touched={touched}
                                    />
                                </Flex>

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
        </Box>
    );
};

export default CreateProducts;
