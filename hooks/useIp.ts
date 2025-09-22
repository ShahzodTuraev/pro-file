import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useIp() {
  const path = usePathname();
  const ipManageHanler = async () => {
    try {
      const ipRes = await axios(process.env.NEXT_PUBLIC_IP_API || "");
      const ipResData = ipRes?.data;
      await axios.post("/api/visit/register", {
        ip: ipResData?.query || "",
        country: ipResData?.country || "",
        country_code: ipResData?.countryCode || "",
        region: ipResData?.regionName || "",
        city: ipResData?.city || "",
        lat: ipResData?.lat.toString() || "",
        lon: ipResData?.lon.toString() || "",
      });
    } catch (error) {
      console.log("ipManage error:", error);
    }
  };
  const vidCheck = async () => {
    try {
      const vidResData = await axios.get("/api/visit/check");
      if (vidResData?.data?.status === 404) {
        ipManageHanler();
      }
    } catch (error) {
      console.log("vidFetchErr::", error);
    }
  };
  useEffect(() => {
    vidCheck();
  }, [path]);
}
