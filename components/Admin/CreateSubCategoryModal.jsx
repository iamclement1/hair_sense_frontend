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

const CreateSubCategoryModal = ({ isOpen, onOpen, onClose, Categoryname, Categoryid }) => {
    // console.log(cate)
    const [name, setName] = useState("");
    const handleChange = (e) => {
        setName(e.target.value);
    };

    const accesToken = Cookies.get('access_token');
    const handleSubmit = async () => {
        const formData = {
            category: Categoryid,
            name: name,
        };

        await httpPost(`${baseUrl}/store/sub_categories/`, formData, {
            headers: {
                Authorization : `Bearer ${accesToken}`
            }
        } )
        .then((response) => {
            // console.log(response);
            if (response.status === 201){
                toast.success("Sub Category successfully created");
            }
        })
        .catch((error) => {
            console.log(error);
        })

        // alert(JSON.stringify(formData));
        onClose();
        setName("");
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

export default CreateSubCategoryModal;
