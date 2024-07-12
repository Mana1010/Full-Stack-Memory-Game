"use client";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Suspense } from "react";
import { useAudioStore } from "@/utils/store/audio.store";
function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const { clickSoundSetting } = useAudioStore();
  useEffect(() => {
    clickSoundSetting();
  }, [clickSoundSetting]);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default Provider;
