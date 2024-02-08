import { PrimaryButton } from "@/components/Common";
import CustomInput from "@/components/Common/CustomInput";
import { StateContext } from "@/context/StateProvider";
import {
    baseUrl,
    httpGet,
    httpPost,
    httpPut,
} from "@/http-request/http-request";
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
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
const EditProduct = ({ onOpen, onClose, isOpen, data }) => {
    const [subCat, setSubCat] = useState([]);
    const { user } = useContext(StateContext);

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCat, setSelectedSubCat] = useState([]);
    const [loading, setLoading] = useState(false);
    //check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    const [file, setFile] = useState(data && data.product_img);

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
        data.product_img = null;
        setFile(null);
    };


    useEffect(() => {
        const fetchSubCategory = async () => {
            await httpGet(`${baseUrl}/store/categories`, {
                headers: {
                    Authrization: `${user}`,
                },
            })
                .then((response) => {
                    const data = response.data.results;

                    setSubCat(data);

                })
                .catch((error) => {

                });
        };

        if (subCat?.length < 1) {
            fetchSubCategory();
        }
    }, [user, subCat]);

    // useeffect to handle Selected subcat
    useEffect(() => {
        subCat?.map((item) => {



            item.id == selectedCategory
                ? setSelectedSubCat(item.sub_category)
                : ""
        });
    }, [selectedCategory]);

    const handleCategoryChange = (event, handleChange) => {
        handleChange(event); // Calling the handleChange function provided by Formik
        setSelectedCategory(event.target.value); // seting the id of the selected
    };

    //TODO: HANDLE PRODUCT CREATION
    // submit form
    const handleEditProduct = async (values) => {
        setLoading(true);
        const {
            name,
            sub_category,
            desc: desc,
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
        } else {
            if (data && data.product_img) {
                try {
                    const response = await axios.get(data.product_img, {
                        responseType: "blob",
                    });
                    const imageBlob = response.data;
                    const convertedFile = new File([imageBlob], "product_img");
                    payload.append("product_img", convertedFile);
                } catch (error) {

                }
            }
        }

        await axios
            .put(`${baseUrl}/store/products/${data?.id}/`, payload, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then((response) => {

                if (response.status === 202) {
                    toast.success("Product updated successfully");
                    // setActivePage(4);
                    onClose();
                }
            })
            .catch((error) => {

                toast.error("Unable to create product");
            });

        setLoading(false);

    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
                bgColor={"white"}
                mx={["16px"]}
                px={["16px", null, "34px"]}
                py={["38px"]}
                rounded={["12px", null, "16px"]}
            >
                <Flex align="center" justify="space-between" w="100%">
                    <Text
                        fontSize={{ base: "16px", md: "20px", xl: "25px" }}
                        fontWeight="600"
                    >
                        Edit Product
                    </Text>
                    <Icon as={FaTimes} onClick={onClose} cursor={"pointer"} />
                </Flex>
                <Divider mt="8px" />
                <Box>
                    <Box>
                        <Formik
                            initialValues={{
                                name: data?.name,
                                category: data?.category,
                                sub_category: data?.sub_category,
                                desc: data?.desc,
                                // description_2: "",
                                price: data?.actual_price,
                                sales_price: data?.sales_price,
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
                                    errors.sales_price =
                                        "Sales_price is required";
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
                                handleEditProduct(values);

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
                                                {subCat?.map(
                                                    (subCategory) => (
                                                        <option
                                                            key={
                                                                subCategory.id
                                                            }
                                                            value={
                                                                subCategory.id
                                                            }
                                                        >
                                                            {
                                                                subCategory.name
                                                            }
                                                        </option>
                                                    )
                                                )}
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
                                                {selectedSubCat?.map(
                                                    (subCategory) => (
                                                        <option
                                                            key={
                                                                subCategory.id
                                                            }
                                                            value={
                                                                subCategory.id
                                                            }
                                                        >
                                                            {
                                                                subCategory.name
                                                            }
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
                                                errors.desc && touched.desc
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

                                    {/* Cover Image Section */}

                                    {(data?.product_img !== null) ||
                                        file ? (
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
                                                src={
                                                    data?.product_img
                                                        ? data.product_img
                                                        : URL.createObjectURL(
                                                            file
                                                        )
                                                }
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
                                            <Text
                                                as="label"
                                                htmlFor="cover-image"
                                            >
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
            </ModalContent>
        </Modal>
    );
};

export default EditProduct;
