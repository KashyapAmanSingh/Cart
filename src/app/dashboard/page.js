"use client"
import React from 'react';
import UserDetailAfterSignIn from '@/Component/UserProfile/UserDetail';
import SecurityAuth from '@/utils/SecurityAuth';
  
const Page = () => {
  const { isAuthenticated, isLoading, user } = SecurityAuth();
 
if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <UserDetailAfterSignIn />
 
  ) : (
    <p>Please sign in or register! Redirect to the sign page, bro.</p>
  );
};

export default Page;
