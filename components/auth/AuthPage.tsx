"use client";

import { CircleCheckBig, Eye, EyeOff } from "lucide-react";
import styles from "./AuthPage.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useReducer, useState, useCallback } from "react";
import Logo from "../logo/Logo";
import { signIn } from "next-auth/react";
import { formReducer, initialState, State } from "./authReducer";
import {
  checkOtp,
  reSendOtp,
  sendOtp,
  signInService,
  usernameCheck,
} from "@/services/auth.service";
import { dangerSx, pathData, successSx } from "@/const/auth.conts";
import z from "zod";
import toast from "react-hot-toast";

// =========================
// CONSTANTS & SCHEMAS
// =========================
const DEBOUNCE_DELAY = 1000; // 1 second
const MIN_PASSWORD_LENGTH = 8;
const MIN_OTP_LENGTH = 4; // same behavior as your original (>3)
const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;

const emailSchema = z.string().email("Invalid email format");
const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, "Password must be at least 8 characters");

export default function AuthPage() {
  const router = useRouter();
  const path = usePathname();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [debouncedUsername, setDebouncedUsername] = useState("");

  const pageData = pathData(path);
  const isSignup = path === "/signup";
  const isSignin = path === "/signin";
  const isForgot = path === "/forgot";

  const setField = useCallback(
    (field: keyof State, value: State[keyof State]) => {
      dispatch({ type: "FIELD_CHANGE", field, value });
    },
    []
  );

  // =========================
  // USERNAME DEBOUNCE EFFECT
  // =========================
  useEffect(() => {
    if (!isSignup) return;

    const username = state.username;

    if (!username) {
      setDebouncedUsername("");
      setField("usernameAlert", "");
      setField("usernameStatus", null);
      return;
    }

    // reset state while user is still typing
    setField("usernameStatus", "loading");
    setField("usernameAlert", "");

    const timer = setTimeout(() => {
      setDebouncedUsername(username);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [state.username, isSignup, setField]);

  // =========================
  // USERNAME CHECK EFFECT
  // =========================
  useEffect(() => {
    if (!isSignup || !debouncedUsername) return;

    let cancelled = false;

    const checkUserName = async () => {
      try {
        const data = await usernameCheck(debouncedUsername);

        if (cancelled || !data) return;

        if (data.status === 200) {
          setField("usernameStatus", "200");
          setField("usernameAlert", "");
        } else if (data.status === 422) {
          setField("usernameStatus", "422");
          setField("usernameAlert", data.data?.message || "");
        } else {
          setField("usernameStatus", "422");
          setField("usernameAlert", "Unable to validate username.");
        }
      } catch {
        if (!cancelled) {
          setField("usernameStatus", "422");
          setField("usernameAlert", "Unable to validate username.");
        }
      }
    };

    checkUserName();

    return () => {
      cancelled = true;
    };
  }, [debouncedUsername, isSignup, setField]);

  // =========================
  // HANDLERS
  // =========================
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "username") {
      // only allow alphanumeric; if invalid, ignore (except empty)
      if (value === "") {
        setField("username", "");
      } else if (USERNAME_REGEX.test(value)) {
        setField("username", value.toLowerCase());
      }
      return;
    }

    if (name === "otp") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setField("otp", numericValue);

      // Enable submit button when enough digits are entered
      if (numericValue.length >= MIN_OTP_LENGTH) {
        setField("disableSubmitBtn", null);
      } else {
        setField("disableSubmitBtn", "disable");
      }
      return;
    }

    setField(name as keyof State, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const emailValidation = emailSchema.safeParse(state.email);
      const passwordValidation = passwordSchema.safeParse(state.password);

      setField(
        "emailAlert",
        emailValidation.success
          ? null
          : emailValidation.error?.issues[0].message
      );
      setField(
        "passwordAlert",
        passwordValidation.success
          ? null
          : passwordValidation.error?.issues[0].message
      );

      // ========== SIGNUP ==========
      if (isSignup) {
        const isBaseValid =
          emailValidation.success &&
          passwordValidation.success &&
          state.usernameStatus === "200";

        // 1) Send OTP
        if (isBaseValid && state.otp.length === 0) {
          setField("disableSubmitBtn", "loading");

          const req = await sendOtp({
            email: state.email,
            password: state.password,
            username: state.username,
            type: "SIGNUP",
          });

          if (req?.status === 201) {
            setField("emailAlert", null);
            setField("sentOtp", true);
            setField("disableSubmitBtn", "disable");
          } else if (req?.status === 409) {
            setField(
              "emailAlert",
              req.data?.message || "Email already in use."
            );
            setField("disableSubmitBtn", null);
          } else {
            setField("emailAlert", "Something went wrong.");
            setField("disableSubmitBtn", null);
          }
        }

        // 2) Verify OTP
        if (state.otp.length >= MIN_OTP_LENGTH) {
          setField("disableSubmitBtn", "loading");
          const res = await checkOtp(state.otp);

          if (!res) {
            setField("disableSubmitBtn", null);
            setField("otpAlert", "Something went wrong.");
            return;
          }

          if (res.status === 403) {
            setField("otpAlert", res.data?.message || "Invalid OTP.");
            setField("disableSubmitBtn", null);
          } else if (res.status === 200) {
            setField("disableSubmitBtn", null);
            router.push("/");
          } else {
            setField("disableSubmitBtn", null);
            setField("otpAlert", "Something went wrong.");
          }
        }

        return;
      }

      // ========== SIGNIN ==========
      if (isSignin) {
        const res = await signInService({
          email: state.email,
          password: state.password,
        });

        if (!res) return;

        if (res.status === 200) {
          router.push("/");
        } else if (res.status === 404) {
          setField("emailAlert", res.data?.message || "User not found.");
        } else if (res.status === 401) {
          setField(
            "passwordAlert",
            res.data?.message || "Invalid credentials."
          );
        } else {
          setField("passwordAlert", "Something went wrong.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reSendOtpHandler = async () => {
    try {
      setField("isResend", true);
      const req = await reSendOtp();

      if (req?.status === 201) {
        toast.success("OTP sent to your email.", { duration: 2000 });
      } else {
        toast.error("Something went wrong.", { duration: 2000 });
      }
    } catch {
      toast.error("Something went wrong.", { duration: 2000 });
    } finally {
      setField("isResend", false);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <main className={styles.authPage}>
      <div className={styles.header}>
        <div onClick={() => router.push("/")}>
          <Logo />
        </div>
      </div>

      <div className={styles.formContainer}>
        <h2>{pageData.header}</h2>

        {isForgot && (
          <p className={styles.info}>
            Enter your Bio Link email to reset your password
          </p>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* EMAIL */}
          <TextField
            label="Email"
            name="email"
            type="email"
            error={!!state.emailAlert}
            variant="outlined"
            size="small"
            required
            onChange={handleChange}
            helperText={state.emailAlert}
          />

          {/* USERNAME (SIGNUP ONLY) */}
          {isSignup && (
            <TextField
              id="outlined-username"
              type="text"
              name="username"
              onChange={handleChange}
              value={state.username}
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <span>pro-file.top/</span>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {state.usernameStatus === "loading" && (
                        <CircularProgress enableTrackSlot size="20px" />
                      )}
                      <CircleCheckBig
                        style={
                          state.usernameStatus === "200"
                            ? { display: "block", color: "#70C050" }
                            : { display: "none" }
                        }
                      />
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              error={state.usernameStatus === "422"}
              helperText={state.usernameAlert}
              autoComplete="off"
              size="small"
              sx={
                state.usernameStatus === "200"
                  ? successSx
                  : state.usernameStatus === "422"
                  ? dangerSx
                  : {}
              }
            />
          )}

          {/* PASSWORD (NOT FORGOT) */}
          {!isForgot && (
            <FormControl
              required
              sx={{ width: "100%" }}
              size="small"
              variant="outlined"
              error={!!state.passwordAlert}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>

              <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                autoComplete="off"
                type={state.showPassword ? "text" : "password"}
                onChange={handleChange}
                value={state.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        state.showPassword ? "hide password" : "show password"
                      }
                      onClick={() =>
                        setField("showPassword", !state.showPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {state.showPassword ? <Eye /> : <EyeOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />

              <FormHelperText>{state.passwordAlert}</FormHelperText>
            </FormControl>
          )}

          {/* OTP (SIGNUP + SENT) */}
          {isSignup && state.sentOtp && (
            <>
              <FormControl variant="outlined">
                <OutlinedInput
                  size="small"
                  name="otp"
                  placeholder="Paste OTP"
                  error={!!state.otpAlert}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      {state.isResend ? (
                        <CircularProgress enableTrackSlot size="20px" />
                      ) : (
                        <span
                          className={styles.otpResend}
                          onClick={reSendOtpHandler}
                        >
                          Resend
                        </span>
                      )}
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  <span style={{ color: "#FF4963" }}>{state.otpAlert}</span>
                </FormHelperText>
              </FormControl>
              <p>
                Enter the 6-digit code we sent to your email. <br /> If you
                don’t see it, check your spam folder.
              </p>
            </>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={
              state.disableSubmitBtn === "disable" ||
              state.disableSubmitBtn === "loading"
            }
            type="submit"
            className={
              state.disableSubmitBtn === "disable"
                ? styles.primaryBtnDisable
                : styles.primaryBtn
            }
          >
            {state.disableSubmitBtn === "loading" ? (
              <CircularProgress
                size="1.120rem"
                sx={{ color: "#fff", padding: 0 }}
              />
            ) : (
              pageData.mainButton
            )}
          </button>

          {!isForgot && (
            <Link href="/forgot" className={styles.forgetPassword}>
              Forget password?
            </Link>
          )}
        </form>

        {/* GOOGLE SIGN-IN / OR DIVIDER */}
        {!isForgot && (
          <>
            <div className={styles.wallBox}>
              <div />
              <p>Or</p>
              <div />
            </div>

            <button
              onClick={() => signIn("google")}
              className={styles.googleBtn}
            >
              <span className={styles.googleIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-hidden="false"
                  aria-labelledby=":r0:_title"
                >
                  <path
                    fill="#4285F4"
                    d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34Z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H3.06v2.6A10 10 0 0 0 12 22Z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M6.4 13.9a6.01 6.01 0 0 1 0-3.8V7.5H3.06a10 10 0 0 0 0 9l3.34-2.6Z"
                  ></path>
                  <path
                    fill="#EA4335"
                    d="M12 5.98c1.47 0 2.79.5 3.82 1.5L18.7 4.6A10 10 0 0 0 3.06 7.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12Z"
                  ></path>
                </svg>
              </span>
              {pageData.googleButton}
            </button>
          </>
        )}
      </div>

      {!isForgot && (
        <div className={styles.footer}>
          <p>{pageData.headText}</p>
          <Link href={pageData.headPath || "/"}>{pageData.headLink}</Link>
        </div>
      )}
    </main>
  );
}
