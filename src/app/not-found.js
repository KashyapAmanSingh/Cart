import Link from "next/link";
import Image from "next/image";
import notfoundimg from "../../public/images/notfoundimg.svg";

export default function NotFound() {
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12  mb-0 mt-0 d-flex flex-column justify-content-center align-items-center vh-80">
            <h1 className=" my-3 text-center fw-bold fs-2 text-info">Whoops! Looks like you've ventured into the mystical land of 404. No gym gear wizards here</h1>
            <Image
              priority
              src={notfoundimg}
              height={650}
              width={650}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
        <Link className="d-flex flex-column justify-content-center align-items-center mt-0 mb-5" href="/">Click To Go To Home</Link>
      </div>
    </div>
  );
}
 