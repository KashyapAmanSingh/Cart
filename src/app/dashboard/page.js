"use client";
import React from "react";
import UserDetailAfterSignIn from "@/Component/UserProfile/UserDetail";
import SecurityAuth from "@/utils/SecurityAuth";
import LoginFirst from "@/Component/UserProfile/LoginFirst";

const Page = () => {
  const { isAuthenticated, isLoading, user } = SecurityAuth();
  console.log(user);
  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <UserDetailAfterSignIn />
  ) : (
    <>
      <LoginFirst />
    </>
  );
};

export default Page;
