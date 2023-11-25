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
        dispatch(addUser(userData.user[0]));
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoader(false);
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
          {data.length !== 0 ? (
            <UserProfile />
          ) : (
            data.length === 0 && (
              <div>
                <UserForm />
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default UserDetailAfterSignIn;
