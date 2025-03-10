"use client";
import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { IoMdClose } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [dialogBox, setDialogBox] = useState(false);

  const params = useParams();
  const eventId = params.eventName;
  // const eventId = params.eventId;
  // console.log(eventId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URI}/registration`,
      // `http://localhost:8000/api/v1/event/registration`,
      { ...formData, eventId }
    );
    setData(response?.data);
    setDialogBox(true);
    // console.log(response?.data?.data);
    // console.log(response?.data?.message);
    // toast.success(res.data.message, {
    //   position: "top-center",
    // });
    setFormData({
      name: "",
      email: "",
      contact: "",
    });
    setLoading(false);
  };

  return (
    <div
      className={`w-full h-[100vh] flex justify-center items-center bg-slate-100`}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[60%] lg:w-[30%] flex flex-col gap-y-4 bg-slate-200 text-black p-8 shadow-2xl rounded-2xl"
      >
        <h2 className={`text-center font-bold text-blue-500 text-2xl`}>
          {decodeURIComponent(eventId)}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          className="border p-2 rounded-lg"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          className="border p-2 rounded-lg"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          value={formData.contact}
          className="border p-2 rounded-lg"
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer"
        >
          {loading ? "Please wait..." : "Register"}
        </button>
        <Link
          href={"/"}
          className={`text-blue-500 flex items-center gap-x-1 hover:scale-105 transition-all`}
        >
          <IoArrowBackOutline /> Back
        </Link>
      </form>
      {dialogBox && (
        <div className="w-full h-[100vh] flex justify-center items-center fixed top-0 left-0 z-20 bg-slate-100 text-black">
          <div
            className={`w-[90%] md:w-[60%] lg:w-[30%] p-6 rounded-lg bg-slate-200 flex flex-col items-center justify-center gap-y-3 shadow-2xl`}
          >
            <p className="text-green-700 font-semibold text-xl md:text-2xl">
              {" "}
              {data?.message}
            </p>
            <span>Registration ID : {data?.data}</span>
            <button
              onClick={() => setDialogBox(false)}
              className="flex items-center gap-x-2 bg-red-700 text-white py-1 px-3  rounded-md cursor-pointer"
            >
              Close
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
