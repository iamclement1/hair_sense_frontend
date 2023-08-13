import MyAccount from "@/My-pages/MyAccount";
import { Layout, ScreenSize } from "@/components/layouts";
import { StateContext } from "@/context/StateProvider";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const my_account = () => {
    const router = useRouter();
    const { user } = useContext(StateContext);
    useEffect(() => {
        const isLoggedIn = Cookies.get("access_token");
        if (!isLoggedIn) {
            router.push("/");
        }
    }, []);
    return (
        <Layout>
            <ScreenSize>
                <MyAccount />
            </ScreenSize>
        </Layout>
    );
};

export default my_account;
