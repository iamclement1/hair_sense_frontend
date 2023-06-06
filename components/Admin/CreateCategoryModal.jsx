import React, { useState } from "react";
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
import { baseUrl, httpPost } from "@/http-request/http-request";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const CreateCategoryModal = ({ isOpen, onOpen, onClose }) => {
    const [name, setName] = useState("");
    const handleChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmit = async () => {
        // console.log(category);
        const formData = {
            "name": name,
        }

        const accessToken = Cookies.get('access_token')


    await httpPost(`${baseUrl}/store/categories/`, formData, {
        headers : {
            Authorization : `Bearer ${accessToken}`
        }
    })
        .then(response => {
            if(response.status === 201) {
                toast.success("Category created successfully!")
            }
            console.log(response);
            
        })
        .catch((error) => {
            console.log(error);
            // setIsLoading(false);
        })
}

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent
                rounded="0px"
                overflow="hidden"
                px="8px"
                bgColor="transparent"
                shadow={"none"}
            >
                <ModalBody bgColor="white" rounded="24px" shadow="sm" py="57px">
                    <Text
                        fontWeight="600"
                        fontSize={["18px", null, "20px"]}
                        textAlign="center"
                    >
                        Input the name of the category you wish to create
                    </Text>

                    <Box mt={["14px", null, "24px"]}>
                        <form>
                            <Input
                                type="text"
                                required
                                bgColor={"shades_10"}
                                py="24px"
                                placeholder="Name of category"
                                value={name}
                                onChange={handleChange}
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
                                />
                            </Flex>
                        </form>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CreateCategoryModal;
