import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>This Page not Found  Plese refresh or go to Links that lead to a 404 page are often called broken or dead links and can be subject to link rot. </h1>
      <Link href="/">
        Go To Home click here bro all is well its natural to make mistake
      </Link>
    </div>
  );
}
