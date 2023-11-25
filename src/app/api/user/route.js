import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import { NextResponse } from "next/server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "../../../../models/User";
import parse from "url-parse";

export async function POST(req) {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const {
    name,
    mobileNumber,
    email,
    profilePicture,
    address: { street, city, state, postalCode, country },
  } = await req.json();
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

export async function GET(req) {
  const parsedUrl = parse(req.url, true);
   await ConnectionMongoosedbs();

  try {
    const foundUser = await User.find({ id: parsedUrl.query.id });

    return NextResponse.json(
      { user: foundUser ? foundUser : "" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error("Error fetching user data", { status: 500 });
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await ConnectionMongoosedbs();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
