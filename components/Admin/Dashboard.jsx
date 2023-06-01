import AdminLayout from "@/components/layouts/AdminLayout";
import { Box, Flex, Image, Link, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { PrimaryButton } from "@/components/Common";

const Dashboard = () => {
    return (
        <Box>
            <Box>
                <Text fontWeight="600" fontSize="24px">
                    Welcome to your Dashboard
                </Text>
            </Box>
        </Box>
    );
};

export default Dashboard;
