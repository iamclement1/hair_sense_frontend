import ThankYou from "@/My-pages/ThankYou";
import { Layout } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";

const thank_you = () => {
    return (
        <Layout title={"Thank You Page  | Hair sense"}>
            <ThankYou />
        </Layout>
    );
};

export default thank_you;
