import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import { NextResponse } from "next/server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "../../../../models/User";

export async function POST(request) {
  console.log(request);
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const {
    name,
    mobileNumber,
    email,
    profilePicture,
    address: { street, city, state, postalCode, country },
  } = await request.json();
  await ConnectionMongoosedbs();

  try {
    await User.create({
      id: user.id,
      given_name: user.given_name,
      family_name: user.family_name,
      mobileNumber,
      email: user.email,
      profilePicture,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    });

    return NextResponse.json({ message: "User Created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Failed to create the User", { status: 500 });
  }
}

export async function GET() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  console.log(user.id, "----==================================================given name from backend------------------------------------------------------========================================================");

  await ConnectionMongoosedbs();

  try {
     const foundUser = await User.find({ id: user.id });
    console.log(foundUser, "User of the id from MongoDB");
    return NextResponse.json({ user: foundUser ? foundUser : "" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Error fetching user data", { status: 500 });
  }
}

 

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await ConnectionMongoosedbs();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
