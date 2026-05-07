"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { BuildingIcon } from "lucide-react";

export default function CustomUserButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Organizations"
        labelIcon={<BuildingIcon />}
        url="/organizations"
      >
        <div className="p-4">
          <h2>Manage Orgs</h2>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={"/submit"}
            afterSelectPersonalUrl={"/submit"}
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
