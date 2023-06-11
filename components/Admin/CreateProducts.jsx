import { PrimaryButton } from "@/components/Common";
import CustomInput from "@/components/Common/CustomInput";
import { baseUrl, httpGet, httpPost } from "@/http-request/http-request";
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
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

const CreateProducts = ({ setActivePage }) => {
    const [subCat, setSubCat] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCat, setSelectedSubCat] = useState([]);
    const [loading, setLoading] = useState(false);
    //check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const [file, setFile] = useState(null);

    //file updload
    const handleFileChange = (e) => {
        // setImage(e.target.files[0]);
        const selectedFile = e.target.files[0];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            // toast.error("Please select a valid PNG or JPEG file")
        } else {
            setFile(null);
            toast.error("Please select a valid PNG or JPEG file");
        }
    };

    //remove image
    const handleRemoveImage = () => {
        setFile(null);
    };

    const accessToken = Cookies.get("access_token");
    useEffect(() => {
        const fetchSubCategory = async () => {
            await httpGet(`${baseUrl}/store/categories`, {
                headers: {
                    Authrization: `${accessToken}`,
                },
            })
                .then((response) => {
                    const data = response.data.results;
                    // console.log(data);
                    setSubCat(data);
                    console.log(subCat);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        if (subCat.length < 1) {
            fetchSubCategory();
        }
    }, [accessToken, subCat]);

    // useeffect to handle Selected subcat
    useEffect(() => {
        subCat.map((item) => {
            // console.log(item.id === selectedCategory);
            console.log(item.id);
            console.log(selectedCategory);
            item.id == selectedCategory
                ? setSelectedSubCat(item.sub_category)
                : console.log("Not found");
        });
    }, [selectedCategory]);

    const handleCategoryChange = (event, handleChange) => {
        handleChange(event); // Calling the handleChange function provided by Formik
        setSelectedCategory(event.target.value); // seting the id of the selected
    };

    //TODO: HANDLE PRODUCT CREATION
    // submit form
    const handleCreateProduct = async (values) => {
        setLoading(true);
        const {
            name, 
            sub_category,
            desc: desc,
            // description_2: second_description,
            price: actual_price,
            sales_price: sales_price,
        } = values;

        const payload = new FormData();
        payload.append("name", name);
        payload.append("sub_category", sub_category);
        payload.append("desc", desc);
        // payload.append("second_description", second_description);
        payload.append("sales_price", sales_price);
        payload.append("actual_price", actual_price);

        if (file) {
            payload.append("product_img", file);
        }

        await httpPost(`${baseUrl}/store/products/`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    toast.success("Create product successfully");
                    setActivePage(4);
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Unable to create product");
            });

        setLoading(false);
        console.log(payload);
    };

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
                            category: "",
                            sub_category: "",
                            desc: "",
                            // description_2: "",
                            price: "",
                            sales_price: "",
                        }}
                        validate={(values) => {
                            let errors = {};
                            if (!values.name) {
                                errors.name = "Name is required";
                            }
                            if (!values.price) {
                                errors.price = "Price is required";
                            }
                            if (!values.sales_price) {
                                errors.sales_price = "Sales_price is required";
                            }
                            if (!values.desc) {
                                errors.des = "Description is required";
                            }
                            // if (!values.description_2) {
                            //     errors.description_2 =
                            //         "Second Description is required";
                            // }
                            if (!values.category) {
                                errors.category = "Category is required";
                            }
                            if (!values.sub_category) {
                                errors.sub_category =
                                    "Sub-Category is required";
                            }

                            return errors;
                        }}
                        onSubmit={(values) => {
                            values.file = file;
                            handleCreateProduct(values);
                            // console.log(values);
                        }}
                    >
                        {({
                            handleSubmit,
                            errors,
                            touched,
                            isValid,
                            dirty,
                            values,
                            handleChange,
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
                                            onChange={(event) =>
                                                handleCategoryChange(
                                                    event,
                                                    handleChange
                                                )
                                            }
                                        >
                                            {subCat &&
                                                subCat.map((subCategory) => (
                                                    <option
                                                        key={subCategory.id}
                                                        value={subCategory.id}
                                                    >
                                                        {subCategory.name}
                                                    </option>
                                                ))}
                                        </Field>
                                        <ErrorMessage
                                            name="category"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Box>

                                    <Box mt="16px" w="100%">
                                        <FormLabel
                                            htmlFor="sub_category"
                                            fontSize="14px"
                                            color="accent_2"
                                            fontWeight={600}
                                        >
                                            Sub-Category
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="sub_category"
                                            name="sub_category"
                                            bgColor="white"
                                            placeholder="Select Sub-Category"
                                            className={
                                                errors.sub_category &&
                                                touched.sub_category
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
                                            {selectedSubCat &&
                                                selectedSubCat.map(
                                                    (subCategory) => (
                                                        <option
                                                            key={subCategory.id}
                                                            value={
                                                                subCategory.id
                                                            }
                                                        >
                                                            {subCategory.name}
                                                        </option>
                                                    )
                                                )}
                                        </Field>
                                        <ErrorMessage
                                            name="sub_category"
                                            component="div"
                                            className="error-message"
                                        />
                                    </Box>
                                </Flex>

                                {/* Text Arear */}
                                <Box mt="16px">
                                    <FormLabel
                                        htmlFor="desc"
                                        fontSize="14px"
                                        color="accent_2"
                                        fontWeight={600}
                                    >
                                        Description
                                    </FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="desc"
                                        name="desc"
                                        bgColor="white"
                                        className={
                                            errors.desc &&
                                            touched.desc
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
                                        name="desc"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box>

                                {/* Description 2 */}

                                {/* <Box mt="16px">
                                    <FormLabel
                                        htmlFor="description_2"
                                        fontSize="14px"
                                        color="accent_2"
                                        fontWeight={600}
                                    >
                                        Second Description
                                    </FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="description_2"
                                        name="description_2"
                                        bgColor="white"
                                        className={
                                            errors.description_2 &&
                                            touched.description_2
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
                                        name="description_2"
                                        component="div"
                                        className="error-message"
                                    />
                                </Box> */}

                                {/* Cover Image Section */}

                                {file ? (
                                    <Box
                                        w="full"
                                        h="full"
                                        display="flex"
                                        flexDir="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap="2"
                                    >
                                        <Image
                                            src={URL.createObjectURL(file)}
                                            alt="Uploaded"
                                            maxH="full"
                                            maxW="full"
                                            width={500}
                                            height={350}
                                            padding="12px"
                                        />
                                        <Text
                                            as="button"
                                            onClick={handleRemoveImage}
                                            color="red.300"
                                            _hover={{ color: "red.500" }}
                                            fontSize="md"
                                            cursor="pointer"
                                            textDecoration="underline"
                                            mb="3"
                                        >
                                            Remove Image
                                        </Text>
                                    </Box>
                                ) : (
                                    <Box mt="16px">
                                        <Text as="label" htmlFor="cover-image">
                                            Cover image
                                        </Text>
                                        <Input
                                            type="file"
                                            name="cover-image"
                                            id="cover-image"
                                            py="10px"
                                            bgColor="white"
                                            onChange={handleFileChange}
                                        />
                                    </Box>
                                )}

                                {/* Size Section  */}

                                <Flex
                                    flexDir={{
                                        base: "column",
                                        md: "row",
                                    }}
                                    gap={["0px", "20px"]}
                                >
                                    {/* Price */}

                                    <CustomInput
                                        label="Actual Price"
                                        name="price"
                                        type="number"
                                        bgColor="white"
                                        errors={errors}
                                        touched={touched}
                                    />

                                    <CustomInput
                                        label="Sales Price"
                                        name="sales_price"
                                        type="number"
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
                                        isLoading={loading}
                                        onClick={handleSubmit}
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
