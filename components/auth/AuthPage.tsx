"use client";
import { Eye, EyeOff, User } from "lucide-react";
import styles from "./AuthPage.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Logo from "../logo/Logo";
export default function AuthPage() {
  // INITIALIZATION
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const path = usePathname();
  const pageData = {
    headText:
      path === "/signup"
        ? "Already have an account?"
        : "Don't have an account? ",
    headLink: path === "/signup" ? "Sign in" : "Sign up",
    headPath: path === "/signup" ? "/signin" : "/signup",
    header: path === "/signup" ? "Create your account" : "Sign in",
    mainButton: path === "/signup" ? "Sign Up With Email" : "Sign In",
    googleButton:
      path === "/signup" ? "Sign Up With Google" : "Sign In With Google",
  };
  // HANDLER
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

  return (
    <main className={styles.authPage}>
      <div className={styles.header}>
        <div onClick={() => router.push("/")}>
          <Logo />
        </div>
        <div className={styles.headerActions}>
          <p>{pageData.headText}</p>
          <Link href={pageData.headPath}>{pageData.headLink}</Link>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h2>{pageData.header}</h2>
        <form className={styles.form} action="">
          <TextField
            id="outlined-basic"
            label="Email"
            error={false}
            variant="outlined"
            size="small"
          />
          {path === "/signup" && (
            <TextField
              id="outlined-basic"
              // label="Password"
              type="text"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      pro-file.top/
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              helperText=""
              // error={true}
              size="small"
            />
          )}

          <FormControl sx={{ width: "100%" }} size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <button className={styles.primaryBtn}>{pageData.mainButton}</button>
        </form>
        <div className={styles.wallBox}>
          <div />
          <p>Or</p>
          <div />
        </div>
        <button className={styles.googleBtn}>
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
      </div>
      <div className={styles.footer}>
        By signing up, you agree to our <Link href={"#"}>Terms of Service</Link>{" "}
        and <br /> <Link href={"#"}>Privacy Policy</Link>.
      </div>
    </main>
  );
}
