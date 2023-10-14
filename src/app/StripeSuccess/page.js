"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import shoppingboy from "../../../public/images/shoppingboy.jpg";
import Loader1 from "@/Component/Progress";
import Link from "next/link";
import { FaFileInvoiceDollar } from "react-icons/fa";

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
          "Error retrieving data: -------------------------------------------------->",
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
    }${day} ${hours}:${minutes}:${seconds}`;

    const imageUrls = JSON.parse(images);
    const { successInvoice } = state.invoiceUrls;
    console.log(
      "Invoice information successInvoice.hosted_invoice_url ~~~~~ ~~~",
      successInvoice.Invoice_url
    );

    return (
      <div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Loader1 />
          </div>
        ) : (
          <div>
            <h4 className="text-center text-danger mt-4 fw-bold fw-semibold">
              {" "}
              Hi, {name}! thank you for your payment! Come back soon for more
              great deals!
            </h4>
            <div  className=" my-4   text-info fw-semibold">
            <Link
  href={successInvoice.Invoice_url ?? "/"}
  className="my-auto d-flex  justify-content-center"
  target="_blank"
>
  <FaFileInvoiceDollar size={27}/>
  <h5 className="text-center mx-1 fw-bolder text-dark">Click to Download invoice</h5>
</Link>
          </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className=" col-sm-4 d-flex justify-content-center align-items-center vh-70">
              <Image
                priority
                src={shoppingboy}
                height={670}
                width={670}
                alt="Shopping Boy"
              />
            </div>
            <div className=" col-sm-8  ">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center ">
                  <Loader1 />
                </div>
              ) : (
                data.map((item, i) => (
                  <div className="col-sm-3" key={i}>
                    <div className="card_body"></div>
                    <h7>{item.description.slice(0, 60)}...</h7>
                    <div className="imgcard ">
                      <Image
                        src={imageUrls[i]}
                        alt="ordered Product image"
                        height={100}
                        width={100}
                      />
                    </div>
                    <div>
                      <p>You created this order at {formattedDate}</p>
                      <p>Your Total amount: {amount_total}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* <div>
            <Link
              href={
                successInvoice.Invoice_url
                  ? successInvoice.Invoice_url
                  : (target = "_blank")
              }
            >
              <FaFileInvoiceDollar />
              <p>Click to view invoice</p>
            </Link>
          </div> */}
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
