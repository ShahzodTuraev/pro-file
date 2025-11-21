import { SignUpReqBody } from "@/interfaces/auth";
import axios from "axios";

export const usernameCheck = async (value: string) => {
  try {
    const req = await axios.post("/api/link-check", {
      username: value,
    });
    return req;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const sendOtp = async (data: SignUpReqBody) => {
  try {
    const req = await axios.post("/api/v1/auth/otp/create", data);
    return req;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
