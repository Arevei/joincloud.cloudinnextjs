"use client"
import { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmailLink } from "@/components/email-link";
import { useToast } from "@/hooks/use-toast";
import { QueryClientProviderWrapper } from "@/app/queryclientprovider";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Download, Folder, Share2, Shield, Zap, HardDrive, Globe, Monitor, Send, Link2, Mail, MessageCircle, Headphones, Check, FlaskConical, Heart, Scale, Landmark, Building2, User, Server, Lock, Network } from "lucide-react";
import { createContext, useContext } from "react";

/**
 * Section visibility — flip a flag to `true` to restore archived sections.
 * Legacy implementations live in content/legacy/page-creator-beta.tsx
 */
const SECTION_VISIBILITY = {
  trustBanner: true,
  problem: true,
  oldVsJoinCloud: false,   // Creator workflow — misaligned with DeepTech positioning
  ourStory: false,         // Founder story — replaced by Vision
  solution: true,
  features: true,
  whoItsFor: true,
  howItWorks: true,
  comparison: true,
  security: true,
  vision: true,
  pricing: false,          // Not part of new positioning
  calculator: false,       // Creator upload-waste tool
  waitlist: true,
  feedback: false,         // Lower priority during repositioning
  support: true,
  navSpotsCounter: false,  // Beta urgency — not aligned with infrastructure positioning
} as const;

interface SpeedParticle {
  id: number;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  length: number;
}


import fluidCursor from '@/lib/use-FluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 z-2 pointer-events-none'>
      <canvas id='fluid' className='w-screen h-screen' />
    </div>
  );
};


