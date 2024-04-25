"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center ",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-transparent relative h-3 w-full grow overflow-hidden rounded-full border-[1px] border-[#FFE30A]">
      <SliderPrimitive.Range
        style={{ boxShadow: "0 0 25px #FFE30A" }}
        className="absolute h-full bg-[#FFE30A] "
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      style={{ boxShadow: "0 0 25px #FFE30A" }}
      className="cursor-pointer flex h-7 w-7 bg-[#FFE30A] items-center justify-center rounded-full border-2 text-white text-xl ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
    >
      <FaStar />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
