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
  Sparkles,
  LayoutDashboard
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
    if (window.confirm("Yakin ingin menghapus Khodam ini?")) {
      startTransition(async () => {
        await deleteKhodam(id);
        fetchKhodams();
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 space-y-12 max-w-6xl mx-auto">
      <header className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-md sticky top-4 z-20">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:bg-zinc-800 p-2 rounded-xl transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-black font-outfit uppercase">Khodam Dashboard</h1>
          </div>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ name: "", description: "", type: "" }); }}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)]"
        >
          <Plus className="w-5 h-5" /> TAMBAH KHODAM
        </button>
      </header>

      <main className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-zinc-900 border-2 border-purple-500/50 p-8 rounded-3xl shadow-2xl space-y-6"
            >
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="text-purple-400" /> DAFTARKAN KHODAM BARU
              </h2>
              <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input 
                  placeholder="Nama Khodam"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 focus:border-purple-500 transition-colors"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input 
                  placeholder="Tipe (cth: Shadow, Guardian)"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 focus:border-purple-500 transition-colors"
                  value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
                />
                <textarea 
                  placeholder="Deskripsi Singkat"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 md:col-span-3 focus:border-purple-500 transition-colors h-24"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
                <div className="md:col-span-3 flex justify-end gap-4">
                  <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-zinc-500 font-bold hover:text-zinc-300 transition-colors">BATAL</button>
                  <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg" disabled={isPending}>SIMPAN</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 text-zinc-500 text-xs uppercase tracking-widest font-black">
                <th className="p-6">ID</th>
                <th className="p-6">Khodam</th>
                <th className="p-6">Tipe</th>
                <th className="p-6">Deskripsi</th>
                <th className="p-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {khodams.map(khodam => (
                <tr key={khodam.id} className="border-t border-zinc-900 hover:bg-zinc-900/20 transition-colors group">
                  <td className="p-6 text-zinc-600 font-mono text-sm">#{khodam.id}</td>
                  <td className="p-6">
                    {isEditing === khodam.id ? (
                      <input 
                        className="bg-zinc-950 border border-zinc-700 rounded p-2 w-full"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    ) : (
                      <span className="font-bold text-zinc-200 group-hover:text-white transition-colors">{khodam.name}</span>
                    )}
                  </td>
                  <td className="p-6">
                    {isEditing === khodam.id ? (
                      <input 
                        className="bg-zinc-950 border border-zinc-700 rounded p-2 w-full"
                        value={formData.type || ""} onChange={e => setFormData({...formData, type: e.target.value})}
                      />
                    ) : (
                      <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-full text-zinc-500 uppercase font-black tracking-widest">{khodam.type || "N/A"}</span>
                    )}
                  </td>
                  <td className="p-6">
                    {isEditing === khodam.id ? (
                      <textarea 
                        className="bg-zinc-950 border border-zinc-700 rounded p-2 w-full h-20"
                        value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                    ) : (
                      <p className="text-zinc-500 text-sm italic line-clamp-1">{khodam.description}</p>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                       {isEditing === khodam.id ? (
                        <>
                          <button onClick={() => handleUpdate(khodam.id)} className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"><Save className="w-5 h-5" /></button>
                          <button onClick={() => setIsEditing(null)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
                        </>
                       ) : (
                        <>
                          <button onClick={() => { setIsEditing(khodam.id); setFormData({ name: khodam.name, description: khodam.description, type: khodam.type || "" }); }} className="p-2 text-zinc-600 hover:text-blue-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Edit3 className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(khodam.id)} className="p-2 text-zinc-600 hover:text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></button>
                        </>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {khodams.length === 0 && (
            <div className="p-20 text-center text-zinc-700 italic">Database khodam kosong. Sila tambahkan yang baru.</div>
          )}
        </div>
      </main>
    </div>
  );
}
