"use client";
import { useEffect,useLayoutEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothExperience(){
 useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;gsap.registerPlugin(ScrollTrigger);const lenis=new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:.85});const update=(time:number)=>lenis.raf(time*1000);const sync=()=>ScrollTrigger.update();lenis.on("scroll",sync);gsap.ticker.add(update);gsap.ticker.lagSmoothing(0);return()=>{lenis.off("scroll",sync);gsap.ticker.remove(update);lenis.destroy()}},[]);
 useLayoutEffect(()=>{gsap.registerPlugin(ScrollTrigger);if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const ctx=gsap.context(()=>{
   const heroCopy=document.querySelectorAll(".hero-copy > *");if(heroCopy.length)gsap.from(heroCopy,{y:35,opacity:0,duration:1,stagger:.1,ease:"power3.out",delay:.15});
   const heroScene=document.querySelector(".hero-scene");if(heroScene)gsap.from(heroScene,{y:40,opacity:0,scale:.96,duration:1.25,ease:"power3.out",delay:.35});
   gsap.utils.toArray<HTMLElement>("section:not(.hero-section) .eyebrow, section:not(.hero-section) .section-title").forEach(el=>gsap.from(el,{y:28,opacity:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));
   gsap.utils.toArray<HTMLElement>(".product-visual").forEach((el,index)=>gsap.from(el,{y:index%2?45:70,opacity:0,scale:.98,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));
   ScrollTrigger.matchMedia({"(min-width: 1024px) and (prefers-reduced-motion: no-preference)":()=>{
    const universe=document.querySelector<HTMLElement>(".universe-section");if(universe){const nodes=universe.querySelectorAll(".universe-node");const tl=gsap.timeline({scrollTrigger:{trigger:universe,start:"top top",end:"+=1100",pin:true,scrub:1,anticipatePin:1}});tl.from(".universe-ring",{scale:.65,opacity:0,stagger:.15}).from(nodes,{scale:.6,opacity:0,stagger:.07,ease:"back.out(1.4)"},.1).to(nodes,{borderColor:"rgba(216,255,95,.42)",stagger:.08},.6)}
    const rail=document.querySelector<HTMLElement>(".product-rail");if(rail){const distance=()=>Math.max(0,rail.scrollWidth-rail.clientWidth);gsap.to(rail,{x:()=>-distance(),ease:"none",scrollTrigger:{trigger:rail.parentElement,start:"top 18%",end:()=>`+=${distance()}`,pin:true,scrub:1,invalidateOnRefresh:true}})}
   }});
   gsap.utils.toArray<HTMLElement>(".e2e-stage").forEach((stage,index)=>gsap.to(stage,{backgroundColor:index===5?"#0a0c08":"#c9ed59",color:index===5?"#f3f4ec":"#0a0c08",scrollTrigger:{trigger:stage,start:"top 75%",end:"bottom 45%",toggleActions:"play reverse play reverse"}}));
  });return()=>ctx.revert()},[]);
 return null;
}
