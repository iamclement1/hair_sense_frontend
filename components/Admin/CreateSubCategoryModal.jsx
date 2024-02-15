import React, { useContext, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent, ModalBody,
    Text,
    Box,
    Input,
    Flex,
} from "@chakra-ui/react";
import { PrimaryButton } from "../Common";
import { SecondaryButton } from "../Common/Button";
import { baseUrl } from "@/http-request/http-request";
import { toast } from "react-hot-toast";
import { StateContext } from "@/context/StateProvider";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const CreateSubCategoryModal = ({
    isOpen,
    onOpen,
    onClose,
    Categoryname,
    Categoryid,
}) => {
    const [name, setName] = useState("");
    const queryClient = useQueryClient()


    const handleChange = (e) => {
        setName(e.target.value);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (subcategory) => {
            return client.post("/store/sub_categories/", subcategory);
        },
        onSuccess: ({ data }) => {
            if (data) {
                // Close the modal
                onClose();
                toast.success("Sub Category created successfully", {
                    theme: "dark",
                });
            }
            queryClient.invalidateQueries({ queryKey: ["subcategory"] });
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
            category: Categoryid,
            name: name,
        };
        mutate(formData)

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
                        Sub-Category for {Categoryname}
                    </Text>

                    <Box mt={["14px"]}>
                        <form>
                            <Input
                                type="text"
                                required
                                bgColor={"shades_10"}
                                py="14px"
                                placeholder="Input the name of the sub-category"
                                value={name}
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
                                    isLoading={isPending}
                                    handleButton={handleSubmit}
                                    py="30px"
                                    type="submit"
                                />
                            </Flex>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateSubCategoryModal;
