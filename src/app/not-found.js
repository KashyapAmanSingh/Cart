import Link from "next/link";
import Image from "next/image";
import notfoundimg from "../../public/images/notfoundimg.svg";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-80">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Image
              priority
              src={notfoundimg}
              height={700}
              width={700}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
        <Link href="/">Click To Go To Home</Link>
      </div>
    </div>
  );
}
 