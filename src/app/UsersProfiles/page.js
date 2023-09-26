import React from 'react'
import UserForm from '@/Component/UserProfile/Users'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";


 
const page = () => {
 

  return (
    <div><UserForm/></div>
  )
}

export default page