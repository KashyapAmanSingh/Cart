"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./Users";
import UserProfile from "./UserProfile";
import { Loader1 } from "../Progress";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/UserInfoSlice";
import SecureProfile from "./secureProfile";

const UserDetailAfterSignIn = () => {
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const [userKindeId, setUserKindeId] = useState(null);

  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    const getKindeSession = async () => {
      try {
        const res = await fetch("/api/kindeSession");
        const data = await res.json();
        setAuthStatus(data.authenticated);
        setUserKindeId(data.user);

        if (data.user?.id) {
          const userResponse = await axios.get(`/api/user?id=${data.user.id}`);
          const userData = userResponse.data;

          setData(userData.user);

          setHasData(true);
          dispatch(addUser(userData.user[0]));

       
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    getKindeSession();
  }, []);

 
  if (loading) return <Loader1 />;
  return (
    <>
      {
        <>
          {!authStatus ? (
            <div>
              <SecureProfile />
            </div>
          ) : hasData && data.length !== 0 ? (
            <UserProfile />
          ) : (
            <div>
              <UserForm />
            </div>
          )}
        </>
      }
    </>
  );
};

export default UserDetailAfterSignIn;
