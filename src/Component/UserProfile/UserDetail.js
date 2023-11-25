"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./Users";
import UserProfile from "./UserProfile";
import { Loader1 } from "../Progress";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/UserInfoSlice";
import SecureProfile from "./secureProfile";
import SecurityAuth from "@/utils/SecurityAuth";
import { fetchData } from "@/utils/FetchCode";

const UserDetailAfterSignIn = () => {
  const [hasData, setHasData] = useState(false);
  const [loader, setLoader] = useState(true);

  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user } = SecurityAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userResponse = await fetchData(`/api/user?id=${user?.id}`);
        const userData = await userResponse.data;
        setData(userData.user);
        setHasData(true);
        dispatch(addUser(userData.user[0]));
        setLoader(false);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchProfileData();
  }, [user?.id, dispatch]);

  if (loader) return <Loader1 />;
  return (
    <>
      {!isAuthenticated ? (
        <div>
          <SecureProfile />
        </div>
      ) : (
        <>
          {hasData && data.length !== 0 ? (
            <UserProfile />
          ) : (
            <div>
              <UserForm />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserDetailAfterSignIn;
