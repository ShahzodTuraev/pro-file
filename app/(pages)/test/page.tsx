"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const data = useSession();
  console.log(data);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      type: "sign-in-bro",
      password,
      redirect: false, // stay on page to handle error manually
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/test"; // redirect after login
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign in with Email</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />
      <br />
      <button onClick={() => signOut()}>SignOut</button>
      <br />
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
