"use client";
import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothExperience() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    const update = (time: number) => lenis.raf(time * 1000);
    const sync = () => ScrollTrigger.update();
    lenis.on("scroll", sync);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", sync);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const heroCopy = document.querySelectorAll(".hero-copy > *");
      if (heroCopy.length)
        gsap.from(heroCopy, {
          y: 35,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        });

      const heroScene = document.querySelector(".hero-scene");
      if (heroScene)
        gsap.from(heroScene, {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 1.25,
          ease: "power3.out",
          delay: 0.35,
        });

      gsap.utils
        .toArray<HTMLElement>(
          "section:not(.hero-section) .eyebrow, section:not(.hero-section) .section-title"
        )
        .forEach((el) =>
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          })
        );

      gsap.utils
        .toArray<HTMLElement>(".product-visual")
        .forEach((el, index) =>
          gsap.from(el, {
            y: index % 2 ? 45 : 70,
            opacity: 0,
            scale: 0.98,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          })
        );

      ScrollTrigger.matchMedia({
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)": () => {
          // 04 / Capabilities Rail: Edge-to-edge pinned horizontal scroll with exact bounding and live progress
          const railSection = document.querySelector<HTMLElement>(".capabilities-rail-section");
          const railTrack = document.querySelector<HTMLElement>(".capabilities-track");
          const progressBar = document.querySelector<HTMLElement>(".rail-progress-bar");
          const countLabel = document.querySelector<HTMLElement>(".rail-count");

          if (railSection && railTrack) {
            const getDistance = () =>
              Math.max(0, railTrack.scrollWidth - window.innerWidth + 80);

            gsap.to(railTrack, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: railSection,
                start: "top top",
                end: () => `+=${getDistance()}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (progressBar) {
                    progressBar.style.width = `${Math.max(8, self.progress * 100)}%`;
                  }
                  if (countLabel) {
                    const currentCard = Math.min(13, Math.floor(self.progress * 13) + 1);
                    countLabel.textContent = `${String(currentCard).padStart(2, "0")} / 13`;
                  }
                },
              },
            });
          }
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".e2e-stage")
        .forEach((stage, index) =>
          gsap.to(stage, {
            backgroundColor: index === 5 ? "#0a0c08" : "#c9ed59",
            color: index === 5 ? "#f3f4ec" : "#0a0c08",
            scrollTrigger: {
              trigger: stage,
              start: "top 75%",
              end: "bottom 45%",
              toggleActions: "play reverse play reverse",
            },
          })
        );
    });
    return () => ctx.revert();
  }, []);

  return null;
}
