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

export const reSendOtp = async () => {
  try {
    const req = await axios("/api/v1/auth/otp/resend");
    return req;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};

export const checkOtp = async (otp: string) => {
  try {
    return await axios.post("/api/v1/auth/otp/check", { otp });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    }
  }
};
