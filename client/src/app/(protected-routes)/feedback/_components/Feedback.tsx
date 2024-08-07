"use client";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import { GoStar, GoStarFill } from "react-icons/go";
import Image from "next/image";
import feedback from "../../../../components/images/feedback.png";
import feedbackTitle from "../../../../components/images/titles/feedback.png";
import { useForm } from "react-hook-form";
import { baseUrl } from "@/utils/baseUrl";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { toast } from "sonner";
import { AxiosError } from "axios";
import axios from "axios";
interface Rating {
  ui: number;
  ux: number;
  performance: number;
}
interface Feedback {
  name: string;
  rating?: Rating;
  improvement: string;
  bugs: string;
  scale: string;
}

const reference = Array.from({ length: 5 }, () => false);
function Feedback() {
  // const axiosInterceptor = useAxiosInterceptor();
  const router = useRouter();
  const [uiRating, setUiRating] = useState(reference);
  const [uxRating, setUxRating] = useState(reference);
  const [performanceRating, setPerformanceRating] = useState(reference);
  const [rating, setRating] = useState<Rating>({
    ui: 0,
    ux: 0,
    performance: 0,
  });
  const { register, reset, watch, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      improvement: "",
      bugs: "",
      scale: "",
    },
  });
  const submitFeedback = useMutation({
    mutationFn: async (data: Feedback) => {
      console.log(data);
      const response = await axios.post(`${baseUrl}/feature/feedback`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      return response.data.message;
    },
    onSuccess: () => {
      setUiRating(reference);
      setUxRating(reference);
      setPerformanceRating(reference);
      reset();
      toast.message("Thank you for your feedback");
    },
    onError: (err: AxiosError<{ message: string }>) => {
      if (err.response?.status === 403 || err.response?.status === 401) {
        router.push("/auth/login?message=You have not log in yet!");
      } else {
        toast.error(err.response?.data.message);
      }
    },
  });
  const checkRating = Object.values(rating).some((rate) => rate === 0);
  function handleUiRating(count: number) {
    const updatedUiRating = reference.map((rating, index) => {
      if (count >= index) {
        return !rating;
      } else {
        return rating;
      }
    });
    setRating({ ...rating, ui: count + 1 });
    setUiRating(updatedUiRating);
  }
  function handleUxRating(count: number) {
    const updatedUxRating = reference.map((rating, index) => {
      if (count >= index) {
        return !rating;
      } else {
        return rating;
      }
    });
    setRating({ ...rating, ux: count + 1 });
    setUxRating(updatedUxRating);
  }
  function handlePerformanceRating(count: number) {
    const updatedPerformanceRating = reference.map((rating, index) => {
      if (count >= index) {
        return !rating;
      } else {
        return rating;
      }
    });
    setRating({ ...rating, performance: count + 1 });
    setPerformanceRating(updatedPerformanceRating);
  }
  return (
    <div className="flex px-5 justify-center items-center h-full w-full">
      <form
        onSubmit={handleSubmit((data: Feedback) => {
          const updatedFeedbackData = { ...data, rating };
          submitFeedback.mutate(updatedFeedbackData);
        })}
        className="w-[95%] sm:w-[90%] bg-primary rounded-sm py-4 px-2 relative flex flex-col h-[570px]"
      >
        <header>
          <Image src={feedbackTitle} alt="feedback-title" priority />
        </header>
        <div className="flex-grow flex flex-col px-3 pt-5 space-y-5 relative z-10 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-[0.7rem] text-secondary">
              Your Name
            </label>
            <input
              required
              id="name"
              {...register("name")}
              name="name"
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
                  onClick={() => handleUiRating(index)}
                  type="button"
                  key={index}
                  className="text-secondary text-lg"
                  aria-label={`You rate UI ${index + 1} out of 5 stars`}
                >
                  {ui ? <GoStarFill /> : <GoStar />}
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
                  onClick={() => handleUxRating(index)}
                  type="button"
                  key={index}
                  className="text-secondary text-lg"
                  aria-label={`You rate UX ${index + 1} out of 5 stars`}
                >
                  {" "}
                  {ux ? <GoStarFill /> : <GoStar />}
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
                  onClick={() => handlePerformanceRating(index)}
                  type="button"
                  key={index}
                  className="text-secondary text-lg"
                  aria-label={`You rate Performance ${
                    index + 1
                  } out of 5 stars`}
                >
                  {" "}
                  {performance ? <GoStarFill /> : <GoStar />}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="improvement"
                className="text-[0.7rem] text-secondary italic"
              >
                What features or improvements would you most like to see added
                to our system in the next update?{" "}
                <em className="text-[0.58rem]">(optional)</em>
              </label>
              <textarea
                id="improvement"
                {...register("improvement")}
                name="improvement"
                placeholder="Your comment here"
                className="p-2 rounded-sm placeholder:text-[0.8rem] bg-transparent border-secondary border-[1px] outline-secondary text-zinc-200 text-[0.9rem] h-[70px] resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="bugs"
                className="text-[0.7rem] text-secondary italic"
              >
                Have you noticed any bugs or errors in app? If so, what were
                they? <em className="text-[0.58rem]">(optional)</em>
              </label>
              <textarea
                id="bugs"
                {...register("bugs")}
                name="bugs"
                placeholder="Your comment here"
                className="p-2 rounded-sm placeholder:text-[0.8rem] bg-transparent border-secondary border-[1px] outline-secondary text-zinc-200 text-[0.9rem] h-[70px] resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="scale"
                className="text-[0.7rem] text-secondary italic"
              >
                On a scale of 1 to 10, how would you rate your experience with
                our app and why?
              </label>
              <textarea
                required
                id="scale"
                {...register("scale")}
                name="scale"
                placeholder="Your comment here"
                className="p-2 rounded-sm placeholder:text-[0.8rem] bg-transparent border-secondary border-[1px] outline-secondary text-zinc-200 text-[0.9rem] h-[70px] resize-none"
              ></textarea>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => router.back()}
              type="button"
              className=" text-secondary border-[1px] bg-transparent border-zinc-400 px-5 py-2 rounded-sm"
            >
              BACK
            </button>
            <button
              disabled={
                checkRating || !watch("name").trim() || !watch("scale").trim()
              }
              className="text-primary bg-secondary px-5 py-2 rounded-sm disabled:bg-zinc-700 disabled:text-zinc-400"
            >
              SUBMIT
            </button>
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
