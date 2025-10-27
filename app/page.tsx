"use client";

import Navbar from "@/components/navbar";
import { useIp } from "@/hooks/useIp";

export default function Home() {
  useIp();

  return (
    <main>
      <Navbar />
      <div style={{}}>box</div>
    </main>
  );
}
