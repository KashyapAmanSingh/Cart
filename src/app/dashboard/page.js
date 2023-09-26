"use react"
"use react";
import React from 'react';
import UserDetailAfterSignIn from '@/Component/UserProfile/UserDetail';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = () => {
  // Define a function to fetch the user and handle the authentication status
  const checkAuthentication = async () => {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (await isAuthenticated()) {
      return (
        <div>
          <UserDetailAfterSignIn />
        </div>
      );
    } else {
      return <p>Please sign in or register!Redirect to sign page bro </p>;
    }
  };

  // Render the content returned by checkAuthentication function
  return checkAuthentication();
};

export default Page;
