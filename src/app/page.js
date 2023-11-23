// import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";
 // const LogOut = dynamic(() => import("@/Component/UserProfile/LogOut"), {
//   Suspense: true,
// });
const MainPage = dynamic(() => import("../Component/MainPage"), {
  Suspense: true,
});

export default function Home() {
  return (
    <h1>
      {" "}
      <Suspense fallback={<div>Loading MainPage...</div>}>
        <MainPage />
        
      </Suspense>
 
    </h1>
  );
}
