/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Repositories from "./components/Repositories";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Global Grain Overlay */}
      <div className="grain-overlay fixed inset-0 z-50 overflow-hidden pointer-events-none" />
      
      <CustomCursor />
      <Navbar />
      
      <main className="relative">
        <Hero />
        <About />
        <Repositories />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
      <Chat />
    </div>
  );
}
