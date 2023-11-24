"use client";

import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
 
function SecurityAuth() {
  const { isAuthenticated, isLoading, user, } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return { isAuthenticated, isLoading , user};
}

  export default SecurityAuth;
 