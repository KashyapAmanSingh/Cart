 
import { useRouter } from "next/router";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useEffect } from "react";
import CheckoutButton from "@/Compo/checkoutform";

const CartAuth = () => {
  const router = useRouter();
  const { getUser, isAuthenticated } = getKindeServerSession();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <CheckoutButton />
    </div>
  );
};

export default CartAuth;
