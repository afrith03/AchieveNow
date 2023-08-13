"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "./Toast";
function LoginComponent() {
  const router = useRouter();
  const [creds, setcreds] = useState({
    userName: "",
    password: "",
  });

  const [toast, setToast] = useState({
    type: "",
    msg: "",
    showToast: false,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setcreds({
      ...creds,
      [evt.target.name]: value,
    });
  }
  let handleLogin = () => {
    if (creds.password.length > 1 && creds.userName.length > 3) {
      //   axios
      //     .post(
      //       "https://todo-server-beta-two.vercel.app/post/signin",
      //       {
      //         email: creds.userName,
      //         password: creds.password,
      //       },
      //       {
      //         credentials: "include",
      //       }
      //     )
      //     .then(function (response) {
      //       console.log(response);
      //       //next router
      //       //   sessionStorage.setItem('Token', );
      //       router.push("/Todo", { scroll: false });
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });

      fetch(`https://todo-server-beta-two.vercel.app/post/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: creds.userName,
          password: creds.password,
        }),
        credentials: "include",
      })
        .then((res) => {
          console.log(res);
          router.push("/Todo", { scroll: false });
        })
        .catch(function (error) {
          console.log("erroru" + error);
        });
    } else {
      setToast({
        type: "success",
        msg: "Kindly check your password and retry this attempt",
        showToast: true,
      });
      setTimeout(() => {
        setToast({
          ...toast,
          showToast: false,
        });
      }, 3000);
    }
  };
  return (
    <main className="flex flex-col items-center justify-center gap-4 mt-[20vh]">
      <blockquote className="relative">
        <svg
          className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100 dark:text-gray-700"
          width={16}
          height={16}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
            fill="currentColor"
          />
        </svg>
        <div className="relative z-10">
          <p className="text-gray-800 dark:text-white">
            <em>Amateurs hack systems, professionals hack people.</em>
          </p>
        </div>
      </blockquote>

      <input
        type="text"
        name="userName"
        onChange={handleChange}
        value={creds.userName}
        placeholder="User name here"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <input
        type="Password"
        name="password"
        onChange={handleChange}
        value={creds.password}
        placeholder="Password here"
        className="input input-bordered input-primary w-full max-w-xs"
      />
     <div className="flex gap-4">
     <button
        type="button"
        onClick={handleLogin}
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
        Log in..
      </button>
          <Link href={"/SignUp"}>
      <button
        type="button"
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
      >
      Sign up...
      </button>
      </Link>
     </div>
      {toast.showToast && <Toast msg={toast.msg} type={toast.type} />}
    </main>
  );
}

export default LoginComponent;
