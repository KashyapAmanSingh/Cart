 import LogOut from "@/Component/UserProfile/LogOut";
import MainPage from "../Component/MainPage";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/server";
 
export default function Home() {
  return (
    <h1>
      {" "}
      <MainPage />
      <LoginLink>Sign in</LoginLink>

<RegisterLink>Sign up</RegisterLink>
<LogOut/>
    </h1>
  );
}
