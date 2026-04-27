/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import BackgroundParallax from "./components/BackgroundParallax";

// Lazy load non-critical components
const About = lazy(() => import("./components/About"));
const Repositories = lazy(() => import("./components/Repositories"));
const Timeline = lazy(() => import("./components/Timeline"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chat = lazy(() => import("./components/Chat"));

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      <Preloader />
      <BackgroundParallax />
      {/* Global Grain Overlay */}
      <div className="grain-overlay fixed inset-0 z-50 overflow-hidden pointer-events-none" />
      
      <CustomCursor />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Suspense fallback={<div className="h-[20vh]" />}>
          <About />
          <Repositories />
          <Timeline />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      
      <Suspense fallback={null}>
        <Footer />
        <Chat />
      </Suspense>
    </div>
  );
}
