import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>This Page not Found</h1>
      <Link href="/">
        Go To Home 
      </Link>
    </div>
  );
}
