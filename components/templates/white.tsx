"use client";

import { MdOutlineMail } from "react-icons/md";
import {
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import { RiKakaoTalkFill, RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";

export default function WhiteTemp() {
  return (
    <main className="flex justify-center">
      <div className="w-full p-7 md:rounded-3xl bg-white flex flex-col items-center shadow-xl md:my-10 md:w-145 ">
        <img
          className="w-24 h-24 mt-10 mb-4"
          src="/home/user.svg"
          alt="avatar"
        />
        <h1 className="text-2xl font-semibold text-[#111827]">User Name</h1>
        <p className=" text-[#4b5563]">user bio here</p>
        <div className="flex flex-col items-center gap-4 mt-10 w-full px-2 font-semibold text-white ">
          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-15  bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-semibold text-lg shadow-lg"
          >
            <FaInstagram className="w-7 h-7 mr-3" /> Instagram
          </Link>

          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-15  bg-blue-400 rounded-2xl font-semibold text-lg shadow-lg"
          >
            <FaTelegram className="w-7 h-7 mr-3" /> Telegram
          </Link>
          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-15  bg-blue-600 rounded-2xl font-semibold text-lg shadow-lg"
          >
            <FaLinkedin className="w-7 h-7 mr-3" /> LinkedIn
          </Link>
          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-15  bg-red-600 rounded-2xl font-semibold text-lg shadow-lg"
          >
            <FaYoutube className="w-7 h-7 mr-3" /> YouTube
          </Link>
          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-15  bg-[#FAE100] rounded-2xl font-semibold text-lg shadow-lg"
          >
            <RiKakaoTalkFill className="w-7 h-7 mr-3 text-[#3C1E1E]" />{" "}
            <p className="text-[#3C1E1E]">KakaoTalk</p>
          </Link>
          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-15  bg-black rounded-2xl font-semibold text-lg shadow-lg"
          >
            <RiTwitterXFill className="w-7 h-7 mr-3" /> Twitter
          </Link>
        </div>
        <div className="w-full text-center my-5 text-white">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question or want to collaborate? Feel free to reach out!
          </p>
          <Link
            href={"https://example.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center w-full h-12  bg-gray-700 rounded-xl font-semibold text-lg shadow-lg"
          >
            <MdOutlineMail className="w-5 h-5 mr-2" /> Send Email
          </Link>
        </div>
        <Link
          href="/create"
          className="mt-10 inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all animate-[bounce_2s_ease-in-out_infinite]"
        >
          <span className="text-white">Create Your ProFile</span>
        </Link>
      </div>
    </main>
  );
}
