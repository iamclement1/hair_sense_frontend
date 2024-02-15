import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Text,
    Box,
    Input,
    Flex,
} from "@chakra-ui/react";
import { PrimaryButton } from "../Common";
import { SecondaryButton } from "../Common/Button";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const NewSubModal = ({ isOpen, onOpen, onClose }) => {


    const initalData = {
        category: "",
        name: "",
    };


    const [newCategory, setNewCategory] = useState(initalData);
    const queryClient = useQueryClient()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };


    // Desstructure the data state
    const { name } = newCategory;

    const { mutate, isPending } = useMutation({
        mutationFn: (category) => {
            return client.post("/store/categories/", category);
        },
        onSuccess: ({ data }) => {
            if (data) {
                // Close the modal
                onClose();
                toast.success("Category created successfully", {
                    theme: "dark",
                });
            }
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
        onError: (error) => {
            if (error.response) {
                const errorMessage = error.response.data;
                toast.error(errorMessage);
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
        };
        mutate(formData);
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
                                    isLoading={isPending}
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