function MouseSpeedEffect() {
  const [particles, setParticles] = useState<SpeedParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    const deltaX = newX - lastMousePos.current.x;
    const deltaY = newY - lastMousePos.current.y;
    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    setMousePos({ x: newX, y: newY });
    lastMousePos.current = { x: newX, y: newY };
    
    setIsMoving(true);
    
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }
    moveTimeoutRef.current = setTimeout(() => setIsMoving(false), 100);
    
    if (velocity > 3) {
      const newParticles: SpeedParticle[] = [];
      const particleCount = Math.min(Math.floor(velocity / 8), 4);
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: particleIdRef.current++,
          x: newX + (Math.random() - 0.5) * 30,
          y: newY - 20 - Math.random() * 15,
          speed: Math.round(50 + Math.random() * 450),
          opacity: 0.6 + Math.random() * 0.4,
          length: 20 + Math.random() * 30,
        });
      }
      
      setParticles(prev => [...prev.slice(-20), ...newParticles]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (particles.length === 0) return;
    
    const cleanup = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 400);
    
    return () => clearTimeout(cleanup);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      {isMoving && (
        <div
          className="absolute flex items-center gap-1 animate-pulse"
          style={{
            left: mousePos.x - 25,
            top: mousePos.y - 35,
            transition: "left 0.05s ease-out, top 0.05s ease-out",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M12 4L12 20M12 20L6 14M12 20L18 14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[10px] font-bold text-primary tabular-nums">
                {Math.round(100 + Math.random() * 400)} MB/s
              </span>
            </div>
          </div>
        </div>
      )}
      
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            animation: "speedFadeUp 0.4s ease-out forwards",
          }}
        >
          <div
            className="bg-gradient-to-b from-primary to-transparent rounded-full"
            style={{
              width: "2px",
              height: `${particle.length}px`,
              boxShadow: "0 0 6px rgba(47, 183, 255, 0.6)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
/* ── Navbar spots badge ─────────────────────────────────────── */
function NavSpotsCounter() {
  const spots = 47;
  return (
    <div
      className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.25)',
      }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{
          background: '#EF4444',
          boxShadow: '0 0 6px rgba(239,68,68,0.6)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      <span style={{ color: '#F87171', fontSize: '11px', fontWeight: 700, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
        {spots} spots left
      </span>
    </div>
  );
}

/* ── Spots banner (above waitlist form) ─────────────────────── */
function SpotsCounterBanner() {
  const spots = 47;
  return (
    <div
      className="flex items-center justify-center gap-3 mb-6 py-3 px-5 rounded-xl mx-auto"
      style={{
        background: 'rgba(239,68,68,0.06)',
        border: '1px solid rgba(239,68,68,0.2)',
        maxWidth: '420px',
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full shrink-0"
        style={{
          background: '#EF4444',
          boxShadow: '0 0 8px rgba(239,68,68,0.6)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      <span style={{ color: '#F87171', fontSize: '14px', fontWeight: 700, letterSpacing: '0.01em' }}>
        Only <span style={{ color: '#FBBF24', fontSize: '18px' }}>{spots}</span> spots remaining in private beta
      </span>
    </div>
  );
}

function Header({ onJoinWaitlistClick }: { onJoinWaitlistClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    /* Outer positioning wrapper — fixed, centred, floats above page */
    <div
      className="fixed z-50 left-1/2 -translate-x-1/2"
      style={{ top: '14px', width: 'calc(100% - 40px)', maxWidth: '1060px' }}
      data-testid="header"
    >
      <header
        style={{
          background: scrolled ? 'rgba(0,10,13,0.92)' : 'rgba(0,10,13,0.80)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '0.5px solid rgba(47,183,255,0.12)',
          borderRadius: '14px',
          height: '54px',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(47,183,255,0.08)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          transition: 'background 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <div className="relative flex items-center h-full px-5">

          {/* Logo - icon + wordmark */}
          <div className="shrink-0 z-10 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 613.36 613.36" xmlns="http://www.w3.org/2000/svg">
              <path fill="#2eb8ff" d="M588.32,271.49c-6.78-55.42-29.58-105.94-63.68-146.75,2.86-4.84,4.54-10.46,4.54-16.49,0-17.93-14.54-32.47-32.47-32.47-6.54,0-12.61,1.95-17.71,5.28-41.21-31.52-91.28-51.98-145.78-56.96-3.7-13.86-16.31-24.09-31.34-24.09s-28.42,10.85-31.66,25.36c-52.48,6.9-100.47,28.19-139.87,59.81-5.25-3.64-11.61-5.79-18.48-5.79-17.93,0-32.47,14.54-32.47,32.47,0,6.95,2.2,13.37,5.92,18.65-31.46,39.7-52.51,87.97-59.01,140.71-14.97,2.89-26.28,16.05-26.28,31.87s10.92,28.51,25.5,31.7c5.42,53.68,25.95,102.93,57.17,143.56-3.59,5.22-5.7,11.55-5.7,18.37,0,17.93,14.54,32.47,32.47,32.47,6.37,0,12.3-1.86,17.31-5.03,39.99,33.16,89.23,55.49,143.2,62.63,2.77,15.12,15.99,26.59,31.91,26.59s28.39-10.83,31.65-25.31c55-5.08,105.46-25.95,146.85-58.02,5.06,3.25,11.07,5.16,17.53,5.16,17.93,0,32.47-14.54,32.47-32.47,0-6.08-1.7-11.74-4.6-16.6,34.76-42.11,57.59-94.4,63.31-151.65,13.96-3.64,24.27-16.29,24.27-31.39s-10.69-28.22-25.04-31.58ZM496.7,140.71c6.65,0,12.83-2.01,17.98-5.44,31.39,38.04,52.45,84.86,59.08,136.13-8.8,1.97-16.22,7.51-20.72,15.02l-82.94-31.1c.08-.91.14-1.83.14-2.76,0-10.96-5.44-20.63-13.76-26.51l36.29-85.6c1.29.16,2.59.26,3.92.26ZM479.18,135.55l-36.05,85.02c-1.75-.29-3.53-.48-5.36-.48-13.93,0-25.78,8.79-30.39,21.12l-150.02-34.55c-.01-2.21-.24-4.38-.68-6.47l212.89-74.13c2.5,3.8,5.78,7.03,9.61,9.49ZM301.87,64.94c15.84,0,29.01-11.34,31.88-26.34,50.42,4.95,96.79,23.89,135.18,52.88-2.96,4.9-4.7,10.62-4.7,16.76,0,1.46.13,2.88.31,4.29l-213.97,74.51c-1.7-2.2-3.68-4.17-5.88-5.88l56.13-116.27c.35.01.69.05,1.04.05ZM270.28,39.89c2.16,9.2,8.2,16.9,16.33,21.24l-55.01,113.95c-2.16-.45-4.4-.7-6.7-.7-6.88,0-13.25,2.15-18.5,5.81l-65.22-54.46c2-4.21,3.15-8.91,3.15-13.88,0-5.82-1.55-11.28-4.24-16,36.8-29.33,81.42-49.2,130.2-55.95ZM64.15,296.02l134.89-69.57c5.88,7.75,15.14,12.78,25.59,12.87l46.23,147.78c-2.8,2.22-5.21,4.9-7.15,7.91l-199.97-83.32c.76-2.75,1.19-5.63,1.19-8.62,0-2.43-.29-4.78-.79-7.06ZM96.02,140.19c4.69,2.62,10.08,4.13,15.83,4.13,7.74,0,14.83-2.71,20.41-7.23l64.4,53.78c-2.68,4.72-4.23,10.17-4.23,15.99,0,2.2.22,4.36.64,6.44l-135.12,69.68c-4.3-5.44-10.29-9.45-17.19-11.27,6.32-49.23,25.98-94.31,55.26-131.52ZM109.44,464.23c-5.87,0-11.37,1.58-16.12,4.31-28.94-38.02-48-83.93-53.3-133.91,6.64-1.58,12.49-5.2,16.85-10.17l201.97,84.15c-.15,1.28-.26,2.58-.26,3.9,0,3.85.71,7.53,1.94,10.96l-122.14,58.52c-5.37-10.54-16.29-17.77-28.93-17.77ZM270.58,572.3c-50.26-6.9-96.16-27.69-133.61-58.44,3.11-4.98,4.94-10.85,4.94-17.16,0-.13-.02-.25-.02-.38l126.46-60.6c3.24,3.17,7.14,5.63,11.47,7.23l7.56,108.9c-8.17,4.08-14.36,11.48-16.81,20.45ZM284.03,380.82l-45.25-144.64c6.76-3.21,12.23-8.67,15.44-15.44l151.23,34.83c.5,5.42,2.33,10.44,5.16,14.76l-103.73,113.85c-4.69-2.63-10.08-4.14-15.84-4.14-2.41,0-4.75.28-7.01.78ZM333.48,573.58c-3.32-14.41-16.2-25.16-31.62-25.16-.08,0-.16.01-.25.01l-7.2-103.62c7.76-.8,14.69-4.34,19.85-9.63l151.2,66.71c0,.28-.04.55-.04.83,0,6.21,1.78,12,4.8,16.94-38.71,29.61-85.65,48.96-136.75,53.93ZM469.12,487.71l-147.27-64.97c1.07-3.22,1.67-6.65,1.67-10.23,0-6.95-2.2-13.38-5.92-18.66l103.42-113.51c4.89,2.96,10.61,4.69,16.75,4.69,1.35,0,2.67-.11,3.98-.27l38.65,190.63c-4.75,3.05-8.66,7.3-11.28,12.33ZM515.71,475.57c-5.11-3.36-11.23-5.33-17.81-5.33-1.28,0-2.53.09-3.77.24l-38.67-190.71c4.18-2.72,7.68-6.39,10.23-10.69l82.87,31.08c-.09.96-.15,1.93-.15,2.91,0,15.75,11.22,28.87,26.09,31.84-5.68,52.99-26.82,101.41-58.8,140.66Z"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', fontStyle: 'italic' }}>
              <span style={{ color: '#FFFFFF' }}>JOIN</span>
              <span style={{ color: '#2FB7FF' }}>CLOUD</span>
            </span>
          </div>

          {/* Nav — absolutely centred inside the pill */}
          <nav
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center"
            style={{ gap: '28px' }}
            aria-label="Primary"
          >
            {[
              { label: 'Features',     href: '#features',     testId: 'link-features' },
              { label: 'How It Works', href: '#how-it-works', testId: 'link-how-it-works' },
              { label: 'Why JoinCloud', href: '#product',      testId: '' },
              { label: 'Security',     href: '#security',     testId: 'link-security' },
              // { label: 'Calculator',  href: '#calculator',  testId: 'link-calculator' }, // legacy — creator beta
              // { label: 'Blog',        href: '/blog',        testId: 'link-blog' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-testid={link.testId || undefined}
                className="whitespace-nowrap transition-colors duration-150 hover:text-white"
                style={{ color: '#8B9CA3', fontSize: '13px', textDecoration: 'none', fontWeight: 450 }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="ml-auto shrink-0 z-10 flex items-center" style={{ gap: '12px' }}>
            {SECTION_VISIBILITY.navSpotsCounter && <NavSpotsCounter />}
            <button
              onClick={onJoinWaitlistClick}
              data-testid="button-join-waitlist-header"
              className="cta-btn"
              style={{
                background: '#2FB7FF',
                color: '#000405',
                fontWeight: 700,
                fontSize: '12px',
                borderRadius: '99px',
                padding: '7px 18px',
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
            >
              Start Free
            </button>
          </div>

        </div>
      </header>
    </div>
  );
}

/* ── Node Network ────────────────────────────────────────────── */

interface NetworkNode {
  x: number; y: number;
  ring: number; r: number;
  delay: number; duration: number;
}

interface NetworkEdge {
  x1: number; y1: number;
  x2: number; y2: number;
}

function buildNodeNetwork(w: number, h: number): { nodes: NetworkNode[]; edges: NetworkEdge[] } {
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.max(w, h) * 0.62;
  const isMob = w < 768;

  const ringDef = isMob
    ? [
        { count: 6,  frac: 0.06 },
        { count: 9,  frac: 0.14 },
        { count: 12, frac: 0.26 },
        { count: 15, frac: 0.38 },
        { count: 18, frac: 0.52 },
        { count: 22, frac: 0.66 },
        { count: 26, frac: 0.82 },
      ]
    : [
        { count: 6,  frac: 0.05 },
        { count: 8,  frac: 0.10 },
        { count: 12, frac: 0.17 },
        { count: 16, frac: 0.25 },
        { count: 19, frac: 0.34 },
        { count: 22, frac: 0.45 },
        { count: 24, frac: 0.57 },
        { count: 28, frac: 0.70 },
      ];

  const nodes: NetworkNode[] = [];
  const ringStart: number[] = [];

  ringDef.forEach((ring, ri) => {
    ringStart.push(nodes.length);
    const rotOffset = ri * 0.35;
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 - Math.PI / 2 + rotOffset;
      const r = ring.frac * maxR;
      nodes.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        ring: ri,
        r: ri <= 1 ? 2.5 : 3.5,
        delay: Math.random() * 3,
        duration: 2.5 + Math.random() * 1.5,
      });
    }
  });

  const edges: NetworkEdge[] = [];

  // Within-ring connections
  ringDef.forEach((ring, ri) => {
    const base = ringStart[ri];
    for (let i = 0; i < ring.count; i++) {
      const a = nodes[base + i];
      const b = nodes[base + (i + 1) % ring.count];
      edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
  });

  // Between-ring connections (each node → 2 closest in next ring)
  for (let ri = 0; ri < ringDef.length - 1; ri++) {
    const countB = ringDef[ri + 1].count;
    const baseA = ringStart[ri];
    const baseB = ringStart[ri + 1];
    for (let i = 0; i < ringDef[ri].count; i++) {
      const nA = nodes[baseA + i];
      const sorted = Array.from({ length: countB }, (_, j) => ({
        j,
        d: Math.hypot(nA.x - nodes[baseB + j].x, nA.y - nodes[baseB + j].y),
      })).sort((a, b) => a.d - b.d);
      [sorted[0].j, sorted[1].j].forEach(j => {
        edges.push({ x1: nA.x, y1: nA.y, x2: nodes[baseB + j].x, y2: nodes[baseB + j].y });
      });
    }
  }

  return { nodes, edges };
}

function NodeNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ w: 800, h: 600 });

  useLayoutEffect(() => {
    setMounted(true);
    const svg = svgRef.current;
    const section = svg?.parentElement;
    if (!section || !(section instanceof HTMLElement)) return;

    const update = () => {
      const r = section.getBoundingClientRect();
      setDims({
        w: Math.max(1, Math.round(r.width)),
        h: Math.max(1, Math.round(r.height)),
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(section);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const net = useMemo(() => buildNodeNetwork(dims.w, dims.h), [dims.w, dims.h]);

  useEffect(() => {
    const onScroll = () => {
      if (svgRef.current) svgRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isMobile = dims.w < 768;
  const cx = dims.w / 2;
  const cy = dims.h / 2;
  /* Larger gradient radius + earlier fade to white on mobile so mesh reaches top/bottom of hero */
  const rGrad = Math.max(dims.w, dims.h) * (isMobile ? 0.85 : 0.72);

  if (!mounted) {
    return <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} aria-hidden="true" />;
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={`0 0 ${dims.w} ${dims.h}`}
      preserveAspectRatio="none"
      suppressHydrationWarning
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', willChange: 'transform', overflow: 'hidden' }}
    >
      <defs>
        <radialGradient
          id="heroNetFade"
          gradientUnits="userSpaceOnUse"
          cx={cx}
          cy={cy}
          r={rGrad}
        >
          <stop offset="0%"   stopColor="black" stopOpacity="1" />
          <stop offset={isMobile ? '32%' : '38%'} stopColor="black" stopOpacity="0.92" />
          <stop offset={isMobile ? '52%' : '58%'} stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </radialGradient>
        <mask id="heroNetMask" maskUnits="userSpaceOnUse" x={0} y={0} width={dims.w} height={dims.h}>
          <rect x={0} y={0} width={dims.w} height={dims.h} fill="url(#heroNetFade)" />
        </mask>
      </defs>
      <g mask="url(#heroNetMask)">
        {net.edges.map((e, i) => (
          <line key={`e${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#2FB7FF" strokeWidth="0.7" strokeOpacity="0.12" />
        ))}
        {net.nodes.map((n, i) => (
          <circle
            key={`n${i}`}
            cx={n.x} cy={n.y} r={n.r}
            fill="#2FB7FF"
            fillOpacity="0.35"
            style={{ animation: `nodePulse ${n.duration}s ease-in-out ${n.delay}s infinite` }}
          />
        ))}
      </g>
    </svg>
  );
}

function Hero({ onJoinWaitlistClick }: { onJoinWaitlistClick: () => void }) {
  return (
    <section
      className="flex flex-col justify-center overflow-hidden"
      style={{ position: 'relative', minHeight: '100vh', background: '#000405' }}
    >
      <NodeNetwork />

      <div className="relative z-10 max-w-3xl mx-auto px-6 w-full py-24 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <p style={{ color: '#2FB7FF', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
          Research based DeepTech Project · joincloud.cloud
        </p>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
          <span style={{ color: '#FFFFFF', display: 'block' }}>Your Cloud. Your Data.</span>
          <span style={{ color: '#2FB7FF', display: 'block' }} className="text-glow">Your Rules.</span>
        </h1>

        {/* Subheadline */}
        <p style={{ color: '#8B9CA3', fontSize: '16px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '32px' }}>
          JoinCloud transforms your computer into your own secure cloud. Store, access, and share files anywhere        </p>

        {/* CTA row */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          <button
            onClick={onJoinWaitlistClick}
            data-testid="button-get-early-access"
            className="cta-btn shrink-0"
            style={{ background: '#2FB7FF', color: '#000405', fontWeight: 700, fontSize: '14px', padding: '12px 28px', borderRadius: '99px' }}
          >
            Start Free
          </button>
          <EmailLink
            to="info@joincloud.in"
            subject="Book a JoinCloud Demo"
            className="shrink-0 text-white transition-colors duration-150 border"
            style={{
              color: 'white',
              fontSize: '14px',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '99px',
              border: '1px solid #fffff',
            }}
          >
            Book a Demo
          </EmailLink>
        </div>

        {/* Secondary link */}
        <div className="flex items-center justify-center gap-2 flex-wrap" style={{ marginTop: '16px' }}>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors duration-150"
            style={{ color: '#8B9CA3', fontSize: '13px', textDecoration: 'none' }}
          >
            See how it works ↓
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustBanner() {
  const items = [
    'Your files never need to leave your infrastructure.',
    'No vendor lock-in.',
    'No forced cloud storage.',
    'No hidden data collection.',
  ];

  return (
    <section className="border-t border-[#001C25] bg-[#00080A] px-5 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[13px] text-[#8B9CA3] font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const points = [
    'Whether it\'s cloud drives, messaging apps, or collaboration tools, your information is copied onto servers you don\'t own.',
    'For individuals this means less privacy.',
    'For businesses it means compliance risks, security concerns, and increasing storage costs.',
  ];

  return (
    <section className="border-t border-[#001C25] bg-[#000405] px-5 py-16 md:py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-[#2FB7FF] bg-[#2FB7FF]/10 px-3 py-1 rounded-full mb-4">
          The problem
        </span>
        <h2 className="text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.03em] text-foreground leading-[1.15] mb-6">
          The Internet Was Built Around Someone Else&apos;s Cloud.
        </h2>
        <p className="text-[#8B9CA3] text-[15px] md:text-[16px] leading-relaxed mb-8">
          Every time you upload a file, you&apos;re trusting another company with your data.
        </p>
        <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-3 p-4 rounded-xl border border-[#001C25] bg-[#00080A]">
              <div className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0 mt-2" />
              <p className="text-[#8B9CA3] text-[14px] leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
        <p className="text-foreground text-[16px] md:text-[18px] font-medium leading-relaxed">
          You shouldn&apos;t have to choose between convenience and control.
        </p>
      </div>
    </section>
  );
}

function OldVsJoinCloudSection() {
  const oldSteps = [
    'Upload & wait 1-10 hrs',
    'Client downloads again',
    'Multiple copies pile up',
    'Upload again, wait again',
    '"FINAL_FINAL" chaos',
  ];
  const jcSteps = [
    'Add file, instant',
    'Share link, one click',
    'Browser preview, no download',
    'Feedback & rework live',
    'Client gets the final. Once.',
  ];

  return (
    <section className="border-t border-[#001C25] bg-[#00080A] px-5 py-16 md:py-28 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2FB7FF] mb-2">The shift</p>
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] text-foreground mb-3">
            Same pattern. Now optimized.
          </h2>
          <p className="text-[#8B9CA3] text-[15px] leading-relaxed max-w-[480px] mx-auto">
            We didn&apos;t reinvent how creative work happens. We removed everything that slows it down.
          </p>
        </div>

        {/* Mobile: VS battle timeline */}
        <div className="md:hidden max-w-[400px] mx-auto">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_32px_1fr] items-center mb-4">
            <p className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider text-center">Old Way</p>
            <div />
            <p className="text-[10px] font-bold text-[#2FB7FF] uppercase tracking-wider text-center">JoinCloud</p>
          </div>

          {/* Timeline rows */}
          <div className="relative">
            {/* Center glowing line */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]" style={{ background: 'linear-gradient(180deg, #EF444466, #2FB7FF, #2FB7FF66)' }} />

            <div className="flex flex-col gap-3">
              {oldSteps.map((oldStep, i) => (
                <div key={`vs-${i}`} className="grid grid-cols-[1fr_32px_1fr] items-center gap-0">
                  {/* Old way (left) */}
                  <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg px-3 py-2 text-right">
                    <p className="text-[11px] text-[#FCA5A5] font-medium leading-snug">{oldStep}</p>
                  </div>
                  {/* Center dot */}
                  <div className="flex items-center justify-center relative z-10">
                    <div className="w-3 h-3 rounded-full bg-[#0A1214] border-2 border-[#2FB7FF]" style={{ boxShadow: '0 0 8px #2FB7FF66' }} />
                  </div>
                  {/* JoinCloud way (right) */}
                  <div className="bg-[#2FB7FF]/10 border border-[#2FB7FF]/20 rounded-lg px-3 py-2">
                    <p className="text-[11px] text-[#7DD3FC] font-medium leading-snug">{jcSteps[i]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom circle badge */}
          <div className="flex justify-center mt-6">
            <div
              className="w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center text-center"
              style={{
                background: 'radial-gradient(circle, #2FB7FF22 0%, transparent 70%)',
                border: '1.5px solid rgba(47,183,255,0.3)',
                boxShadow: '0 0 30px rgba(47,183,255,0.1)',
              }}
            >
              <p className="text-[#2FB7FF] font-bold text-[8px] uppercase tracking-[0.12em] leading-tight">Creative</p>
              <p className="text-[#2FB7FF] font-bold text-[8px] uppercase tracking-[0.12em] leading-tight">Workflow</p>
            </div>
          </div>
        </div>

        {/* Desktop: radial mind-map */}
        <div className="hidden md:block relative" style={{ height: '480px' }}>
          {/* SVG connector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Left branches */}
            {oldSteps.map((_, i) => {
              const cy = 80 + i * 80;
              return <line key={`lo-${i}`} x1="50%" y1="50%" x2="22%" y2={cy} stroke="#EF4444" strokeWidth="1" strokeOpacity="0.25" />;
            })}
            {/* Right branches */}
            {jcSteps.map((_, i) => {
              const cy = 80 + i * 80;
              return <line key={`lr-${i}`} x1="50%" y1="50%" x2="78%" y2={cy} stroke="#2FB7FF" strokeWidth="1" strokeOpacity="0.25" />;
            })}
          </svg>

          {/* Center circle */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-center"
            style={{
              background: 'radial-gradient(circle, #2FB7FF22 0%, #2FB7FF08 70%, transparent 100%)',
              border: '1.5px solid rgba(47,183,255,0.3)',
              boxShadow: '0 0 60px rgba(47,183,255,0.1)',
            }}
          >
            <p className="text-[#2FB7FF] font-bold text-[11px] uppercase tracking-[0.15em] mb-1">The Creative</p>
            <p className="text-[#2FB7FF] font-bold text-[11px] uppercase tracking-[0.15em]">Workflow</p>
          </div>

          {/* Left label */}
          <div className="absolute left-[8%] top-0 z-10">
            <p className="text-[11px] font-bold text-[#EF4444] uppercase tracking-wider">Old Way</p>
          </div>

          {/* Right label */}
          <div className="absolute right-[8%] top-0 z-10">
            <p className="text-[11px] font-bold text-[#2FB7FF] uppercase tracking-wider text-right">JoinCloud Way</p>
          </div>

          {/* Left nodes (Old Way) */}
          {oldSteps.map((step, i) => {
            const top = 60 + i * 80;
            return (
              <div
                key={`old-${i}`}
                className="absolute z-10 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-4 py-2 max-w-[200px] text-center"
                style={{ top: `${top}px`, left: '4%', right: 'auto' }}
              >
                <p className="text-[12px] text-[#FCA5A5] font-medium leading-snug">{step}</p>
              </div>
            );
          })}

          {/* Right nodes (JoinCloud Way) */}
          {jcSteps.map((step, i) => {
            const top = 60 + i * 80;
            return (
              <div
                key={`jc-${i}`}
                className="absolute z-10 bg-[#2FB7FF]/10 border border-[#2FB7FF]/20 rounded-xl px-4 py-2 max-w-[200px] text-center"
                style={{ top: `${top}px`, right: '4%', left: 'auto' }}
              >
                <p className="text-[12px] text-[#7DD3FC] font-medium leading-snug">{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OurStorySection() {
  const highlights = [
    {
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2FB7FF" strokeWidth={1.5}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      title: 'Share files directly',
      desc: 'From your system to anyone. No upload to third-party servers.',
      color: '#2FB7FF',
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
        </svg>
      ),
      title: 'View before download',
      desc: 'Recipients preview in-browser. Download only when it\'s truly final.',
      color: '#7C3AED',
    },
    {
      icon: (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#0E7490" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'Save time, ship faster',
      desc: 'Zero upload wait. Your productivity goes where your creativity goes.',
      color: '#0E7490',
    },
  ];

  return (
    <section className="border-t border-[#001C25] bg-[#000405] px-5 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2FB7FF] mb-2">Our story</p>
          <p className="text-sm text-[#8B9CA3] mb-2">Why we built JoinCloud</p>
        </div>

        {/* Three highlight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="relative rounded-2xl p-6 text-center group hover:scale-[1.02] transition-transform duration-200"
              style={{
                background: `${h.color}08`,
                border: `1px solid ${h.color}22`,
              }}
            >
              {/* Glow dot */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{ background: h.color, boxShadow: `0 0 16px ${h.color}88` }}
              />
              <div className="flex justify-center mb-4 mt-2">{h.icon}</div>
              <h3 className="text-foreground font-bold text-[16px] mb-2">{h.title}</h3>
              <p className="text-[#8B9CA3] text-[13px] leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Story text — compact */}
        <div className="max-w-[680px] mx-auto text-[14px] text-[#8B9CA3] leading-[1.85] space-y-4 mb-10">
          <p>
            At Arevei, while managing content for brands, we kept running into the same wall: uploading files, waiting, sharing, re-uploading. The biggest time-waster in creative work is content review.
          </p>
          <p>
            So we asked: <span className="text-foreground font-medium">what if your own system was the cloud?</span> No third-party server. No waiting. Just your machine, sharing directly to anyone, anywhere, instantly.
          </p>
        </div>

        {/* Founder quote — standout card */}
        <div
          className="max-w-[540px] mx-auto rounded-2xl p-6 md:p-8 text-center relative"
          style={{
            background: 'linear-gradient(135deg, rgba(47,183,255,0.06) 0%, rgba(124,58,237,0.06) 100%)',
            border: '1px solid rgba(47,183,255,0.15)',
          }}
        >
          <div
            className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center text-lg"
            style={{ background: 'rgba(47,183,255,0.12)', border: '1px solid rgba(47,183,255,0.25)' }}
          >
            VS
          </div>
          <p className="text-[16px] md:text-[18px] text-foreground/90 italic leading-relaxed font-light">
            &quot;I believe your data should be in your control. Because that is your right.&quot;
          </p>
          <p className="mt-4 text-[13px] text-[#2FB7FF] font-medium">Vinay Shakyawar</p>
          <p className="text-[11px] text-[#8B9CA3]">Founder, JoinCloud</p>
        </div>
      </div>
    </section>
  );
}

function WhatJoinCloudIs() {
  const pillars = [
    {
      icon: Server,
      title: "No complicated networking",
      description: "No manual port forwarding. Install and your device becomes reachable securely from anywhere.",
    },
    {
      icon: Shield,
      title: "No cloud migration",
      description: "Your storage stays where it belongs—with you. Files remain on infrastructure you own.",
    },
    {
      icon: Zap,
      title: "Minutes, not months",
      description: "Build your own cloud infrastructure without networking expertise. Install and start in minutes.",
    },
  ];

  return (
    <section className="border-t border-[#001C25] bg-[#00080A] overflow-hidden">
      {/* Hero image with overlaid text */}
      <div className="relative w-full" style={{ minHeight: '420px' }}>
        <Image
          src="/constellation.jpg"
          alt="Personal cloud network"
          fill
          className="object-cover object-center"
          loading="lazy"
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00080A] via-[#00080A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#00080A]/60 via-transparent to-[#00080A]" />

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2FB7FF] mb-3">The solution</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight drop-shadow-lg">
            Meet JoinCloud
          </h2>
          <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-2xl drop-shadow mb-3">
            JoinCloud lets you create your own personal cloud using hardware you already own.
          </p>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl drop-shadow">
            Install JoinCloud on your computer or private server and instantly access your files securely from anywhere.
          </p>
        </div>
      </div>

      

      {/* Pillar cards */}
      <div className="max-w-6xl mx-auto px-6 -mt-16 md:-mt-20 relative z-10 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const accentColors = ['#2FB7FF', '#7C3AED', '#0E7490'];
            const accent = accentColors[index] || '#2FB7FF';
            return (
              <div
                key={index}
                className="bg-[#0A1214]/90 backdrop-blur-md border border-[#1A2E35] rounded-2xl p-7 text-center hover:border-opacity-60 transition-all duration-300"
                style={{ boxShadow: `0 0 40px ${accent}08`, borderColor: `${accent}25` }}
                data-testid={`pillar-${index + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 mx-auto"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-[#8B9CA3] text-sm leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-foreground text-lg font-medium mt-10">
          Your storage stays where it belongs. <span className="text-primary">With you.</span>
        </p>
        <div className="max-w-5xl mx-auto px-6 pt-10 md:pt-14 relative z-10">
        <div className="overflow-hidden rounded-2xl border border-[#1A2E35] bg-[#000405] shadow-[0_0_50px_rgba(47,183,255,0.10)]">
          <video
            key="joincloud-active-video"
            className="aspect-video h-full w-full object-cover"
            controls
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
          >
            <source
              src="https://stream.mux.com/ZR6KBQtJG028VCectitLL3Ud00neFjF7p1Tc3gbvg83bY.m3u8?redundant_streams=true"
              type="application/x-mpegURL"
            />
          </video>
        </div>
      </div>
      </div>
    </section>
  );
}

function Features() {
  const items: { icon: typeof Shield; title: string; description: string }[] = [
    { icon: Shield, title: "Your Data Never Leaves Your Infrastructure", description: "Files remain on your device. Only authorized users can access them." },
    { icon: Share2, title: "Private Data Infrastructure", description: "Share large files securely without copying them to external cloud storage." },
    { icon: Globe, title: "Access Anywhere", description: "Reach your files from home, office, or while traveling." },
    { icon: HardDrive, title: "Zero Vendor Lock-In", description: "Your storage belongs to you. Move whenever you want." },
    { icon: Building2, title: "Enterprise Ready", description: "Ideal for organizations that need complete ownership over their data." },
    { icon: Zap, title: "Simple Deployment", description: "No networking expertise required. Install and start in minutes." },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-[#000405] border-t border-[#001C25]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Personal Cloud Network</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Build your own cloud infrastructure.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-[#00080A] border-[#001C25] hover:border-primary/30 transition-all duration-200" data-testid={`feature-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Download, title: "Install", description: "Install JoinCloud on your device." },
    { icon: Network, title: "Connect", description: "Your device becomes your private cloud." },
    { icon: Globe, title: "Access", description: "Reach your files securely from anywhere in the world." },
    { icon: Link2, title: "Share", description: "Generate secure links without uploading your files to third-party storage." },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#00080A] border-t border-[#001C25]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">How it works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your personal cloud in four steps.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="bg-[#000405] border-[#001C25] hover:border-primary/30 transition-all duration-200" data-testid={`card-step-${index + 1}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-3xl font-bold text-primary mb-2 block">{index + 1}</span>
                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const audience: { icon: typeof FlaskConical; title: string; description: string }[] = [
    { icon: FlaskConical, title: "Researchers", description: "Protect confidential research and datasets." },
    { icon: Heart, title: "Healthcare", description: "Maintain sensitive patient information within your own infrastructure." },
    { icon: Scale, title: "Legal Firms", description: "Share confidential documents securely." },
    { icon: Landmark, title: "Government & Defense", description: "Maintain full control over sensitive files." },
    { icon: Building2, title: "Businesses", description: "Reduce cloud costs while maintaining complete ownership." },
    { icon: User, title: "Privacy-Conscious Individuals", description: "Build your own cloud without sacrificing usability." },
  ];

  return (
    <section className="py-24 px-6 bg-[#000405] border-t border-[#001C25]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Who it&apos;s for</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for those who own their data.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audience.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-[#00080A] border-[#001C25] hover:border-primary/30 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  const rows = [
    { label: "Data storage", old: "Files stored on provider servers", jc: "Files stay on your infrastructure" },
    { label: "Cost model", old: "Monthly storage fees", jc: "Use your own storage" },
    { label: "Ownership", old: "Vendor lock-in", jc: "Full ownership" },
    { label: "Privacy", old: "Limited privacy", jc: "Complete control" },
    { label: "Accessibility", old: "Internet-dependent storage", jc: "Your storage, accessible anywhere" },
    { label: "Control", old: "Provider controls data", jc: "You control everything" },
  ];

  return (
    <section id="product" className="py-24 px-6 bg-[#00080A] border-t border-[#001C25]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Why JoinCloud</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Traditional Cloud vs. JoinCloud.
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#001C25] bg-[#000405]">
          <table className="w-full text-sm text-left min-w-[520px]">
            <thead>
              <tr className="border-b border-[#001C25]">
                <th className="p-4 font-semibold text-muted-foreground w-[30%]" />
                <th className="p-4 font-semibold text-foreground">Traditional Cloud</th>
                <th className="p-4 font-semibold text-primary">JoinCloud</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-[#001C25] last:border-0">
                  <td className="p-4 text-muted-foreground">{row.label}</td>
                  <td className="p-4 text-muted-foreground">{row.old}</td>
                  <td className="p-4 text-foreground">{row.jc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="py-24 px-6 bg-[#000405] border-t border-[#001C25]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <Lock className="w-7 h-7 text-primary" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Security</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Privacy by Architecture
        </h2>
        <div className="space-y-5 text-[#8B9CA3] text-[15px] md:text-[16px] leading-relaxed text-left max-w-2xl mx-auto">
          <p>
            JoinCloud doesn&apos;t protect your privacy through promises. It protects your privacy through architecture.
          </p>
          <p>
            Your files remain on devices you own. There is no centralized storage to mine, analyze, or monetize your data.
          </p>
          <p className="text-foreground font-medium text-center pt-2">
            Because the safest copy of your data is the one that never leaves your infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section id="vision" className="py-24 px-6 bg-[#00080A] border-t border-[#001C25]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Vision</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Building the Personal Cloud Network
        </h2>
        <div className="space-y-5 text-[#8B9CA3] text-[15px] md:text-[16px] leading-relaxed">
          <p>
            We believe cloud computing shouldn&apos;t mean someone else&apos;s computer.
          </p>
          <p>
            Our vision is to create a global personal cloud network where individuals and organizations retain complete ownership of their data while enjoying the same convenience as modern cloud services.
          </p>
          <p className="text-foreground font-medium">
            The future of cloud is decentralized, private, and owned by the people who create the data.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeedbackSection() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const feedbackMutation = useMutation({
    mutationFn: async (data: { message: string; name?: string; email?: string }) => {
      return apiRequest("POST", "/api/feedback", {
        message: data.message,
        name: data.name,
        email: data.email,
      });
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted. We appreciate your input!",
      });
      setMessage("");
      setName("");
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !name.trim() || !email.trim()) return;
    feedbackMutation.mutate({
      message: message.trim(),
      name: name.trim(),
      email: email.trim(),
    });
  };

  return (
    <section id="feedback" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Help us build the future.
        </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Your feedback shapes JoinCloud. Share your thoughts, ideas, or suggestions. No account needed.
          </p>
        </div>

        <Card className="bg-[#00080A] border-[#001C25]">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="feedback-message" className="block text-sm font-medium text-foreground mb-2">
                  Your Feedback <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="feedback-message"
                  placeholder="Share your ideas, suggestions, or thoughts with us..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="resize-none bg-[#000405] border-[#001C25] focus:border-primary"
                  data-testid="input-feedback-message"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="feedback-name" className="block text-sm font-medium text-foreground mb-2">
                    Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="feedback-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#000405] border-[#001C25] focus:border-primary"
                    data-testid="input-feedback-name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="feedback-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#000405] border-[#001C25] focus:border-primary"
                    data-testid="input-feedback-email"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                disabled={!message.trim() || !name.trim() || !email.trim() || feedbackMutation.isPending}
                data-testid="button-submit-feedback"
              >
                {feedbackMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function WaitlistSection({ waitlistRef }: { waitlistRef: React.RefObject<HTMLDivElement | null> }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const { toast } = useToast();
  const [showWaitlistDownload, setShowWaitlistDownload] = useState(false);

  const waitlistMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; profession: string }) => {
      return apiRequest("POST", "/api/waitlist", {
        name: data.name,
        email: data.email,
        profession: data.profession,
      });
    },
    onSuccess: () => {
      setShowWaitlistDownload(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you by email before JoinCloud officially launches.",
      });
      setName("");
      setEmail("");
      setProfession("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !profession) return;
    waitlistMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      profession,
    });
  };

  return (
    <section id="waitlist" className="py-24 px-6 border-t border-[#001C25]" ref={waitlistRef as React.Ref<HTMLElement>}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Get started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Take Back Control of Your Data
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-2">
            Create your own secure cloud in minutes.
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Own your infrastructure. Own your privacy.
          </p>
        </div>

        {/* Urgent spots counter — legacy creator beta */}
        {SECTION_VISIBILITY.navSpotsCounter && <SpotsCounterBanner />}

        <Card className="bg-[#00080A] border-[#001C25]">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="waitlist-name" className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-primary">*</span>
                </label>
                <Input
                  id="waitlist-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#000405] border-[#001C25] focus:border-primary"
                  data-testid="input-waitlist-name"
                  required
                />
              </div>

              <div>
                <label htmlFor="waitlist-email" className="block text-sm font-medium text-foreground mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#000405] border-[#001C25] focus:border-primary"
                  data-testid="input-waitlist-email"
                  required
                />
              </div>

              <div>
                <label htmlFor="waitlist-profession" className="block text-sm font-medium text-foreground mb-2">
                  Profession <span className="text-primary">*</span>
                </label>
                <Select value={profession} onValueChange={setProfession}>
                  <SelectTrigger className="bg-[#000405] border-[#001C25]" data-testid="select-waitlist-profession">
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#00080A] border-[#001C25]">
                    <SelectItem value="Researcher">Researcher</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Government & Defense">Government & Defense</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Individual">Privacy-Conscious Individual</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="cta-btn w-full font-semibold"
                disabled={!name.trim() || !email.trim() || !profession || waitlistMutation.isPending}
                data-testid="button-submit-waitlist"
                style={{ background: '#2FB7FF', color: '#000405', borderRadius: '99px' }}
              >
                {waitlistMutation.isPending ? "Joining..." : "Start Free"}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground pt-2">
                No credit card required. Your data stays on your infrastructure.
              </p>

              {showWaitlistDownload && (
                <div className="mt-6 p-4 bg-[#0A1214] rounded-lg border border-[#001C25]">
                  <p className="text-sm text-muted-foreground text-center mb-4">Congratulations! Download JoinCloud Beta:</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#2FB7FF] hover:bg-[#2FB7FF]/90 text-black font-semibold"
                    >
                      <a href="https://github.com/vinay-kumar-shakyawar/joincloud/releases/download/v0.3.6/JoinCloud.Setup.0.3.6.exe" target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download for Windows
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#2FB7FF] hover:bg-[#2FB7FF]/90 text-black font-semibold"
                    >
                      <a href="https://github.com/vinay-kumar-shakyawar/joincloud/releases/download/v0.3.6/JoinCloud-0.3.6-universal.dmg" target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download for macOS
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ── Pricing Section ──── */
function PricingSection() {
  const plans = [
    {
      name: "Free Plan",
      description: "Personal use, 1 device",
      price: "₹0",
      period: "",
      features: ["1 device", "5 shares/month", "No Expiry"],
      cta: "Get Started",
      popular: false,
      gradient: "",
    },
    {
      name: "Free Trial",
      description: "7 days - Pro-like limits, no card needed",
      price: "₹0",
      period: "",
      features: ["3 devices", "50 shares/month", "Active on Installation", "Pro-like limits"],
      cta: "Start Trial",
      popular: false,
      gradient: "",
    },
    {
      name: "Pro",
      description: "Single user, up to 3 devices",
      price: "₹399",
      period: "/mo",
      features: ["✓ 3 devices", "✓ 50 shares/month", "✓ Resumable downloads", "✓ CDN cache (fast downloads)"],
      cta: "Request Pro",
      popular: true,
      gradient: "linear-gradient(135deg, rgba(47, 183, 255, 0.15) 0%, rgba(47, 183, 255, 0.05) 100%)",
    },
    {
      name: "Custom",
      description: "Enterprise — custom users/devices",
      price: "Pricing agreed directly with you",
      period: "",
      features: ["✓ Custom share limit", "✓ Priority onboarding", "✓ Dedicated support"],
      cta: "Contact Us",
      popular: false,
      gradient: "",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-[#000405] border-t border-[#001C25]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-[#00080A] border-[#001C25] hover:border-primary/30 transition-all duration-300 ${plan.popular ? 'border-primary/50' : ''}`}
              style={{
                background: plan.gradient || undefined,
                transform: plan.popular ? 'scale(1.02)' : 'none',
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most popular
                  </span>
                </div>
              )}
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* <Button
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  {plan.cta}
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-[#00080A]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Headphones className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Need help?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Reach us by email, WhatsApp, or in-app chat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <EmailLink
            to="info@joincloud.in"
            subject="JoinCloud Inquiry"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">info@joincloud.in</p>
            </div>
          </EmailLink>
          <a
            href="https://wa.me/919625440855"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border hover:border-green-500/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">WhatsApp</p>
              <p className="text-foreground font-medium">+91 9625440855</p>
            </div>
          </a>
          <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">In-App Support</p>
              <p className="text-foreground font-medium">Chat with us from inside JoinCloud.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Upload Waste Calculator ──── */
function UploadWasteCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [gbPerWeek, setGbPerWeek] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  // Avg upload speed ~10 Mbps = ~1.25 MB/s => 1 GB ~ 13.3 min
  const uploadMinutesPerGB = 13.3;
  const weeksPerYear = 52;

  const gbNum = parseFloat(gbPerWeek) || 0;
  const rateNum = parseFloat(hourlyRate) || 0;

  const totalMinutesPerYear = gbNum * uploadMinutesPerGB * weeksPerYear;
  const totalHoursPerYear = totalMinutesPerYear / 60;
  const totalDays = totalHoursPerYear / 8; // 8hr work days
  const moneyCost = totalHoursPerYear * rateNum;

  const canCalculate = gbNum > 0 && rateNum > 0;

  const handleCalculate = () => {
    if (canCalculate) setShowResult(true);
  };

  const shareText = `I've wasted ${totalDays.toFixed(1)} days and ${moneyCost >= 1000 ? (moneyCost / 1000).toFixed(1) + 'K' : moneyCost.toFixed(0)} this year watching upload bars. Check your score -> joincloud.cloud`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: 'https://joincloud.cloud' });
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="calculator" className="border-t border-[#001C25] bg-[#000A0D] px-5 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-[#2FB7FF] bg-[#2FB7FF]/10 px-3 py-1 rounded-full mb-4">
            Upload Waste Calculator
          </span>
          <h2 className="text-[28px] md:text-[40px] font-extrabold tracking-[-0.03em] text-foreground leading-[1.15]">
            How much of your life have you<br className="hidden md:block" /> lost to upload bars?
          </h2>
          <p className="text-[#8B9CA3] text-sm md:text-base mt-3 max-w-xl mx-auto">
            Find out how much time and money you waste every year waiting for files to upload to cloud services.
          </p>
        </div>

        {/* Calculator Card */}
        <div
          className="bg-[#0A1214] border border-[#1A2E35] rounded-2xl p-6 md:p-10"
          style={{ boxShadow: '0 0 60px rgba(47,183,255,0.04)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Input 1 */}
            <div>
              <label className="block text-[12px] font-medium text-[#8B9CA3] uppercase tracking-wide mb-2">
                Hours you work / week
              </label>
              <input
                type="number"
                min="0"
                placeholder="40"
                value={hoursPerWeek}
                onChange={(e) => { setHoursPerWeek(e.target.value); setShowResult(false); }}
                className="w-full bg-[#06090B] border border-[#1A2E35] rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#2FB7FF] transition-colors placeholder:text-[#3A4F58]"
              />
            </div>
            {/* Input 2 */}
            <div>
              <label className="block text-[12px] font-medium text-[#8B9CA3] uppercase tracking-wide mb-2">
                GBs you upload / week
              </label>
              <input
                type="number"
                min="0"
                placeholder="5"
                value={gbPerWeek}
                onChange={(e) => { setGbPerWeek(e.target.value); setShowResult(false); }}
                className="w-full bg-[#06090B] border border-[#1A2E35] rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#2FB7FF] transition-colors placeholder:text-[#3A4F58]"
              />
            </div>
            {/* Input 3 */}
            <div>
              <label className="block text-[12px] font-medium text-[#8B9CA3] uppercase tracking-wide mb-2">
                Your hourly rate (INR)
              </label>
              <input
                type="number"
                min="0"
                placeholder="500"
                value={hourlyRate}
                onChange={(e) => { setHourlyRate(e.target.value); setShowResult(false); }}
                className="w-full bg-[#06090B] border border-[#1A2E35] rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#2FB7FF] transition-colors placeholder:text-[#3A4F58]"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="bg-[#2FB7FF] hover:bg-[#1DA1E8] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm px-8 py-3 rounded-full transition-all duration-200"
            >
              Calculate My Waste
            </button>
          </div>

          {/* Result */}
          {showResult && (
            <div className="text-center">
              <div
                className="bg-gradient-to-br from-[#0F1E25] to-[#0A1214] border border-[#2FB7FF]/20 rounded-xl p-6 md:p-8 mb-6"
                style={{ boxShadow: '0 0 40px rgba(47,183,255,0.08)' }}
              >
                <p className="text-[#8B9CA3] text-sm mb-4">You've wasted approximately</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-4">
                  <div>
                    <span className="text-[42px] md:text-[56px] font-extrabold text-[#2FB7FF] leading-none">
                      {totalDays.toFixed(1)}
                    </span>
                    <p className="text-[#8B9CA3] text-sm mt-1">days</p>
                  </div>
                  <span className="text-[#3A4F58] text-2xl hidden md:block">&</span>
                  <div>
                    <span className="text-[42px] md:text-[56px] font-extrabold text-[#F59E0B] leading-none">
                      {moneyCost >= 100000
                        ? `${(moneyCost / 100000).toFixed(2)}L`
                        : moneyCost >= 1000
                        ? `${(moneyCost / 1000).toFixed(1)}K`
                        : moneyCost.toFixed(0)
                      }
                    </span>
                    <p className="text-[#8B9CA3] text-sm mt-1">INR this year</p>
                  </div>
                </div>
                <p className="text-[#8B9CA3] text-xs">
                  waiting for upload bars. That's {totalHoursPerYear.toFixed(0)} hours of staring at progress bars.
                </p>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 bg-[#1A2E35] hover:bg-[#243D47] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
              >
                <Share2 size={14} />
                {copied ? 'Copied!' : 'Share your score'}
              </button>
              <p className="text-[#5B7A85] text-[11px] mt-3">
                One click generates a shareable message with your upload waste score
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 bg-[#000A0D] border-t border-[#001C25]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Footer logo - icon + wordmark */}
        <div className="flex items-center gap-2 mb-2">
          <svg width="20" height="20" viewBox="0 0 613.36 613.36" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2eb8ff" d="M588.32,271.49c-6.78-55.42-29.58-105.94-63.68-146.75,2.86-4.84,4.54-10.46,4.54-16.49,0-17.93-14.54-32.47-32.47-32.47-6.54,0-12.61,1.95-17.71,5.28-41.21-31.52-91.28-51.98-145.78-56.96-3.7-13.86-16.31-24.09-31.34-24.09s-28.42,10.85-31.66,25.36c-52.48,6.9-100.47,28.19-139.87,59.81-5.25-3.64-11.61-5.79-18.48-5.79-17.93,0-32.47,14.54-32.47,32.47,0,6.95,2.2,13.37,5.92,18.65-31.46,39.7-52.51,87.97-59.01,140.71-14.97,2.89-26.28,16.05-26.28,31.87s10.92,28.51,25.5,31.7c5.42,53.68,25.95,102.93,57.17,143.56-3.59,5.22-5.7,11.55-5.7,18.37,0,17.93,14.54,32.47,32.47,32.47,6.37,0,12.3-1.86,17.31-5.03,39.99,33.16,89.23,55.49,143.2,62.63,2.77,15.12,15.99,26.59,31.91,26.59s28.39-10.83,31.65-25.31c55-5.08,105.46-25.95,146.85-58.02,5.06,3.25,11.07,5.16,17.53,5.16,17.93,0,32.47-14.54,32.47-32.47,0-6.08-1.7-11.74-4.6-16.6,34.76-42.11,57.59-94.4,63.31-151.65,13.96-3.64,24.27-16.29,24.27-31.39s-10.69-28.22-25.04-31.58ZM496.7,140.71c6.65,0,12.83-2.01,17.98-5.44,31.39,38.04,52.45,84.86,59.08,136.13-8.8,1.97-16.22,7.51-20.72,15.02l-82.94-31.1c.08-.91.14-1.83.14-2.76,0-10.96-5.44-20.63-13.76-26.51l36.29-85.6c1.29.16,2.59.26,3.92.26ZM479.18,135.55l-36.05,85.02c-1.75-.29-3.53-.48-5.36-.48-13.93,0-25.78,8.79-30.39,21.12l-150.02-34.55c-.01-2.21-.24-4.38-.68-6.47l212.89-74.13c2.5,3.8,5.78,7.03,9.61,9.49ZM301.87,64.94c15.84,0,29.01-11.34,31.88-26.34,50.42,4.95,96.79,23.89,135.18,52.88-2.96,4.9-4.7,10.62-4.7,16.76,0,1.46.13,2.88.31,4.29l-213.97,74.51c-1.7-2.2-3.68-4.17-5.88-5.88l56.13-116.27c.35.01.69.05,1.04.05ZM270.28,39.89c2.16,9.2,8.2,16.9,16.33,21.24l-55.01,113.95c-2.16-.45-4.4-.7-6.7-.7-6.88,0-13.25,2.15-18.5,5.81l-65.22-54.46c2-4.21,3.15-8.91,3.15-13.88,0-5.82-1.55-11.28-4.24-16,36.8-29.33,81.42-49.2,130.2-55.95ZM64.15,296.02l134.89-69.57c5.88,7.75,15.14,12.78,25.59,12.87l46.23,147.78c-2.8,2.22-5.21,4.9-7.15,7.91l-199.97-83.32c.76-2.75,1.19-5.63,1.19-8.62,0-2.43-.29-4.78-.79-7.06ZM96.02,140.19c4.69,2.62,10.08,4.13,15.83,4.13,7.74,0,14.83-2.71,20.41-7.23l64.4,53.78c-2.68,4.72-4.23,10.17-4.23,15.99,0,2.2.22,4.36.64,6.44l-135.12,69.68c-4.3-5.44-10.29-9.45-17.19-11.27,6.32-49.23,25.98-94.31,55.26-131.52ZM109.44,464.23c-5.87,0-11.37,1.58-16.12,4.31-28.94-38.02-48-83.93-53.3-133.91,6.64-1.58,12.49-5.2,16.85-10.17l201.97,84.15c-.15,1.28-.26,2.58-.26,3.9,0,3.85.71,7.53,1.94,10.96l-122.14,58.52c-5.37-10.54-16.29-17.77-28.93-17.77ZM270.58,572.3c-50.26-6.9-96.16-27.69-133.61-58.44,3.11-4.98,4.94-10.85,4.94-17.16,0-.13-.02-.25-.02-.38l126.46-60.6c3.24,3.17,7.14,5.63,11.47,7.23l7.56,108.9c-8.17,4.08-14.36,11.48-16.81,20.45ZM284.03,380.82l-45.25-144.64c6.76-3.21,12.23-8.67,15.44-15.44l151.23,34.83c.5,5.42,2.33,10.44,5.16,14.76l-103.73,113.85c-4.69-2.63-10.08-4.14-15.84-4.14-2.41,0-4.75.28-7.01.78ZM333.48,573.58c-3.32-14.41-16.2-25.16-31.62-25.16-.08,0-.16.01-.25.01l-7.2-103.62c7.76-.8,14.69-4.34,19.85-9.63l151.2,66.71c0,.28-.04.55-.04.83,0,6.21,1.78,12,4.8,16.94-38.71,29.61-85.65,48.96-136.75,53.93ZM469.12,487.71l-147.27-64.97c1.07-3.22,1.67-6.65,1.67-10.23,0-6.95-2.2-13.38-5.92-18.66l103.42-113.51c4.89,2.96,10.61,4.69,16.75,4.69,1.35,0,2.67-.11,3.98-.27l38.65,190.63c-4.75,3.05-8.66,7.3-11.28,12.33ZM515.71,475.57c-5.11-3.36-11.23-5.33-17.81-5.33-1.28,0-2.53.09-3.77.24l-38.67-190.71c4.18-2.72,7.68-6.39,10.23-10.69l82.87,31.08c-.09.96-.15,1.93-.15,2.91,0,15.75,11.22,28.87,26.09,31.84-5.68,52.99-26.82,101.41-58.8,140.66Z"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em', fontStyle: 'italic' }}>
            <span style={{ color: '#FFFFFF' }}>JOIN</span>
            <span style={{ color: '#2FB7FF' }}>CLOUD</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          © 2026 JoinCloud by Vinay Shakyawar | Marketing Partner{' '}
          <a href="https://arevei.com" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Arevei.com</a>
          {' · '}
          {/* <a href="#calculator" className="hover:text-primary transition-colors" data-testid="link-calculator">Calculator</a>
          {' · '} */}
          <a href="/privacy" className="hover:text-primary transition-colors" data-testid="link-privacy">Privacy Policy</a>
          {' · '}
          <a href="/terms" className="hover:text-primary transition-colors" data-testid="link-terms">Terms</a>
          {' · '}
          <EmailLink to="info@joincloud.in" subject="JoinCloud Support" className="hover:text-primary transition-colors" data-testid="link-support">Support</EmailLink>
        </p>
        <p className="text-xs text-muted-foreground/80">
          Your Cloud. Your Data. Your Rules.
        </p>
      </div>
    </footer>
  );
}

export default function Landing() {
  const waitlistRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const handleJoinWaitlistClick = () => {
    toast({
      title: "Start your personal cloud",
      description: "Share your email below and we'll help you get started with JoinCloud.",
    });
    setTimeout(() => {
      waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
      <div className="min-h-screen bg-background">
        <Header onJoinWaitlistClick={handleJoinWaitlistClick} />
        <main>
          <Hero onJoinWaitlistClick={handleJoinWaitlistClick} />
          {SECTION_VISIBILITY.trustBanner && <TrustBanner />}
          {SECTION_VISIBILITY.problem && <ProblemSection />}
          {SECTION_VISIBILITY.oldVsJoinCloud && <OldVsJoinCloudSection />}
          {SECTION_VISIBILITY.ourStory && <OurStorySection />}
          {SECTION_VISIBILITY.solution && <WhatJoinCloudIs />}
          {SECTION_VISIBILITY.howItWorks && <HowItWorks />}
          {SECTION_VISIBILITY.features && <Features />}
          {SECTION_VISIBILITY.whoItsFor && <WhoItsFor />}
          {SECTION_VISIBILITY.comparison && <ComparisonTable />}
          {SECTION_VISIBILITY.security && <SecuritySection />}
          {SECTION_VISIBILITY.vision && <VisionSection />}
          {SECTION_VISIBILITY.pricing && <PricingSection />}
          {SECTION_VISIBILITY.calculator && <UploadWasteCalculator />}
          {SECTION_VISIBILITY.waitlist && <WaitlistSection waitlistRef={waitlistRef} />}
          {SECTION_VISIBILITY.feedback && <FeedbackSection />}
          {SECTION_VISIBILITY.support && <SupportSection />}
        </main>
        <Footer />
      </div>
  );
}
