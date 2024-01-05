"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(true);

  const handleShow = () => {
    setShowPass(!showPass);
  };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    if (password === confirmpassword) {
      try {
        const res = await createUserWithEmailAndPassword(email, password);
        console.log({ res });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Please enter correct password");
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
          <div>
            <input
              className="md:p-2 p-1 my-1 border rounded-sm text-sm"
              type={showPass ? `password` : `text`}
              placeholder="confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSignUp}
            className="p-2 my-1 border rounded-md text-white bg-sky-500 text-xs md:text-md w-fit md:w-full"
          >
            Sign-Up
          </button>
          <p className="text-xs md:text-md my-3">
            Already have an account?
            <span className="px-2 underline text-sky-500 font-medium">
              <Link href="/signin">Sign-In</Link>
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
