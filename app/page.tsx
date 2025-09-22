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
  return (
    <div>
      <button onClick={authHandler}>sign in by Google</button>
    </div>
  );
}
