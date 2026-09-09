import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';

interface Bubble {
  id: number;
  x: number; // percentage
  size: number; // px
  speed: number; // seconds
  delay: number;
  color: string;
}

const BUBBLE_COLORS = [
  'bg-pink-300/60 border-pink-400 text-pink-600',
  'bg-sky-300/60 border-sky-400 text-sky-600',
  'bg-amber-300/60 border-amber-400 text-amber-600',
  'bg-emerald-300/60 border-emerald-400 text-emerald-600',
  'bg-purple-300/60 border-purple-400 text-purple-600',
];

export const InteractiveBubbleFun: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [burstEffects, setBurstEffects] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Generate gentle floating bubbles
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: 5 + (i * 12) + (Math.random() * 5),
      size: 40 + Math.floor(Math.random() * 35),
      speed: 12 + Math.random() * 8,
      delay: i * 1.5,
      color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
    }));
    setBubbles(initialBubbles);
  }, []);

  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450 + Math.random() * 250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 300, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.09);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const handlePop = (id: number, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    playPopSound();
    setPoppedCount((prev) => prev + 1);

    // Add burst effect
    const burstId = Date.now();
    setBurstEffects((prev) => [...prev, { id: burstId, x, y, color: 'text-amber-400' }]);
    setTimeout(() => {
      setBurstEffects((prev) => prev.filter((b) => b.id !== burstId));
    }, 600);

    // Respawn bubble at bottom after short delay
    setBubbles((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            id: Date.now() + Math.random(),
            x: 5 + Math.random() * 90,
            delay: 0.5,
          };
        }
        return b;
      })
    );
  };

  return (
    <>
      {/* Floating Bubbles Layer in Hero / Page */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.9, 0.9, 0],
              x: [0, 15, -15, 0],
            }}
            transition={{
              y: { duration: b.speed, repeat: Infinity, ease: 'linear', delay: b.delay },
              opacity: { duration: b.speed, repeat: Infinity, times: [0, 0.1, 0.9, 1], delay: b.delay },
              x: { duration: b.speed / 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
            }}
            className="pointer-events-auto absolute cursor-pointer select-none"
            onClick={(e) => handlePop(b.id, e)}
            title="Pop me!"
          >
            <div
              className={`w-full h-full rounded-full border-2 backdrop-blur-xs shadow-sm hover:scale-125 transition-transform flex items-center justify-center ${b.color}`}
            >
              {/* Bubble Highlight reflection */}
              <div className="absolute top-1.5 left-2 w-2.5 h-1.5 bg-white/80 rounded-full rotate-[-30deg]" />
              <div className="text-[10px] opacity-40 font-bold">🫧</div>
            </div>
          </motion.div>
        ))}

        {/* Burst starburst particles */}
        <AnimatePresence>
          {burstEffects.map((effect) => (
            <motion.div
              key={effect.id}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ left: effect.x, top: effect.y }}
              className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-30"
            >
              <div className="text-xl">✨</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Kids Widget Badge (Bottom Left) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        id="bubble-score-badge"
        className="fixed bottom-5 left-5 z-40 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border-2 border-amber-200 shadow-lg flex items-center gap-2.5 text-xs font-bold text-slate-700 select-none hover:shadow-xl transition-all"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-sm">
          🫧
        </span>
        <span>
          Pop the Bubbles: <strong className="text-pink-600 font-extrabold text-sm">{poppedCount}</strong> popped!
        </span>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="ml-1 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          title={soundEnabled ? 'Mute pop sounds' : 'Enable pop sounds'}
          aria-label="Toggle pop sound"
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
        </button>
      </motion.div>
    </>
  );
};
