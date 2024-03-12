import AdminDashboard from "@/components/Admin/AdminDashboard"
import SuperAdminDashboard from "@/components/SuperAdmin/SuperAdminDashboard";
import SuperAdminLayout from "@/components/layouts/SuperAdminLayout";
import React from "react";

const index = () => {
  return (
    <SuperAdminLayout title="Hair Sense">
      <SuperAdminDashboard />
    </SuperAdminLayout>
  );
};

export default index;
