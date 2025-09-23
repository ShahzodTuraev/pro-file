"use client";

import { useIp } from "@/hooks/useIp";
import { useVidStore } from "@/store/useVidStore";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  useIp();
  useVidStore();
  const authHandler = async () => {
    try {
      const res = await axios.post("/api/auth/sign-up", { id: "hello" });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOtpHandler = async () => {
    try {
      const res = await axios.post("/api/auth/otp/create", {
        email: "shonnim01@gmail.com",
        name: "Tessted",
        password: "952616",
      });
      console.log(res);
    } catch (error) {
      console.log("get otp err:::", error);
    }
  };

  const checkOtpHandler = async () => {
    try {
      const res = await axios.post("/api/auth/otp/check", {
        otp: "872446",
      });
      console.log(res);
    } catch (error) {
      console.log("check otp err:::", error);
    }
  };
  const data = useSession();
  console.log(data);
  return (
    <div>
      <button onClick={authHandler}>sign in by Google</button>
      <br />
      <br />
      <button onClick={getOtpHandler}>Create OTP</button>
      <br />
      <br />
      <button onClick={checkOtpHandler}>Check OTP</button>
      <br />
      <button onClick={() => signOut()}>SignOut</button>
    </div>
  );
}
