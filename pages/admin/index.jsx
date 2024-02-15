import AdminDashboard from "@/components/Admin/AdminDashboard";
import AdminLayout from "@/components/layouts/AdminLayout";
import React from "react";

const index = () => {
    return (
        <AdminLayout title="Hair Sense">
            <AdminDashboard />
        </AdminLayout>
    );
};

export default index;
