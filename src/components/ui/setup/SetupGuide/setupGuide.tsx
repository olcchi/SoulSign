"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useFullScreenStore } from "@/stores/fullScreenStore";
import { useOrientationStore } from "@/stores/orientationStore";
import { SetupGuideContent } from "./setupGuideContent";
import songsData from "@/components/lyricData.json";
export default function SetupGuide() {

  const [randomSong, setRandomSong] = useState(songsData[0]);
  const router = useRouter();
  const pathname = usePathname();
  const { isFull } = useFullScreenStore();
  const { isLandscape } = useOrientationStore();

  // const showMask = pathname === "/soulsign" && (!isFull || !isLandscape);
  const showMask = pathname === "/soulsign" && !isFull;
  const getRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * songsData.length);
    setRandomSong(songsData[randomIndex]);
  }, []);

  useEffect(() => {
    if (showMask) {
      getRandomSong();
    }
  }, [showMask, getRandomSong]);

  useEffect(() => {
    if (showMask) {
      getRandomSong();
    }
  }, [showMask, getRandomSong]);
  return (
    <AnimatePresence mode="wait">
      {showMask ? (
        <motion.div
          key="mask-content"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-999"
        >
          <div className="absolute inset-0 bg-black/80" />
          <motion.div
            className="relative h-full flex items-center justify-center"
            initial={{ opacity: 0, filter: "blur(16px)", scale: 1.1 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(16px)", scale: 1.1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
          >
            <SetupGuideContent
              songsLyrics={[randomSong]}
              isFull={isFull}
              isLandscape={isLandscape}
              router={router}
              pathname={pathname}
            />
          </motion.div>
        </motion.div>
      ) : pathname === "/" ? (
        <motion.div
          key="home-content"
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0, filter: "blur(12px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.1 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <SetupGuideContent
            songsLyrics={[randomSong]}
            isFull={isFull}
            isLandscape={isLandscape}
            router={router}
            pathname={pathname}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
