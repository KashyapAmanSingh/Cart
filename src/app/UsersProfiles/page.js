import React from 'react'
import UserForm from '@/Component/UserProfile/Users'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import UserDetailAfterSignIn from '@/Component/UserProfile/UserDetail';


 
const page = () => {
 

  return (
    <div>   <UserDetailAfterSignIn /> </div>
  )
}

export default page