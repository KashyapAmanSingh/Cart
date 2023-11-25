"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import shoppingboy from "../../../public/images/shoppingboy.jpg";
import Loader1 from "@/Component/Progress";
import Link from "next/link";
import {
 
  FaFileInvoiceDollar,
 
} from "react-icons/fa";
import { FcClock } from "react-icons/fc";

 
const SuccessPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session_id = params.get("session_id");
  const [state, setStates] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchD = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`/api/retrieveSession`, {
          session_Id: session_id,
        });

        setStates(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error retrieving data: ",
          error
        );
      }
    };

    fetchD();
  }, [session_id]); // Added session_id as a dependency to useEffect

  if (state && state.data) {
    const { retrievedSession } = state.data;

    const {
      amount_total,
      customer_details: { email, name },
      line_items: { data },
      metadata: { images },
      created,
    } = retrievedSession;

    const date = new Date(created * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day} - ${hours}:${minutes}:${seconds}`;

    const imageUrls = JSON.parse(images);
    const { successInvoice } = state.invoiceUrls;
   


    return (
      <div>
         
        <div className="container-fluid">
          <div className="row">
          <div>
            <h4 className=" text-center mt-4  fs-1 fw-bold">
              Thank you,<span className="text-info fst-italic ">{name}! </span>  for your purchase! Your order has been
              successfully processed. We hope you enjoy your new items!
            </h4>
           

            <div className=" my-3 text-info fw-semibold">
              <Link
                href={successInvoice.Invoice_url ?? "/"}
                className="my-auto d-flex  justify-content-center"
                target="_blank"
              >
                <FaFileInvoiceDollar size={27} />
                <h5 className="font-monospace text-decoration-underline text-reset text-center mx-1 fw-bolder text-dark">
                  Click to Download invoice
                </h5>
              </Link>
            </div>
          </div>
            <div className="col-sm-4 mb-3 col-lg-3  d-flex justify-content-center align-items-top  m-0">
              <Image
                priority
                src={shoppingboy}
                height={600}
                width={580}
                alt="Shopping Boy"
              />
            </div>
            <div className="col-sm-8">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <Loader1 />
                </div>
              ) : (
                <div className="row">
                  {data.map((item, i) => (
                    <div className="col-10 mx-auto col-sm-6 col-lg-4 mb-4" key={i}>
                      <div className="card">
                        <div className="card-img-top border border-muted d-flex justify-content-center align-items-center">
                          <Image
                            src={imageUrls[i]}
                            alt="ordered Product image"
                            height={200}
                            objectFit="contain"
                            width={200}
                            className="p-3"
                          />
                        </div>
                        <div className="card-body">
                          <h7 className="card-title fw-medium">
                            {item.description.slice(0, 80)}...
                          </h7>
                        </div>
                        <div className="card-footer  ">
                          <p className=" fw-semibold text-center my-auto">
                            {" "}
                            Created At : <FcClock size={25} />
                            {formattedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-danger my-5 d-flex justify-content-center align-items-center mx-auto"
            id="continueShoppingButton"
            onClick={() => {
              router.push("/");
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
};

export default SuccessPage;
