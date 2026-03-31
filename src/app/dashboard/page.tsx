"use client";

import { useState, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  Save, 
  X, 
  Skull,
  Ghost,
  Flame,
  LayoutDashboard,
  Eye
} from "lucide-react";
import Link from "next/link";
import { getAllKhodams, createKhodam, updateKhodam, deleteKhodam } from "../actions";
import { Khodam } from "@/lib/khodams";

export default function Dashboard() {
  const [khodams, setKhodams] = useState<Khodam[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", type: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchKhodams();
  }, []);

  async function fetchKhodams() {
    const data = await getAllKhodams();
    setKhodams(data);
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await createKhodam({ 
        name: formData.name, 
        description: formData.description, 
        type: formData.type || null 
      } as any);
      setFormData({ name: "", description: "", type: "" });
      setIsAdding(false);
      fetchKhodams();
    });
  };

  const handleUpdate = async (id: number) => {
    startTransition(async () => {
      await updateKhodam(id, { 
        name: formData.name, 
        description: formData.description, 
        type: formData.type || null 
      } as any);
      setIsEditing(null);
      fetchKhodams();
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Yakin ingin menghapus entitas ini dari dunia fana?")) {
      startTransition(async () => {
        await deleteKhodam(id);
        fetchKhodams();
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-50 p-6 md:p-12 space-y-12 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-red-950/5 pointer-events-none -z-10" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-red-950/10 blur-[150px] -z-10 rounded-full" />
      
      <header className="flex flex-col md:flex-row justify-between items-center gap-8 bg-zinc-900 border-2 border-red-900/60 p-8 rounded-[2rem] shadow-2xl relative group backdrop-blur-xl">
        <div className="absolute top-0 left-10 w-40 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent shadow-[0_0_10px_red]" />
        
        <div className="flex items-center gap-6">
          <Link href="/" className="bg-red-900 hover:bg-red-700 p-4 rounded-2xl border border-red-600/40 text-white transition-all shadow-lg">
            <ArrowLeft className="w-7 h-7" />
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-10 h-10 text-red-600 drop-shadow-[0_0_5px_red]" />
              <h1 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter text-white">Kontrakan Khodam</h1>
            </div>
            <p className="text-[11px] text-red-500 font-black tracking-[0.5em] uppercase drop-shadow-sm">Tempat Ngatur Jadwal Piket Hantu</p>
          </div>
        </div>
        
        <button 
          onClick={() => { setIsAdding(true); setFormData({ name: "", description: "", type: "" }); }}
          className="flex items-center gap-3 bg-red-700 hover:bg-red-600 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-[0_0_40px_rgba(185,28,28,0.4)] border border-red-500/30 uppercase tracking-tighter text-sm"
        >
          <Plus className="w-6 h-6" /> UNDANG HANTU BARU
        </button>
      </header>

      <main className="grid gap-10">
        <AnimatePresence mode="popLayout">
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 border-l-8 border-red-600 p-12 rounded-r-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,1)] space-y-10 relative overflow-hidden ring-1 ring-red-900/30"
            >
              <div className="flex items-center gap-4">
                <Flame className="text-red-500 w-8 h-8 animate-pulse" />
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white font-outfit">Sini masukin hantunya...</h2>
              </div>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-xs font-black text-red-500 uppercase tracking-widest px-1">Siapa Namanya?</label>
                  <input 
                    placeholder="Contoh: Pocong Kesasar..."
                    className="w-full bg-black border-2 border-red-900/40 rounded-xl p-5 focus:border-red-500 transition-colors text-white font-black text-lg placeholder:text-zinc-800"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-red-500 uppercase tracking-widest px-1">Dari Alam Mana?</label>
                  <input 
                    placeholder="Lubang Buaya, Kebun Pisang, dll..."
                    className="w-full bg-black border-2 border-red-900/40 rounded-xl p-5 focus:border-red-500 transition-colors text-white font-black text-lg placeholder:text-zinc-800"
                    value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-red-500 uppercase tracking-widest px-1">Kerjaannya Ngapain?</label>
                  <textarea 
                    placeholder="Suka gelantungan, suka minta kopi, dll..."
                    className="w-full bg-black border-2 border-red-900/40 rounded-xl p-5 focus:border-red-500 transition-colors h-36 text-white font-medium italic text-lg placeholder:text-zinc-800"
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-end gap-8 pt-4">
                  <button type="button" onClick={() => setIsAdding(false)} className="px-10 py-5 text-red-900 font-black tracking-widest hover:text-red-500 transition-colors uppercase text-xs">GAJADI AH, TAKUT</button>
                  <button type="submit" className="bg-red-700 hover:bg-red-600 text-white font-black py-5 px-14 rounded-2xl transition-all shadow-2xl uppercase tracking-tighter" disabled={isPending}>KURUNG HANTUNYA!</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-zinc-900/80 border-2 border-red-950/60 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-black/95 text-white text-xs uppercase tracking-[0.5em] font-black border-b-2 border-red-600/50">
                  <th className="p-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">ID_GHAIB</th>
                  <th className="p-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">SIAPA</th>
                  <th className="p-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">ASALNYA</th>
                  <th className="p-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-red-400">NGAPAIN AJA</th>
                  <th className="p-10 text-right text-white">EKSEKUSI</th>
                </tr>
              </thead>
              <tbody>
                {khodams.map(khodam => (
                  <tr key={khodam.id} className="border-t border-red-900/20 hover:bg-zinc-900/10 transition-all group">
                    <td className="p-10">
                       <div className="w-12 h-12 bg-black rounded-xl border-2 border-red-600 flex items-center justify-center text-white font-mono text-sm group-hover:border-white transition-colors shadow-inner">
                         #{khodam.id}
                       </div>
                    </td>
                    <td className="p-10">
                      {isEditing === khodam.id ? (
                        <input 
                          className="bg-black border-2 border-red-600 rounded-xl p-4 w-full text-white font-black"
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      ) : (
                        <span className="font-black text-2xl text-white group-hover:text-red-400 transition-colors uppercase tracking-tight font-outfit">{khodam.name}</span>
                      )}
                    </td>
                    <td className="p-10">
                      {isEditing === khodam.id ? (
                        <input 
                          className="bg-black border-2 border-red-600 rounded-xl p-4 w-full text-white"
                          value={formData.type || ""} onChange={e => setFormData({...formData, type: e.target.value})}
                        />
                      ) : (
                        <span className="bg-red-900/80 text-white px-5 py-2 rounded-full border border-red-500/50 tracking-widest text-[10px] font-black uppercase shadow-sm">{khodam.type || "POJOK KEBUN"}</span>
                      )}
                    </td>
                    <td className="p-10">
                      {isEditing === khodam.id ? (
                        <textarea 
                          className="bg-black border-2 border-red-600 rounded-xl p-4 w-full h-32 text-white italic"
                          value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                        />
                      ) : (
                        <p className="text-zinc-100 text-base italic line-clamp-2 max-w-lg group-hover:text-white transition-colors leading-relaxed font-outfit">
                          &quot;{khodam.description}&quot;
                        </p>
                      )}
                    </td>
                    <td className="p-10 text-right">
                      <div className="flex justify-end gap-5">
                         {isEditing === khodam.id ? (
                          <>
                            <button onClick={() => handleUpdate(khodam.id)} className="p-4 text-green-400 hover:bg-green-500/10 rounded-2xl transition-colors ring-2 ring-green-500/20 shadow-lg"><Save className="w-7 h-7" /></button>
                            <button onClick={() => setIsEditing(null)} className="p-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-colors ring-2 ring-red-500/20 shadow-lg"><X className="w-7 h-7" /></button>
                          </>
                         ) : (
                          <>
                            <button 
                              onClick={() => { setIsEditing(khodam.id); setFormData({ name: khodam.name, description: khodam.description, type: khodam.type || "" }); }} 
                              className="p-4 text-white hover:bg-red-600 rounded-2xl transition-all opacity-0 group-hover:opacity-100 shadow-2xl"
                            >
                              <Edit3 className="w-7 h-7" />
                            </button>
                            <button 
                              onClick={() => handleDelete(khodam.id)} 
                              className="p-4 text-white hover:bg-red-600 rounded-2xl transition-all opacity-0 group-hover:opacity-100 shadow-2xl"
                            >
                              <Trash2 className="w-7 h-7" />
                            </button>
                          </>
                         )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {khodams.length === 0 && (
              <div className="p-40 text-center text-white space-y-10">
                <Eye className="w-24 h-24 mx-auto animate-pulse text-red-500" />
                <div className="font-black uppercase tracking-[0.5em] text-sm">Gak Ada Hantu? Lagi Pada Mudik Kali...</div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="pt-20 text-center">
        <div className="bg-red-950/10 border border-red-900/10 p-6 rounded-3xl inline-flex items-center gap-4 max-w-sm mx-auto shadow-2xl backdrop-blur-xl text-center">
          <Ghost className="w-8 h-8 text-red-900" />
          <p className="text-[10px] text-white/80 font-black uppercase text-left leading-tight">
            Ati-ati nambahin hantu di sini, ntar rumah lu jadi rame beneran.
          </p>
        </div>
      </footer>
    </div>
  );
}
