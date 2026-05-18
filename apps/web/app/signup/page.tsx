"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { signupHandler } from "../api/Server_functions/signupHandler";

export default function SignUp() {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  async function submitHanlder() {
    const username = usernameRef?.current?.value || "";
    const password = passwordRef?.current?.value || "";

    const res = await signupHandler(username, password);

    alert(res.msg);

    console.log(res);

    if (res.success) {
      router.push("/signin");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8">
          Sign up to continue
        </p>

        <div className="space-y-6">
          {/* Username */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              required
              ref={usernameRef}
              placeholder="Enter your username"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="flex items-center gap-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                ref={passwordRef}
                placeholder="Enter your password"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="px-4 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={submitHanlder}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}