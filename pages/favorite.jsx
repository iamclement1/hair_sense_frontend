import Favourite from "@/Pages/Favorite";
import LandingPage from "@/Pages/LandingPage";
import { Layout, ScreenSize } from "@/components/layouts";
import React from "react";

const favorite = () => {
    return (
        <Layout title="Hair Sense Favortie page">
            <ScreenSize>
                <Favourite />
            </ScreenSize>
        </Layout>
    );
};

export default favorite;
