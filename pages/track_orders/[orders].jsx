import TrackOrders from "@/My-pages/TrackOrders";
import { Layout, ScreenSize } from "@/components/layouts";
import { useRouter } from "next/router";
import React from "react";

const TrackedOrders = () => {
    const router = useRouter();

    return (
        <Layout>
            <ScreenSize>
                {" "}
                <TrackOrders />{" "}
            </ScreenSize>
        </Layout>
    );
};

export default TrackedOrders;
