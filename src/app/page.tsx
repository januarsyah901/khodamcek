"use client";

import { useState, useTransition, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Skull,
  Eye,
  History as HistoryIcon,
  User,
  RefreshCcw,
  LayoutDashboard,
  ChevronRight,
  ChevronLeft,
  Ghost,
  Flame,
  Search,
  X
} from "lucide-react";
import { checkKhodam, getHistory } from "./actions";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ name: string; khodam: any } | null>(null);
  const [isRitualizing, setIsRitualizing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 15000);
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
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-screen relative overflow-hidden">
      {/* Red Pulse Ambient Glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/30 blur-[200px] -z-10"
      />

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col gap-12 items-center p-6 lg:p-12 relative transition-all duration-500 ${isSidebarOpen ? 'lg:mr-[450px]' : 'mr-0'}`}>
        {/* Navbar */}
        <header className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skull className="w-6 h-6 text-red-600 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]" />
            <span className="text-[10px] font-black tracking-[0.4em] text-zinc-300">KHODAM_STALKER_V2.0</span>
          </div>
          <Link
            href="/dashboard"
            className="group flex items-center gap-3 bg-zinc-900 border-2 border-red-900/40 hover:bg-red-900/20 p-4 px-6 rounded-xl transition-all shadow-2xl"
          >
            <LayoutDashboard className="w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors" />
            <span className="text-[11px] font-black tracking-[0.3em] text-white uppercase">KANDANG KHODAM</span>
          </Link>
        </header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4 max-w-2xl mt-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Skull className="text-red-600 w-16 h-16 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </motion.div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white font-outfit uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-red-600 drop-shadow-2xl">
              KHODAM REGISTRY
            </h1>
            <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Skull className="text-red-600 w-16 h-16 drop-shadow-[0_0_15px_rgba(220,38,38,0.6)]" />
            </motion.div>
          </div>
          <p className="text-red-600 font-black uppercase tracking-[0.6em] text-lg md:text-2xl">
              KOMISI PENGECEKAN DAN PENDAFTARAN KHODAM!
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xl bg-zinc-900/90 p-12 rounded-[2.5rem] border-2 border-red-900/60 shadow-[0_0_100px_rgba(0,0,0,1)] relative group overflow-hidden backdrop-blur-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_20px_red]" />

          <form onSubmit={handleCheck} className="relative z-10 space-y-12">
            <div className="space-y-6">
              <label className="text-xs font-black uppercase tracking-[0.5em]  ml-1 block text-center">Masukin Nama Majikan</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-red-600 transition-all" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ketik namamu di sini..."
                  className="w-full bg-black border-2 border-red-900/60 rounded-2xl py-6 pl-16 pr-4 text-2xl font-black focus:outline-none focus:border-red-600 focus:ring-8 focus:ring-red-600/10 transition-all placeholder:text-zinc-800 text-white disabled:opacity-30 tracking-tight"
                  disabled={isRitualizing}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isRitualizing || !name.trim()}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-black py-7 rounded-2xl text-3xl shadow-[0_0_60px_rgba(185,28,28,0.5)] disabled:opacity-20 disabled:cursor-not-allowed transition-all transform active:scale-95 group relative overflow-hidden flex items-center justify-center gap-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isRitualizing ? (
                <>
                  <RefreshCcw className="w-8 h-8 animate-spin" />
                  LAGI TARIK-TARIKAN...
                </>
              ) : (
                <>
                  PANGGIL KHODAMMU <Ghost className="w-8 h-8 group-hover:animate-bounce" />
                </>
              )}
            </button>
          </form>
        </motion.section>

        {/* Reveal Sequence & Result UI elements */}
        <AnimatePresence>
          {isRitualizing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center flex-col gap-12 text-center p-8 overflow-hidden"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                  className="absolute inset-0 w-[500px] h-[500px] border-[3px] border-red-600/40 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border-dashed"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7],
                    filter: ["blur(0px)", "blur(12px)", "blur(0px)"]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative z-10"
                >
                  <Eye className="w-48 h-48 text-red-600 shadow-[0_0_100px_rgba(220,38,38,0.7)]" />
                </motion.div>
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.1, repeat: Infinity, repeatDelay: Math.random() }}
                  className="absolute inset-0 bg-red-600/10 blur-[120px] rounded-full"
                />
              </div>
              <div className="space-y-8 relative z-20">
                <motion.h2 
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-7xl font-black italic text-red-700 font-outfit uppercase tracking-tighter drop-shadow-[0_0_20px_red]"
                >
                  LAGI NYIAPIN KOPI...
                </motion.h2>
                <div className="w-96 h-3 bg-zinc-900 mx-auto rounded-full overflow-hidden border border-red-900/50 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                    className="h-full bg-red-600 shadow-[0_0_25px_rgba(220,38,38,1)]"
                  />
                </div>
                <p className="text-zinc-200 font-black tracking-widest uppercase text-sm animate-pulse">Bentar, Khodamnya Lagi Mandi Kembang</p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 overflow-y-auto overflow-x-hidden"
            >
              {/* Modal Header/Control */}
              <div className="absolute top-6 right-6 md:top-12 md:right-12 z-[120] flex items-center gap-4">
                <span className="hidden md:block text-[10px] font-black text-white uppercase tracking-[0.5em]">USIR HANTU SEKARANG</span>
                <button
                  onClick={() => { setResult(null); setName(""); }}
                  className="bg-red-900/40 hover:bg-red-600 p-4 md:p-5 rounded-2xl text-white transition-all transform hover:scale-110 active:rotate-90 group border border-red-500/20 shadow-2xl"
                >
                  <Skull className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse" />
                </button>
              </div>

              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="w-full max-w-6xl bg-zinc-950 border-l-[8px] md:border-l-[16px] border-red-700 rounded-3xl md:rounded-r-[5rem] p-8 md:p-20 relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] border-t border-b border-red-900/30"
              >
                {/* Ominous Inner Glows */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/15 rounded-full blur-[100px] -z-10" />
                <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-red-950/20 rounded-full blur-[80px] -z-10" />

                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-10 md:space-y-16">
                  <div className="space-y-6 w-full flex flex-col items-center md:items-start">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 bg-red-950/20 px-6 py-2 rounded-full border border-red-900/30"
                    >
                      <Ghost className="w-5 h-5 text-red-600" />
                      <span className="text-red-500 text-xs font-black uppercase tracking-[0.5em] font-outfit drop-shadow-sm">Ketangkep Basah!</span>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white drop-shadow-[5px_5px_0px_#7f1d1d] font-outfit leading-[0.9] uppercase tracking-tighter"
                      >
                        {result.khodam.name}
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-wrap items-center gap-3 justify-center md:justify-start"
                      >
                        <div className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.4em] shadow-2xl font-outfit border-2 ${
                          result.khodam.type === 'Wanderer' ? 'bg-emerald-900/80 text-emerald-300 border-emerald-500/50 shadow-emerald-900/40' :
                          result.khodam.type === 'Guardian' ? 'bg-blue-900/80 text-blue-300 border-blue-500/50 shadow-blue-900/40' :
                          result.khodam.type === 'Trickster' ? 'bg-rose-900/80 text-rose-300 border-rose-500/50 shadow-rose-900/40' :
                          result.khodam.type === 'Sage' ? 'bg-amber-900/80 text-amber-300 border-amber-500/50 shadow-amber-900/40' :
                          result.khodam.type === 'Healer' ? 'bg-cyan-900/80 text-cyan-300 border-cyan-500/50 shadow-cyan-900/40' :
                          'bg-red-900/80 text-red-300 border-red-500/50 shadow-red-900/40'
                        }`}>
                          GOLONGAN: {result.khodam.type || "GHAIB"}
                        </div>
                        <div className="bg-zinc-900/90 text-zinc-400 border-2 border-zinc-800 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] font-mono">
                          ID_HANTU: #{result.khodam.id}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-8 md:p-12 bg-black/60 backdrop-blur-xl border-l-[4px] border-red-600 rounded-r-3xl max-w-4xl w-full shadow-2xl relative"
                  >
                    <p className="text-zinc-100 italic text-xl sm:text-2xl md:text-4xl leading-relaxed md:leading-[1.2] font-outfit font-bold tracking-tight">
                      &quot;{result.khodam.description}&quot;
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col md:flex-row gap-6 items-center w-full justify-between pt-8 border-t border-red-900/20"
                  >
                    <div className="text-white text-[10px] font-black uppercase tracking-widest animate-pulse flex items-center gap-2">
                      <Eye className="w-4 h-4 text-red-500" /> Khodam ini milik {result.name} selamanya!
                    </div>

                    <button
                      onClick={() => { setResult(null); setName(""); }}
                      className="group bg-red-700 hover:bg-white text-white hover:text-red-950 py-5 px-10 rounded-2xl font-black transition-all transition-duration-300 uppercase tracking-[0.4em] text-xs shadow-[0_0_50px_rgba(185,28,28,0.4)] transform active:scale-95 flex items-center gap-3"
                    >
                      COBA NAMA LAIN <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sidebar - Ominous History */}
      <aside
        className={`fixed top-0 right-0 h-screen bg-black/99 border-l border-red-900/60 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[-20px_0_100px_rgba(0,0,0,1)] z-40 ${isSidebarOpen ? 'w-full md:w-[450px]' : 'w-0'}`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-1/2 -left-12 -translate-y-1/2 bg-black border border-red-900/40 text-red-600 p-3 rounded-l-2xl hover:text-white hover:bg-red-950 transition-all z-[50] flex flex-col items-center gap-4 ${isSidebarOpen ? 'opacity-100' : 'opacity-100 shadow-[-10px_0_30px_rgba(220,38,38,0.3)]'}`}
        >
          {isSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
          {!isSidebarOpen && <span className="[writing-mode:vertical-lr] text-[10px] font-black tracking-[0.4em] text-red-500 uppercase">RIWAYAT</span>}
        </button>

        <div className={`flex flex-col gap-6 p-6 h-full overflow-hidden transition-all duration-500 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          {/* Header Section */}
          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-red-800/60 pb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <HistoryIcon className="text-red-600 w-8 h-8 drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]" />
                  <div className="absolute inset-0 rounded-full bg-red-600/30 blur-md -z-10"></div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black font-outfit uppercase tracking-widest text-white leading-tight">
                    DAFTAR MAJIKAN & KHODAM
                  </h3>
                </div>
              </div>
              <div className="flex justify-start sm:justify-end">
                <span className="font-black text-xs text-white bg-red-900/60 px-4 py-2 rounded-xl tracking-widest border border-red-500/40 shadow-lg">
                  {history.length} ENTRI
                </span>
              </div>
            </div>
            {/* Decorative gradient line */}
            <div className="absolute -bottom-px left-0 w-28 h-[3px] bg-gradient-to-r from-red-500 via-white to-transparent"></div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-red-950/95 backdrop-blur-md">
                <tr className="sticky top-0 z-10 bg-red-950/95 backdrop-blur-md">
                  <th className="py-4 px-4 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-100 bg-red-950/80 rounded-l-xl">
                    Majikan
                  </th>
                  <th className="py-4 px-4 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-100 bg-red-950/80">
                    Khodam
                  </th>
                  <th className="py-4 px-6 text-[11px] font-black uppercase tracking-[0.4em] text-zinc-100 bg-red-950/80 rounded-r-xl text-right">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-900/30">
                {history.length > 0 ? (
                  history.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative hover:bg-zinc-900/50 transition-all duration-300 cursor-pointer border-b border-red-900/10 last:border-none"
                    >
                      {/* Majikan - Username */}
                      <td className="py-5 px-4 w-[35%]">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-zinc-900 border-2 border-red-600 flex items-center justify-center flex-shrink-0 group-hover:border-white transition-colors hidden xs:flex">
                            <span className="text-[10px] font-black text-white">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block text-base md:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors tracking-wide truncate">
                              {record.userName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Khodam - Khodam Name + Type */}
                      <td className="py-5 px-4 w-[40%]">
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="text-base md:text-lg font-black text-amber-300 group-hover:text-white transition-colors leading-tight tracking-wide truncate">
                            {record.khodam?.name || "KHODAM"}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse ${
                              record.khodam?.type === 'Wanderer' ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' :
                              record.khodam?.type === 'Guardian' ? 'bg-blue-400 shadow-[0_0_10px_#3b82f6]' :
                              record.khodam?.type === 'Trickster' ? 'bg-rose-400 shadow-[0_0_10px_#f43f5e]' :
                              record.khodam?.type === 'Sage' ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' :
                              record.khodam?.type === 'Healer' ? 'bg-cyan-400 shadow-[0_0_10px_#06b6d4]' :
                              'bg-red-400 shadow-[0_0_10px_#ef4444]'
                            }`}></div>
                            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest truncate">
                              {record.khodam?.type || "STABLE"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* AKTIVASI - Time */}
                      <td className="py-5 px-6 text-right w-[25%]">
                        <div className="inline-flex flex-col items-end">
                          <span className="font-mono text-sm md:text-base font-black text-white bg-black/60 px-3 py-1.5 rounded-xl border border-red-500/40">
                            {new Date(record.createdAt).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-28 text-center">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="absolute inset-0 blur-3xl bg-red-600/20 rounded-full"></div>
                          <Eye className="w-20 h-20 text-red-500/40 mx-auto animate-pulse" />
                        </div>
                        <div className="mt-6 space-y-2">
                          <p className="text-white font-black uppercase tracking-[0.4em] text-sm">BELUM ADA DATA</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #450a0a;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7f1d1d;
        }
      `}</style>
    </div>
  );
}
