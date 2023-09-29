"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./Users";
import UserProfile from "./UserProfile";
import { Loader1 } from "../Progress";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/UserInfoSlice";

const UserDetailAfterSignIn = () => {
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user");
        setHasData(true);
        setData(response.data.user);

        dispatch(addUser(response.data.user[0]));

        setLoading(false);
        // console.log("UserDetailAfterSignIn  ", response.data);
      } catch (error) {
        console.error("Error:", error);
        setHasData(false);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <>
          {hasData && data.length !== 0 ? (
            <div>
              <UserProfile />
            </div>
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
