import Link from "next/link";
import Image from "next/image";
import notfoundimg from "../../public/images/notfoundimg.svg";

export default function NotFound() {
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12  mb-0 mt-0 d-flex flex-column justify-content-center align-items-center vh-80">
            <h1 className="my-3 text-dark text-center fw-bold fs-2 text-info">
              Oops! It seems you have stepped into the enchanting realm of 404.
            </h1>
            <p className="text-center text-muted fs-5">
              Unfortunately, no gym gear wizards to be found here. Our fitness
              enchanters are working to guide you back to the right path.Ok good Day!
            </p>
            <Image
              priority
              src={notfoundimg}
              height={650}
              width={650}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
        <Link
          className="d-flex flex-column justify-content-center align-items-center mt-0 mb-5"
          href="/"
        >
          Click To Go To Home
        </Link>
      </div>
    </div>
  );
}
