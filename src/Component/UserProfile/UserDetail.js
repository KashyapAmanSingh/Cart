
"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './Users';
 
const UserDetailAfterSignIn = () => {
  const [hasData, setHasData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user");
          setHasData(true);
        setLoading(false);
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
        <div>Loading...</div>
      ) : (
        <>
          {hasData ? (
            <div>
              <p>Data is available</p>
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
