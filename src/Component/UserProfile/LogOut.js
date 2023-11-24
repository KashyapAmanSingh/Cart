"use client";

import React from "react";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import SecurityAuth from "@/utils/SecurityAuth";

function LogOut() {
  const { isAuthenticated, isLoading } = SecurityAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <LogoutLink>Sign out</LogoutLink>
  ) : (
    <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
  );
}
export default LogOut;
