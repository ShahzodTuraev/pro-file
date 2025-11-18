import axios from "axios";

export const usernameCheck = async (value: string) => {
  try {
    const req = await axios.post("/api/link-check", {
      username: value,
    });
    return req;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data || {
        message: "An error occurred",
      };
      return error.response;
    }
  }
};
