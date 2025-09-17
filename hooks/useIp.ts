import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useIp() {
  const path = usePathname();
  const ipManageHanler = async () => {
    try {
      const ipRes = await axios(process.env.NEXT_PUBLIC_IP_API || "");
      const ipResData = ipRes?.data;
      const vidRes = await axios.post("/api/visit/register", {
        ip: ipResData?.query || "",
        country: ipResData?.country || "",
        country_code: ipResData?.countryCode || "",
        region: ipResData?.regionName || "",
        city: ipResData?.city || "",
        lat: ipResData?.lat.toString() || "",
        lon: ipResData?.lon.toString() || "",
      });
      localStorage.setItem("VID", vidRes?.data?.VID);
    } catch (error) {
      console.log("ipManage error:", error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const vid = localStorage.getItem("VID");
      if (!vid) {
        try {
          ipManageHanler();
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
        }
      }
    }
  }, [path]);
}
