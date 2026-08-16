import { ProfileComponent } from "@/components/blocks/profile";
import { getMe } from "@/service/getMe";
import React from "react";

const Profilepage = async () => {
  const getMyProfile = await getMe();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <ProfileComponent
        name={getMyProfile.data.name}
        email={getMyProfile.data.email}
        role={getMyProfile.data.role}
        phone={getMyProfile.data.phone}
        address={getMyProfile.data.address}
        status={getMyProfile.data.status}
      ></ProfileComponent>
    </div>
  );
};

export default Profilepage;
