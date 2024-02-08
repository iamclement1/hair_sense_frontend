import { PrimaryButton } from "@/components/Common";
import CustomInput from "@/components/Common/CustomInput";
import { StateContext } from "@/context/StateProvider";
import { baseUrl } from "@/http-request/http-request";
import {
    Box,
    Flex,
    Text,
    Image,
    Textarea,
    FormLabel,
    Select,
    Input,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const CreateProducts = ({ setActivePage }) => {
    const { user } = useContext(StateContext)


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

    useEffect(() => {
        const fetchCategory = async () => {
            await axios.get(`${baseUrl}/store/categories`, {
                headers: {
                    Authorization: `${user}`,
                },
            })
                .then((response) => {
                    console.log("categories data ==>", response.data.data)
                    const data = response.data.data;

                    setSubCat(data);

                })
                .catch((error) => {
                    console.log(error)
                });
        };

        if (subCat?.length < 1) {
            fetchCategory();
        }
    }, [user, subCat]);

    // useeffect to handle Selected subcat
    useEffect(() => {
        const selectedItem = subCat.find((item) => item.id === selectedCategory);
        if (selectedItem) {
            setSelectedSubCat(selectedItem.subcategories);
        }
    }, [selectedCategory, subCat]);



    const handleCategoryChange = (event, handleChange) => {
        handleChange(event); // Calling the handleChange function provided by Formik
        setSelectedCategory(event.target.value); // seting the id of the selected
    };


    // submit form
    const handleCreateProduct = async (values) => {
        setLoading(true);
        const {
            name,
            subcategory,
            desc: desc,
            // description_2: second_description,
            price: actualPrice,
            // sales_price: sales_price,
        } = values;

        const payload = new FormData();
        payload.append("name", name);
        payload.append("subcategory", subcategory);
        payload.append("desc", desc);
        // payload.append("sales_price", sales_price);
        payload.append("actualPrice", actualPrice);

        if (file) {
            payload.append("productImg", file);
        }

        await axios.post(`${baseUrl}/store/products/`, payload, {
            headers: {
                Authorization: `Bearer ${user}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Create product successfully");
                    setActivePage(4);
                }
            })
            .catch((error) => {

                toast.error("Unable to create product");
            });

        setLoading(false);

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
                            subcategory: "",
                            desc: "",
                            // description_2: "",
                            price: "",
                            // sales_price: "",
                        }}
                        validate={(values) => {
                            let errors = {};
                            if (!values.name) {
                                errors.name = "Name is required";
                            }
                            if (!values.price) {
                                errors.price = "Price is required";
                            }
                            // if (!values.sales_price) {
                            //     errors.sales_price = "Sales_price is required";
                            // }
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
                            if (!values.subcategory) {
                                errors.subcategory =
                                    "Sub-Category is required";
                            }

                            return errors;
                        }}
                        onSubmit={(values) => {
                            values.file = file;
                            handleCreateProduct(values);

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
                                            {subCat?.map((subCategory) => (
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
                                            htmlFor="subcategory"
                                            fontSize="14px"
                                            color="accent_2"
                                            fontWeight={600}
                                        >
                                            Sub-Category
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="subcategory"
                                            name="subcategory"
                                            bgColor="white"
                                            placeholder="Select Sub-Category"
                                            className={
                                                errors.subcategory &&
                                                    touched.subcategory
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
                                            {selectedSubCat?.map(
                                                (subCategory) => (
                                                    <option
                                                        key={subCategory?.id}
                                                        value={
                                                            subCategory?.id
                                                        }
                                                    >
                                                        {subCategory?.name}
                                                    </option>
                                                )
                                            )}
                                        </Field>
                                        <ErrorMessage
                                            name="subcategory"
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

                                    {/* <CustomInput
                                        label="Sales Price"
                                        name="sales_price"
                                        type="number"
                                        bgColor="white"
                                        errors={errors}
                                        touched={touched}
                                    /> */}
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