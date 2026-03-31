"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, History as HistoryIcon, User, RefreshCcw, LayoutDashboard, ChevronRight } from "lucide-react";
import { checkKhodam, getHistory } from "./actions";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ name: string; khodam: any } | null>(null);
  const [isRitualizing, setIsRitualizing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 10000); // Polling history
    return () => clearInterval(interval);
  }, []);

  async function fetchHistory() {
    const data = await getHistory();
    setHistory(data);
  }

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsRitualizing(true);
    setResult(null);

    setTimeout(async () => {
      const resp = await checkKhodam(name);
      if (resp && resp.khodam) {
        setResult({ name: name.trim(), khodam: resp.khodam });
      }
      setIsRitualizing(false);
      fetchHistory();
    }, 2500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1400px] mx-auto min-h-screen">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-12 items-center lg:py-12">
        {/* Navbar-ish header */}
        <header className="w-full flex justify-end">
          <Link 
            href="/dashboard" 
            className="group flex items-center gap-2 bg-zinc-900/50 hover:bg-zinc-800 p-3 px-5 rounded-2xl border border-zinc-800 transition-all"
          >
            <LayoutDashboard className="w-5 h-5 text-zinc-500 group-hover:text-purple-400 transition-colors" />
            <span className="text-sm font-bold text-zinc-400 group-hover:text-zinc-200">DASHBOARD</span>
          </Link>
        </header>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="text-purple-500 w-8 h-8" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 font-outfit uppercase">
              KHODAM REGISTRY
            </h1>
            <Sparkles className="text-orange-500 w-8 h-8" />
          </div>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            Identifikasi entitas gaib yang menjaga setiap langkahmu dalam dimensi meme nusantara.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
          
          <form onSubmit={handleCheck} className="relative z-10 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Nama Lengkap</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cek namamu..."
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-lg font-bold focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-700 disabled:opacity-50"
                  disabled={isRitualizing}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isRitualizing || !name.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-5 rounded-2xl text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group transition-all transform active:scale-95"
            >
              {isRitualizing ? (
                <span className="flex items-center justify-center gap-3">
                  <RefreshCcw className="w-6 h-6 animate-spin" />
                  MENARIK ENTITAS...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  PANGGIL KHODAM <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
                </span>
              )}
            </button>
          </form>
        </motion.section>

        {/* Reveal Sequence & Result UI elements are same as before but styled for main-focussed space */}
        <AnimatePresence>
          {isRitualizing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center flex-col gap-8 text-center p-6"
            >
              <div className="relative">
                 <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-purple-500 rounded-full blur-[100px]"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    boxShadow: ["0 0 20px rgba(168,85,247,0)", "0 0 80px rgba(168,85,247,0.6)", "0 0 20px rgba(168,85,247,0)"]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-24 h-24 rounded-full border-4 border-purple-500 flex items-center justify-center relative z-10 bg-black"
                >
                  <Sparkles className="w-12 h-12 text-purple-400" />
                </motion.div>
              </div>
              <div className="space-y-4">
                <motion.h2 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-4xl font-black italic text-white font-outfit"
                >
                  MENGIDENTIFIKASI...
                </motion.h2>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full max-w-2xl bg-zinc-900 border-2 border-purple-500/30 rounded-[2.5rem] p-10 overflow-hidden relative shadow-[0_0_80px_rgba(168,85,247,0.15)]"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] z-0" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4">
                  <span className="text-zinc-500 text-sm font-bold uppercase tracking-[0.4em] font-outfit">Terlampir pada {result.name}</span>
                  <div className="flex flex-col items-center gap-4">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl font-outfit py-2"
                    >
                      {result.khodam.name}
                    </motion.h2>
                    {result.khodam.type && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-[11px] font-black text-purple-300 uppercase tracking-[0.2em]"
                      >
                         KHODAM {result.khodam.type}
                      </motion.span>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-zinc-950/60 backdrop-blur-sm border border-zinc-800 p-8 rounded-3xl max-w-md w-full shadow-inner"
                >
                  <p className="text-zinc-200 italic text-xl leading-relaxed font-medium">
                    &quot;{result.khodam.description}&quot;
                  </p>
                </motion.div>

                <button
                  onClick={() => { setResult(null); setName(""); }}
                  className="flex items-center gap-2 text-zinc-500 hover:text-purple-400 font-bold transition-all uppercase tracking-widest text-xs"
                >
                   <RefreshCcw className="w-4 h-4" /> ULANGI RITUAL
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sidebar Section */}
      <aside className="w-full lg:w-[350px] bg-zinc-900/20 border-l border-zinc-900/50 p-6 lg:py-12 flex flex-col gap-8 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HistoryIcon className="text-zinc-700 w-6 h-6" />
            <h3 className="text-xl font-black font-outfit uppercase tracking-tighter">Riwayat Ritual</h3>
          </div>
          <span className="bg-zinc-800 text-[10px] p-1 px-2 rounded-lg text-zinc-500 font-black">LATEST 20</span>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] scrollbar-hide pr-2">
          {history.length > 0 ? (
            history.map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex flex-col gap-2 p-5 bg-zinc-900/40 rounded-3xl border border-zinc-800/50 hover:bg-zinc-900 hover:border-purple-500/30 transition-all cursor-default"
              >
                <div className="flex justify-between items-start">
                  <span className="font-black text-xs text-zinc-400 uppercase tracking-widest truncate max-w-[120px] mb-1">{record.userName}</span>
                  <span className="text-[10px] text-zinc-700 font-bold">{new Date(record.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-zinc-200 group-hover:text-white transition-colors">
                      {record.khodam?.name || "Entitas Misterius"}
                    </span>
                    <span className="text-[10px] text-purple-400/70 font-black uppercase tracking-tight">
                       KHODAM {record.khodam?.type || "RAHASIA"}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:text-purple-500 transition-colors transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto opacity-50">
                <Search className="w-5 h-5 text-zinc-700" />
              </div>
              <p className="text-zinc-700 italic text-sm">Belum ada jejak energi spiritual tertangkap.</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function Search({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  )
}
