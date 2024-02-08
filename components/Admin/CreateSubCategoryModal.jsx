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
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { StateContext } from "@/context/StateProvider";
import axios from "axios";

const CreateSubCategoryModal = ({
    isOpen,
    onOpen,
    onClose,
    Categoryname,
    Categoryid,
}) => {
    const [name, setName] = useState("");
    const { user, isLoading, setIsLoading } = useContext(StateContext);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = {
            category: Categoryid,
            name: name,
        };

        await axios.post(`${baseUrl}/store/sub_categories/`, formData, {
            headers: {
                Authorization: `Bearer ${user}`,
            },
        })
            .then((response) => {

                if (response.status === 200) {
                    setIsLoading(false);
                    onClose();
                    toast.success("Sub Category successfully created");
                }
            })
            .catch((error) => {
                setIsLoading(false);
            });

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
                                    isLoading={isLoading}
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
