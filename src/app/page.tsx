"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, History as HistoryIcon, User, Search, RefreshCcw } from "lucide-react";
import { checkKhodam, getHistory } from "./actions";
import { KHODAMS, Khodam } from "@/lib/khodams";
import { useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ name: string; khodam: Khodam } | null>(null);
  const [isRitualizing, setIsRitualizing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  // Load initial history
  useEffect(() => {
    fetchHistory();
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

    // Simulate ritual time
    setTimeout(async () => {
      const resp = await checkKhodam(name);
      if (resp && resp.khodam) {
        setResult({ name: name, khodam: resp.khodam });
      }
      setIsRitualizing(false);
      fetchHistory();
    }, 2500); // 2.5 seconds of ritual
  };

  return (
    <main className="w-full flex flex-col gap-12 items-center">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="text-purple-500 w-8 h-8" />
          <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 font-outfit">
            KHODAM REGISTRY
          </h1>
          <Sparkles className="text-orange-500 w-8 h-8" />
        </div>
        <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
          Ungkap penjaga spiritualmu melalui ritual digital yang deterministik dan penuh wibawa melintasi dimensi meme.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
        
        <form onSubmit={handleCheck} className="relative z-10 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Masukan Namamu</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth: Budi Santoso"
                className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-lg font-medium focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-700 disabled:opacity-50"
                disabled={isRitualizing}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isRitualizing || !name.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-4 rounded-2xl text-lg shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group transition-all transform active:scale-95"
          >
            {isRitualizing ? (
              <span className="flex items-center justify-center gap-3">
                <RefreshCcw className="w-6 h-6 animate-spin" />
                MENGHUBUNGI DIMENSI KHODAM...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                MULAI RITUAL <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </span>
            )}
          </button>
        </form>
      </motion.section>

      {/* Reveal Sequence */}
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
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
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
                MELAKUKAN RITUAL...
              </motion.h2>
              <p className="text-zinc-500 max-w-sm">Mohon tenang. Namamu sedang dianalisis oleh entitas dari dimensi meme nusantara.</p>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-2xl bg-zinc-900 border-2 border-purple-500/30 rounded-3xl p-10 overflow-hidden relative shadow-[0_0_50px_rgba(168,85,247,0.2)]"
          >
             {/* Decorative Background */}
            <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] z-0`} />
            <div className={`absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] z-0`} />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
              <div className="space-y-4">
                <span className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em] font-outfit">Penjaga untuk {result.name}</span>
                <div className="flex flex-col items-center gap-2">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl font-black text-white drop-shadow-lg font-outfit"
                  >
                    {result.khodam.name}
                  </motion.h2>
                  {result.khodam.type && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-[10px] font-bold text-purple-400 uppercase tracking-widest"
                    >
                      Tipe: {result.khodam.type}
                    </motion.span>
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 p-8 rounded-2xl max-w-md w-full shadow-inner"
              >
                <p className="text-zinc-300 italic text-xl leading-relaxed">
                  &quot;{result.khodam.description}&quot;
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setResult(null); setName(""); }}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 font-bold transition-colors"
                title="Cek Nama Lain"
              >
                <RefreshCcw className="w-5 h-5" />
                CEK NAMA LAIN
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Section */}
      <section className="w-full max-w-xl space-y-6 pt-12 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <HistoryIcon className="text-zinc-600 w-6 h-6" />
          <h3 className="text-xl font-bold font-outfit">Riwayat Penampakan</h3>
        </div>

        <div className="grid gap-3">
          {history.length > 0 ? (
            history.map((record) => {
              const khodam = KHODAMS.find(k => k.id === record.khodamId);
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-5 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 group-hover:text-purple-400 transition-colors uppercase tracking-tight">{record.userName}</span>
                    <span className="text-zinc-500 text-sm">{new Date(record.createdAt).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-zinc-300">{khodam?.name}</div>
                    <div className="flex justify-end gap-1 items-center">
                       {khodam?.type && (
                        <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 uppercase font-bold tracking-widest">{khodam.type}</span>
                      )}
                      <div className="text-[10px] uppercase font-black text-zinc-600 tracking-tighter">Teridentifikasi</div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-zinc-700 italic text-center py-8">Belum ada riwayat ritual.</p>
          )}
        </div>
      </section>
    </main>
  );
}
