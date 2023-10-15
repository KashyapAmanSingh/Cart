import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import parse from "url-parse";
export async function GET(request, { params }) {
	const parsedUrl = parse(request.url, true);
  console.log(
    "GET from the kind auth dynamic urls----------------------------------------------------------========================================================================",
    request,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",parsedUrl,parsedUrl.query, params);
 
  const endpoint = params.kindeAuth;
  return handleAuth(request, endpoint);
}
