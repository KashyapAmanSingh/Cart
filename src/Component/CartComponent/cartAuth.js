"use client"
import Cart from '@/Component/CartComponent/Cart';
import React, { useEffect, useState } from 'react';
import   Loader1  from '../Progress';
 import { useDispatch } from 'react-redux';
import { addUser } from '@/redux/UserInfoSlice';
import axios from 'axios';

 
const CartAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user,   setData] = useState();
  const [userKindeId,setUserKindeId] = useState(null);

  const [authStatus, setAuthStatus] = useState(null);
  const dispatch = useDispatch()
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
  dispatch(addUser(userData.user[0]));

  console.log(userData.user[0]._id, "This is the best place to use user information");

}    
      } catch (error) {
        console.error('Error fetching user information:', error);
      } finally {
        setLoading(false);
      }
    };

    getKindeSession();
  }, []);

  return (
    <div>
      {loading ? (
     <Loader1/> 
      ) : authStatus ? (
        <Cart />
      ) : ( 
        <p>Please log in to view your cart. </p>              //<Link></Link>
      )}
    </div>
  );
};

export default CartAuth;