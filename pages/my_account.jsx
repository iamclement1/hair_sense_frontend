import MyAccount from "@/My-pages/MyAccount";
import { Layout, ScreenSize } from "@/components/layouts";
import { StateContext } from "@/context/StateProvider";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const Account = () => {
    const router = useRouter();
    const { user } = useContext(StateContext);

    useEffect(() => {
        const role = sessionStorage.getItem("role");

        if (!user && role !== "client") {
            router.push("/");
        }
    }, [user, router]);

    return (
        <Layout title="My Account">
            <ScreenSize>
                <MyAccount />
            </ScreenSize>
        </Layout>
    );
};

export default Account;
