import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    Input,
    Flex,
    Button,
} from "@chakra-ui/react";
import { PrimaryButton } from "../Common";
import { SecondaryButton } from "../Common/Button";
import { baseUrl, httpGet, httpPost } from "@/http-request/http-request";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const NewSubModal = ({ isOpen, onOpen, onClose }) => {

    const initalData = {
        category: "",
        name: "",
    };

    const [newCategory, setNewCategory] = useState(initalData);
    const [lodaing, setLodaing] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const accessToken = sessionStorage.getItem("access_token");

    // Desstructure the data state
    const { name } = newCategory;

    const handleSubmit = async (e) => {
        setLodaing(true);
        e.preventDefault();
        const formData = {
            name: name,
        };

        await httpPost(`${baseUrl}/store/categories/`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {

                if (response.status === 201) {
                    toast.success("Category successfully created");
                    // Close the modal
                    onClose();
                    // Reset the state to initial
                    setNewCategory(initalData);
                    setLodaing(false);
                }
            })
            .catch((error) => {
                setLodaing(false);


            })
            .finally(() => {
                setLodaing(false);
            });

        // // alert(JSON.stringify(formData));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
            <ModalOverlay />
            <ModalContent
                rounded="0px"
                overflow="hidden"
                px="8px"
                bgColor="transparent"
                shadow={"none"}
            >
                <ModalBody bgColor="white" rounded="24px" shadow="sm" py="57px">
                    <Text fontWeight="600" fontSize={["19px"]}>
                        Add new category
                    </Text>

                    <Box mt={["14px"]}>
                        <form>

                            <Input
                                mt="16px"
                                type="text"
                                required
                                bgColor={"shades_10"}
                                py="14px"
                                placeholder="Category name"
                                value={name}
                                name="name"
                                onChange={handleChange}
                                _focusVisible={{}}
                            />

                            <Flex
                                mt="20px"
                                align="center"
                                justify="center"
                                gap="20px"
                            >
                                <SecondaryButton
                                    text="Cancel"
                                    maxW="130px"
                                    color="accent_2"
                                    handleButton={onClose}
                                />
                                <PrimaryButton
                                    maxW="130px"
                                    text="Save"
                                    handleButton={handleSubmit}
                                    py="30px"
                                    type="submit"
                                    isLoading={lodaing}
                                />
                            </Flex>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default NewSubModal;
