"use client";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { GoStar, GoStarFill } from "react-icons/go";
import Image from "next/image";
import feedback from "../../components/images/feedback.png";
import { MdFeedback } from "react-icons/md";
import feedbackTitle from "../../components/images/titles/feedback.png";
function Feedback() {
  const reference = Array.from({ length: 5 }, () => ({
    star: <GoStar />,
    isClicked: false,
  }));
  const router = useRouter();
  const [uxRating, setUxRating] = useState(reference);
  const [uiRating, setUiRating] = useState(reference);
  const [performanceRating, setPerformanceRating] = useState(reference);

  return (
    <div className="flex px-5 justify-center items-center h-full w-full">
      <form className="w-[80%] bg-primary rounded-sm py-4 px-2 relative flex flex-col">
        <header>
          <Image src={feedbackTitle} alt="feedback-title" priority />
        </header>
        <div className="flex-grow flex flex-col px-3 pt-5 space-y-5 relative z-10">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-[0.7rem] text-secondary">
              Your Name <em className="text-[0.58rem]">(optional)</em>
            </label>
            <input
              id="name"
              type="text"
              placeholder="@e g John Doe"
              className="p-2 rounded-sm placeholder:text-[0.8rem] bg-transparent border-secondary border-[1px] outline-secondary text-zinc-200 text-[0.9rem]"
            />
          </div>
          <div className="flex-col flex space-y-3">
            <div className="flex items-center space-x-2">
              <h2
                style={{ textShadow: " 0 0 15px #FFE30A" }}
                className="text-secondary font-bold text-md"
              >
                UI:
              </h2>
              {uiRating.map((ui, index) => (
                <button
                  type="button"
                  key={index}
                  className="text-secondary text-lg"
                >
                  {ui.star}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <h2
                style={{ textShadow: " 0 0 15px #FFE30A" }}
                className="text-secondary font-bold text-md"
              >
                UX:
              </h2>
              {uxRating.map((ux, index) => (
                <button
                  type="button"
                  key={index}
                  className="text-secondary text-lg"
                >
                  {ux.star}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <h2
                style={{ textShadow: " 0 0 15px #FFE30A" }}
                className="text-secondary font-bold text-md"
              >
                PERFORMANCE:
              </h2>
              {performanceRating.map((performance, index) => (
                <button
                  type="button"
                  key={index}
                  className="text-secondary text-lg"
                >
                  {performance.star}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="name"
                className="text-[0.7rem] text-secondary italic"
              >
                What features or improvements would you most like to see added
                to our system in the next update?{" "}
                <em className="text-[0.58rem]">(optional)</em>
              </label>
              <textarea
                id="name"
                placeholder="Your comment here"
                className="p-2 rounded-sm placeholder:text-[0.8rem] bg-transparent border-secondary border-[1px] outline-secondary text-zinc-200 text-[0.9rem] h-[70px] resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="name"
                className="text-[0.7rem] text-secondary italic"
              >
                Have you noticed any bugs or errors in app? If so, what were
                they? <em className="text-[0.58rem]">(optional)</em>
              </label>
              <textarea
                id="name"
                placeholder="Your comment here"
                className="p-2 rounded-sm placeholder:text-[0.8rem] bg-transparent border-secondary border-[1px] outline-secondary text-zinc-200 text-[0.9rem] h-[70px] resize-none"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="opacity-30 absolute bottom-5 right-5 ">
          <Image width={200} src={feedback} alt="feedback-pic" priority />
        </div>
      </form>
    </div>
  );
}

export default Feedback;
