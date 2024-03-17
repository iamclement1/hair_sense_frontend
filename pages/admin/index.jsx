import AdminDashboard from "@/components/Admin/AdminDashboard";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
    return (
        <AdminLayout title="Hair Sense">
            <AdminDashboard />
            <ToastContainer />
        </AdminLayout>
    );
};

export default index;
