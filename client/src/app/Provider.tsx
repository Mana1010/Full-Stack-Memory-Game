"use client";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Suspense } from "react";
import { useAudioStore } from "@/utils/store/audio.store";
import Loading from "./loading";
function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const { clickSoundSetting } = useAudioStore();
  useEffect(() => {
    clickSoundSetting();
  }, [clickSoundSetting]);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default Provider;
