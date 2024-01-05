"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

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
        sessionStorage.setItem("user", true);
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
            className="p-2 my-1 border rounded-sm"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            <input
              className="p-2 my-1 border rounded-sm"
              type={showPass ? `password` : `text`}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="px-2" onClick={handleShow}>
              {showPass ? "Show" : "Hide"}
            </button>
          </div>
          <div>
            <input
              className="p-2 my-1 border rounded-sm"
              type={showPass ? `password` : `text`}
              placeholder="confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSignUp}
            className="px-1 py-1 my-2 text-white bg-emerald-500 rounded-md"
          >
            Sign-Up
          </button>
          <p className="text-sm my-3">
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
