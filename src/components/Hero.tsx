"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [useVideoFallback, setUseVideoFallback] = useState(false);

  // Check for slow connection and reduced motion preference
  useEffect(() => {
    // Check network speed
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = navigator.connection as { effectiveType?: string };
      if (
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g"
      ) {
        setUseVideoFallback(true);
      }
    }

    // Reduced motion preference
    if (prefersReducedMotion) {
      setUseVideoFallback(true);
    }
  }, [prefersReducedMotion]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Determine if we should show video or static poster
  const showVideo = !useVideoFallback && !prefersReducedMotion;

  return (
    <section className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Image Background */}
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          onLoadedData={handleVideoLoad}
          className="hero-video"
          aria-hidden="true"
        >
          {/* Video source - will use poster as fallback until video file is added */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Static poster fallback for reduced motion / slow connections */
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/hero-poster.jpg')" }}
          aria-hidden="true"
        />
      )}

      {/* Gradient Overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-block text-sm tracking-[0.2em] uppercase text-gold font-semibold mb-6 drop-shadow-lg bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/20"
          >
            Since 1985 • Limassol, Cyprus
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-6 leading-tight drop-shadow-lg"
          >
            Timeless Watches.
            <br />
            <span className="text-gold">Exceptional Jewellery.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            A curated selection of the world&apos;s finest timepieces and
            exquisite jewellery, brought to you with expert craftsmanship and
            personalized service.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-burgundy hover:bg-burgundy/90 text-white px-8 py-6 text-base magnetic-hover shadow-xl shadow-burgundy/20"
            >
              <Link href="#collections">Explore Collections</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-transparent border-white/50 hover:border-gold text-white hover:text-gold hover:bg-white/10 px-8 py-6 text-base backdrop-blur-md shadow-lg"
            >
              <Link href="#contact">Visit Our Boutique</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Pause/Play Control - only shows when video is loaded */}
      {showVideo && isVideoLoaded && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          onClick={toggleVideo}
          className="absolute bottom-24 right-6 md:right-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
          aria-label={
            isVideoPlaying ? "Pause background video" : "Play background video"
          }
        >
          {isVideoPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-white" />
          )}
        </motion.button>
      )}

      {/* Scroll Indicator - positioned relative to section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-xs tracking-widest uppercase mb-2">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
