"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = () => {
    setLoading(true);
    axios.get(`${process.env.NEXT_PUBLIC_URI}/events`).then((response) => {
      setEvents(response.data);
      // console.log(response.data);
    });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full h-[100vh] fixed top-0 left-0 z-20 bg-slate-100 flex justify-center items-center">
          <div className="bg-slate-200 text-blue-600 font-semibold text-lg -mt-6 py-2 px-5 rounded-md shadow-md">
            Loading...
          </div>
        </div>
      )}
      <div className="containers mx-autos p-4 w-full h-[100vh] bg-slate-100 text-black">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-800 underline">
          Upcoming Events
        </h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
          {events.map((event) => (
            <li
              key={event?.id}
              className="borders p-4 mb-4 rounded-lg flex flex-col items-center bg-slate-200 shadow-lg hover:shadow-none"
            >
              <div className="w-full flex justify-center items-center mb-3">
                <IoCalendarOutline className="text-8xl" />
              </div>
              <h2 className="text-xl font-bold">{event?.name}</h2>
              <p>{event.description}</p>
              <Link
                href={`/register/${event?.name}`}
                // href={`/register?eventId=${event?.id}?eventName=${event?.name}`}
                legacyBehavior
              >
                {/* <a className="text-blue-500"> */}
                <span className="text-blue-700 cursor-pointer">Register</span>

                {/* </a> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
