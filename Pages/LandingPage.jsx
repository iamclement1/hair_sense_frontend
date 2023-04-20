import HeroSlider from "@/components/Common/HeroSlider";
import { Box } from "@chakra-ui/react";
import React from "react";

const LandingPage = () => {
    return (
        <Box pt={["40px",null, "40px"]}>
            <HeroSlider />
        </Box>
    );
};

export default LandingPage;
