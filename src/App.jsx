import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Menu, 
  X,
  Activity,
  MousePointer2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- TOKENS: PRESET A (Organic Tech) ---
const THEME = {
  palette: {
    primary: '#2E4036', // Moss
    accent: '#CC5833',  // Clay
    bg: '#F2F0E9',      // Cream
    text: '#1A1A1A',    // Charcoal
  },
  fonts: {
    heading: "'Plus Jakarta Sans', sans-serif",
    drama: "'Cormorant Garamond', serif",
    data: "'IBM Plex Mono', monospace"
  },
  images: {
    hero: "https://images.unsplash.com/photo-1592919016383-407399c476d7?auto=format&fit=crop&q=80&w=2000",
    texture: "https://images.unsplash.com/photo-1550147760-44c9966d6bc7?auto=format&fit=crop&q=80&w=1000",
    protocol1: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800",
    protocol2: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=800",
    protocol3: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
  }
};

// --- COMPONENTS ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05]">
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const MagneticButton = ({ children, variant = "primary", className = "" }) => {
  const btnRef = useRef(null);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    gsap.to(btnRef.current, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-bold transition-all duration-300 overflow-hidden group flex items-center gap-2";
  const variants = {
    primary: `bg-[#2E4036] text-[#F2F0E9]`,
    accent: `bg-[#CC5833] text-[#F2F0E9]`,
    outline: `border-2 border-[#2E4036] text-[#2E4036] hover:text-[#F2F0E9]`
  };

  return (
    <button 
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="absolute inset-0 bg-[#1A1A1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-6 py-3 rounded-full transition-all duration-500 border ${
      isScrolled ? 'bg-[#F2F0E9]/80 backdrop-blur-xl border-[#2E4036]/20 shadow-lg' : 'bg-transparent border-transparent'
    }`}>
      <span className="text-xl font-bold tracking-tighter" style={{ fontFamily: THEME.fonts.heading, color: isScrolled ? THEME.palette.primary : THEME.palette.bg }}>
        MTC<span className="text-[#CC5833]">.</span>
      </span>
      <div className="hidden md:flex gap-6 text-sm font-medium" style={{ color: isScrolled ? THEME.palette.primary : THEME.palette.bg }}>
        <a href="#" className="hover:opacity-70 transition-opacity">Origins</a>
        <a href="#" className="hover:opacity-70 transition-opacity">Superfoods</a>
        <a href="#" className="hover:opacity-70 transition-opacity">Global Supply</a>
      </div>
      <button className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
        isScrolled ? 'bg-[#2E4036] text-[#F2F0E9]' : 'bg-[#F2F0E9] text-[#2E4036]'
      }`}>
        Shop Now
      </button>
    </nav>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-line-1", { y: 60, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".hero-line-2", { y: 100, opacity: 0, duration: 1.2, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-cta", { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-end p-8 md:p-20 overflow-hidden bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105" 
        style={{ backgroundImage: `url(${THEME.images.hero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      
      <div className="relative z-10 max-w-5xl">
        <h1 className="flex flex-col mb-8">
          <span className="hero-line-1 text-3xl md:text-5xl font-bold text-[#F2F0E9] tracking-tight uppercase" style={{ fontFamily: THEME.fonts.heading }}>
            Farm integrity is the
          </span>
          <span className="hero-line-2 text-7xl md:text-[11rem] leading-[0.85] text-[#CC5833] italic" style={{ fontFamily: THEME.fonts.drama }}>
            Foundation.
          </span>
        </h1>
        <p className="hero-line-1 text-[#F2F0E9]/80 max-w-lg mb-10 text-lg md:text-xl leading-relaxed">
          From Indian fields to global tables. We bridge the gap with export-grade superfoods and dehydrated essentials.
        </p>
        <div className="hero-cta flex flex-col md:flex-row gap-4">
          <MagneticButton variant="accent">
            Shop Farm Products <ArrowRight size={20} />
          </MagneticButton>
          <MagneticButton variant="outline" className="!text-[#F2F0E9] !border-[#F2F0E9]">
            Partner with us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

const DiagnosticShuffler = () => {
  const [items, setItems] = useState([
    { label: "Moringa Purity", value: "99.8%" },
    { label: "Origin Trace", value: "Direct" },
    { label: "Lab Tested", value: "Verified" }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        newArr.unshift(newArr.pop());
        return newArr;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {items.map((item, i) => (
        <div 
          key={item.label}
          className="absolute w-full max-w-[240px] p-6 rounded-3xl border border-[#2E4036]/10 bg-[#F2F0E9] transition-all duration-700 shadow-xl"
          style={{ 
            transform: `translateY(${i * -12}px) scale(${1 - i * 0.05})`,
            zIndex: 10 - i,
            opacity: 1 - i * 0.3
          }}
        >
          <p className="text-[10px] uppercase tracking-widest text-[#CC5833] mb-1 font-bold" style={{ fontFamily: THEME.fonts.data }}>Diagnostic</p>
          <h4 className="font-bold text-[#2E4036]">{item.label}</h4>
          <p className="text-2xl font-serif italic text-[#2E4036]">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

const TelemetryTypewriter = () => {
  const text = "> Quality protocol engaged... Sourcing verified... Processing 100% natural moringa... No additives detected.";
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i = (i + 1) % (text.length + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-[#1A1A1A] rounded-[2rem] h-full font-mono text-[11px] text-[#CC5833]/80 leading-relaxed overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse" />
        <span className="uppercase tracking-tighter">Live Quality Feed</span>
      </div>
      <p>{displayText}<span className="inline-block w-2 h-4 bg-[#CC5833] ml-1 animate-bounce" /></p>
    </div>
  );
};

const ProtocolScheduler = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [active, setActive] = useState(1);
  const cursorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(cursorRef.current, { x: 40, y: 30, duration: 1.5, ease: "power2.inOut" })
      .to(cursorRef.current, { scale: 0.8, duration: 0.2 })
      .add(() => setActive(3))
      .to(cursorRef.current, { scale: 1, duration: 0.2 })
      .to(cursorRef.current, { x: 100, y: 100, duration: 2, ease: "power2.inOut" });
  }, []);

  return (
    <div className="relative p-6 bg-white rounded-[2rem] border border-[#2E4036]/5 h-full overflow-hidden">
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((d, i) => (
          <div key={i} className={`h-8 flex items-center justify-center rounded-lg text-[10px] font-bold ${active === i ? 'bg-[#CC5833] text-white' : 'bg-[#F2F0E9] text-[#2E4036]/40'}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="w-full h-12 rounded-xl bg-[#2E4036] flex items-center justify-center text-[#F2F0E9] text-[10px] font-bold uppercase tracking-widest">
        Save Protocol
      </div>
      <div ref={cursorRef} className="absolute pointer-events-none text-[#CC5833]">
        <MousePointer2 size={24} fill="currentColor" />
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-32 px-8 bg-[#F2F0E9]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <DiagnosticShuffler />
          <div className="px-4">
            <h3 className="text-2xl font-bold text-[#2E4036]" style={{ fontFamily: THEME.fonts.heading }}>Farm-Sourced Authenticity</h3>
            <p className="text-[#2E4036]/60 text-sm leading-relaxed mt-2">Direct lineage from trusted farmer networks ensures every batch is natural, traceable, and pure.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <TelemetryTypewriter />
          <div className="px-4">
            <h3 className="text-2xl font-bold text-[#2E4036]" style={{ fontFamily: THEME.fonts.heading }}>Export-Grade Quality</h3>
            <p className="text-[#2E4036]/60 text-sm leading-relaxed mt-2">Global standards applied to every household order. Built on a legacy of international B2B supply.</p>
          </div>
        </div>

        <div className="space-y-6">
          <ProtocolScheduler />
          <div className="px-4">
            <h3 className="text-2xl font-bold text-[#2E4036]" style={{ fontFamily: THEME.fonts.heading }}>Clean Processing</h3>
            <p className="text-[#2E4036]/60 text-sm leading-relaxed mt-2">Nutrient-dense dehydration protocols preserve flavor and potency without artificial interference.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".split-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 px-8 bg-[#1A1A1A] overflow-hidden text-[#F2F0E9]">
      <div 
        className="absolute inset-0 opacity-10 bg-fixed bg-cover"
        style={{ backgroundImage: `url(${THEME.images.texture})` }}
      />
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="split-line text-sm uppercase tracking-[0.3em] text-[#CC5833] font-bold mb-8" style={{ fontFamily: THEME.fonts.data }}>The MTC Manifesto</p>
        <h2 className="split-line text-3xl md:text-5xl mb-12 opacity-60 leading-tight" style={{ fontFamily: THEME.fonts.heading }}>
          Most food systems focus on: <span className="italic">Shelf-life and mass distribution overheads.</span>
        </h2>
        <h2 className="split-line text-5xl md:text-8xl leading-[0.9] font-bold" style={{ fontFamily: THEME.fonts.heading }}>
          We focus on: <span className="text-[#CC5833] italic" style={{ fontFamily: THEME.fonts.drama }}>Biological Purity.</span>
        </h2>
      </div>
    </section>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".protocol-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(card, {
              scale: 1 - progress * 0.1,
              filter: `blur(${progress * 10}px)`,
              opacity: 1 - progress * 0.5,
              duration: 0.1
            });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { 
      title: "Traceable Sourcing", 
      desc: "Direct-to-farm procurement contracts eliminate middlemen, ensuring 100% value returns to farmers and 100% transparency for you.",
      img: THEME.images.protocol1
    },
    { 
      title: "Cold-Dehydration", 
      desc: "Advanced moisture extraction at low temperatures preserves the volatile oils and phytonutrients often lost in conventional heat drying.",
      img: THEME.images.protocol2
    },
    { 
      title: "Export Calibration", 
      desc: "Every batch is screened against international quality benchmarks before being vacuum-sealed for your kitchen.",
      img: THEME.images.protocol3
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#1A1A1A]">
      {steps.map((step, i) => (
        <section key={i} className="protocol-card h-screen w-full flex items-center justify-center p-8 bg-[#F2F0E9] border-t border-[#2E4036]/10 rounded-t-[3rem]">
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
              <span className="font-mono text-[#CC5833] text-xl" style={{ fontFamily: THEME.fonts.data }}>0{i + 1}</span>
              <h3 className="text-5xl md:text-7xl font-bold text-[#2E4036] mt-4 mb-8" style={{ fontFamily: THEME.fonts.heading }}>{step.title}</h3>
              <p className="text-xl text-[#2E4036]/70 leading-relaxed max-w-md">{step.desc}</p>
            </div>
            <div className="order-1 md:order-2 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl relative group">
              <img src={step.img} alt={step.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-[#2E4036]/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#1A1A1A] text-[#F2F0E9] py-20 px-8 rounded-t-[4rem]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-4xl font-bold mb-6 tracking-tighter" style={{ fontFamily: THEME.fonts.heading }}>MTC FARM FRESH</h2>
        <p className="text-[#F2F0E9]/60 max-w-sm mb-8">Bridging the gap between pure origin and global wellness through export-grade agricultural technology.</p>
        <div className="flex items-center gap-2 font-mono text-xs text-[#CC5833]">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          SYSTEM OPERATIONAL // DIRECT-FROM-FARM ACTIVE
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-[#CC5833]">Navigation</h4>
        <ul className="space-y-4 text-sm opacity-60">
          <li><a href="#" className="hover:opacity-100 transition-opacity">Product Catalog</a></li>
          <li><a href="#" className="hover:opacity-100 transition-opacity">Export Services</a></li>
          <li><a href="#" className="hover:opacity-100 transition-opacity">Our Farmers</a></li>
          <li><a href="#" className="hover:opacity-100 transition-opacity">Process Whitepaper</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-[#CC5833]">Legal</h4>
        <ul className="space-y-4 text-sm opacity-60">
          <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
          <li><a href="#" className="hover:opacity-100 transition-opacity">Supply Ethics</a></li>
          <li><a href="#" className="hover:opacity-100 transition-opacity">Global Shipping</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] opacity-40 uppercase tracking-widest font-mono">
      <span>&copy; 2024 MTC Farm Fresh. Crafted for Purity.</span>
      <span>V.4.21.0 - India // Worldwide</span>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="bg-[#F2F0E9] text-[#1A1A1A] selection:bg-[#CC5833] selection:text-white">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <section className="py-40 px-8 flex flex-col items-center text-center bg-[#F2F0E9]">
        <h2 className="text-6xl md:text-9xl font-bold mb-12 tracking-tight text-[#2E4036]" style={{ fontFamily: THEME.fonts.heading }}>
          Ready for <span className="italic text-[#CC5833]" style={{ fontFamily: THEME.fonts.drama }}>Authentic</span> Taste?
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <MagneticButton variant="primary" className="!px-12 !py-6 text-xl">
            Shop Our Products
          </MagneticButton>
          <MagneticButton variant="outline" className="!px-12 !py-6 text-xl">
            Export Inquiries
          </MagneticButton>
        </div>
      </section>
      <Footer />
    </main>
  );
}
