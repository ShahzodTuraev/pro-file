"use client";

import { useIp } from "@/hooks/useIp";
import { useVidStore } from "@/store/useVidStore";
import axios from "axios";

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
        email: "shon@gmail.com",
        name: "SHonnim",
        password: "123456",
      });
      console.log(res);
    } catch (error) {
      console.log("get otp err:::", error);
    }
  };

  const checkOtpHandler = async () => {
    try {
      const res = await axios.post("/api/auth/otp/check", {
        otp: "935552",
      });
      console.log(res);
    } catch (error) {
      console.log("check otp err:::", error);
    }
  };

  return (
    <div>
      <button onClick={authHandler}>sign in by Google</button>
      <br />
      <br />
      <button onClick={getOtpHandler}>Create OTP</button>
      <br />
      <br />
      <button onClick={checkOtpHandler}>Check OTP</button>
    </div>
  );
}
