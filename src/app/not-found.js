import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1>This Page not Found its natural to make mistake</h1>
      <Link href="/">
        Go To Home click here bro all is well its natural to make mistake
      </Link>
    </div>
  );
}
