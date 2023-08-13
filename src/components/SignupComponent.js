"use client";
import React from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "./Toast";
function SignupComponent() {
  const gender_list = [
    "Agender - A person who does not identify themselves with or experience any gender.",
    "Abimegender - Associated with being profound, deep, and infinite.",
    "Adamas gender - A gender that is indefinable or indomitable.",
    "Aerogender - Also called evaisgender, this gender identity changes according to one’s surroundings.",
    "Aesthetigender - A type of gender identity derived from aesthetics.",
    "Affectugender - Based on the person’s mood swings or fluctuations.",
    "Allygender - The opposite of strangergender. ",
    // "Akbar Sha Friend - So you are friend of a uncivilized black nigga?",
    "Agenderflux - Mostly agender with brief shifts of belonging to other gender types.",
    "Alexigender - Fluid gender identity between more than one type of gender.",
    "Anthropogender - Gender based on an individual's body shape rather than their appearance",
    "Aliusgender - Stands apart from existing social gender constructs.",
    "Amaregender - Changes depending on the person one is emotionally attached to.",
    "Ambigender - Having two specific gender identities simultaneously.",
    "Ambonec - Identifies as both man and woman and yet does not belong to either.",
    "Amicagender - Changes their gender depending on the friends they have.",
    "Androgyne - Feels a combination of feminine and masculine genders.",
    "Anesigender - Feels close to a specific type of gender despite identifying with another.",
    "Angenital - Desires to be without any primary sexual characteristics.",
    "Anogender - Gender identity fades in and out in intensity.",
    "Anongender - Has a gender identity but prefers to not have a label.",
    "Antegender - A protean gender that can be anything but is formless and motionless.",
    "Anxiegender - This gender identity has anxiety as its prominent characteristic.",
    "Apagender - Has apathy or a lack of feelings toward one’s gender identity.",
    "Apconsugender - Knows what are not the characteristics of gender but not knowing what are its characteristics.",
    "Astergender - Has a bright and celestial gender identity.",
    "Astral gender - Having a gender identity that feels related to space.",
    "Autigender - Having a gender identity that feels closely related to being autistic.",
    "Autogender - Having a gender experience that is deeply connected and personal to oneself.",
    "Axigender - A gender identity that is between the two extremes of agender and any other type of gender.",
    "Bigender - Having two gender identities at the same or different times.",
    "Biogender - Having a gender that is closely related to nature.",
    "Bisexual - Belongs to multiple genders.",
    "Blurgender - More than one gender identity that blur into each other.",
    "Boyflux - Identifies as male, but they experience varying degrees of male identity.",
    "Burstgender - Frequent bursts of intense feelings quickly move to the initial calm stage.",
    "Caelgender - Shares the qualities or aesthetics of outer space.",
    "Cassgender - Associated with the feelings of considering gender irrelevant or unimportant.",
    "Cassflux - Fluctuating intensity of irrelevance toward gender.",
    "Cavusgender - Feels close to one gender when depressed and another when not depressed.",
    "Cendgender - Gender identity changes from one gender to its opposite.",
    "Ceterogender - Nonbinary gender with specific masculine, feminine, or neutral feelings.",
    "Ceterofluid - Fluctuating between different genders.",
    "Cisgender - Closely related to the gender assigned at birth.",
    "Cloudgender - Gender cannot be comprehended or understood due to depersonalization and derealization disorder.",
    "Collgender - Various genders are present at the same time.",
    "Colorgender - Colors are used to describe gender.",
    "Commogender - Knows that they are not cisgender yet continues to identify as one for a while.",
    "Condigender - Feels their gender only under specific circumstances.",
    "Deliciagender - Has multiple genders but prefers one over the other.",
    "Demigender - Similar to polygender, except it doesn't involve all three genders.",
    "Demifluid - Multiple genders, some fluid while others are static.",
    "Demiflux - Combination of multiple genders with some static and others fluctuating.",
    "Domgender - Multiple genders with one dominating over the rest.",
    "Duragender - More than one gender with one lasting longer than the others.",
    "Egogender - Personal type of gender identified by the individual alone.",
    "Epicene - Associated with not being able to relate to binary genders.",
    "Esspigender - Relates gender identity with spirits.",
    "Exgender - Denial to identify with any gender on the gender spectrum.",
    "Existigender - Gender identity exists only when consciously realized.",
    "Femfluid - Fluid or fluctuating regarding feminine genders.",
    "Femgender - Nonbinary gender identity that is feminine.",
    "Female - Happy Straight Female.",
    "Fluidflux - Fluid between two or more genders with fluctuation in intensity.",
    "Gemigender - Has two genders that flux and work together.",
    "Genderblank - Closely related to a blank space.",
    "Genderflow - Gender identity is fluid between infinite feelings.",
    "Genderfluid - Does not consistently adhere to one fixed gender.",
    "Genderfuzz - More than one gender is blurred together.",
    "Genderflux - Gender fluctuates in intensity.",
    "Gengender - Gives off colorful emotions about gender.",
    "Genderpuck - Resists fitting into societal norms concerning genders.",
    "Genderqueer - Blurs preconceived boundaries of gender.",
    "Male - Happy Straight Male.",
    "Witchgender - Inclined toward the notion of having one gender but does not know which.",
    "Girlflux - Identifies as female but with varying intensities of female identities.",
    "Healgender - Gender identity that gives peace, calm, and positivity.",
    "Mirrorgender - Changes gender based on the people surrounding.",
    "Omnigender - Experiencing all genders.",
  ];

  const router = useRouter();
  const [creds, setcreds] = useState({
    userName: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
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
  };
let islocal = false;
  //   https://todo-server-ayvx-dev-branch.vercel.app/

  // https://todo-server-beta-two.vercel.app/post/signup
  let handleLogin = () => {
    if (creds.password.length > 1 && creds.userName.length > 3) {
      fetch(`${islocal ?"https://todo-server-ayvx-dev-branch.vercel.app/post/signup":"https://todo-server-beta-two.vercel.app/post/signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: creds.fullName,
          email: creds.userName,
          password: creds.password,
          gender: creds.gender,
          phone: creds.phone,
        }),
        credentials: "include",
      })
        .then((res) => {
          console.log(res);
          if (res.status < 205) {
            setToast({
              type: "info",
              msg: "successfully logged in",
              showToast: true,
            });
            setTimeout(() => {
              setToast({
                ...toast,
                showToast: false,
              });
            }, 3000);
            router.push("/", { scroll: false });
          } else {
            setToast({
              type: "info",
              msg: "There's an error, please try again",
              showToast: true,
            });
            setTimeout(() => {
              setToast({
                ...toast,
                showToast: false,
              });
            }, 3000);
          }
        })
        .catch(function (error) {
          setToast({
            type: "info",
            msg: "There's an error, please try again",
            showToast: true,
          });
          setTimeout(() => {
            setToast({
              ...toast,
              showToast: false,
            });
          }, 3000);
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
            <em>
              Behind every successful Coder there an even more successful
              De-coder to understand that code..
            </em>
          </p>
        </div>
      </blockquote>

      <input
        type="text"
        name="fullName"
        onChange={handleChange}
        value={creds.fullName}
        placeholder="Full name here"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <input
        type="text"
        name="userName"
        onChange={handleChange}
        value={creds.userName}
        placeholder="email here"
        className="input input-bordered input-primary w-full max-w-xs"
      />
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        value={creds.phone}
        placeholder="Phone number (optional)"
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
      <select
        onChange={handleChange}
        name="gender"
        className="select select-bordered input-primary w-full max-w-xs"
      >
        <option value={""} disabled defaultValue selected>
          Select your Gender
        </option>
        {gender_list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* <Link href={"/Todo"}> */}
      <button
        type="button"
        onClick={handleLogin}
        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
      >
        Sign Up..
      </button>
      <Link href={"/"}>Back to log in?</Link>
      {/* </Link> */}
      {toast.showToast && <Toast msg={toast.msg} type={toast.type} />}
    </main>
  );
}

export default SignupComponent;
