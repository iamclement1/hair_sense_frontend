import { Box, Divider, Flex, Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react'
import { PrimaryButton } from '../Common';
import useDeleteCategoryById from '@/hooks/useDeleteCategory';
import CustomSpinner from '../Common/Spinner';

const DeleteCategory = ({ isOpen, onClose, onOpen, data }) => {
  const { handleDeleteCategory, isPending } = useDeleteCategoryById(data?.id);

  const payload = {
    name: data?.name,
  }
  const handleDelete = () => {
    handleDeleteCategory(payload);
    onClose();
    onOpen();
  };

  if (isPending) return <CustomSpinner />

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" >
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
              {"Do you want to delete"}, {data?.name}?
            </Text>
          </Flex>
          <Divider mt="8px" />

          <Flex align="center" gap={"5"} >
            <PrimaryButton
              maxW="190px"
              text="No"
              align="center"
              marginTop="20px"
              isOpen={isOpen}
              handleButton={onClose}
            />
            <PrimaryButton
              maxW="190px"
              text="Yes"
              bgColor="transparent"
              align="center"
              marginTop="20px"
              isOpen={isOpen}
              handleButton={() => {
                handleDelete(data?.id);
                onClose();
              }}
            />
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default DeleteCategory