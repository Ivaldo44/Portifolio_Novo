/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import About from "./components/About";

// Lazy load non-critical components
const Repositories = lazy(() => import("./components/Repositories"));
const Timeline = lazy(() => import("./components/Timeline"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chat = lazy(() => import("./components/Chat"));

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Debug flag - will show up at top left */}
      <div className="fixed top-0 left-0 z-[100] bg-red-600 text-white p-2 text-xs">
        V1.0.1 - READY
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Suspense fallback={<div className="h-[20vh] bg-red-900/10">Loading section...</div>}>
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
