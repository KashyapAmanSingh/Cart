"use client";

import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

function LogOut() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <LogoutLink>Sign  out</LogoutLink>
  ) : (
    <div>
      <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
    </div>
  );
}
export default LogOut;
