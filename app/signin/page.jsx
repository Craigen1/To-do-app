"use client";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const [showPass, setShowPass] = useState(true);

  const handleShow = () => {
    setShowPass(!showPass);
  };

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col">
          <input
            className="md:p-2 p-1 my-1 border rounded-sm text-sm"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <input
              className="md:p-2 p-1 my-1 border rounded-sm text-sm"
              type={showPass ? `password` : `text`}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="px-2 text-xs md:text-md" onClick={handleShow}>
              {showPass ? "Show" : "Hide"}
            </button>
          </div>
          <button
            onClick={handleSignIn}
            className="p-2 my-1 border rounded-md text-white bg-sky-500 text-xs md:text-md w-fit md:w-full"
          >
            Sign-In
          </button>
          <p className="text-xs md:text-md my-3">
            You don't have an account?
            <span className="px-2 underline text-emerald-500 font-medium">
              <Link href="/signup">Sign-Up</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
