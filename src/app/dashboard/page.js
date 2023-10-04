
"use react";
 import React from 'react';
 import UserDetailAfterSignIn from '@/Component/UserProfile/UserDetail';
 import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = () => {
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
      return <p>Please sign in or register!Redirect to sign page bro  </p>;
    }
  };

   return checkAuthentication();
};

export default Page;
