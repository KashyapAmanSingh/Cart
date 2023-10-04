import React from "react";
 
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const LogOut = () => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  return (
    <div>
      {isAuthenticated() ? (
        <LogoutLink>Log out</LogoutLink>
      ) : (
        <LoginLink>Sign In</LoginLink>
      )}
    </div>
  );
};

export default LogOut;
