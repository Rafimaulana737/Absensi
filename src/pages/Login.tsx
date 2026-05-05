import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Mail, Lock, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { loginWithGoogle } from '../lib/firebase';

export default function Login({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate email login
    setTimeout(() => {
      setLoading(false);
      setError("Login email saat ini dinonaktifkan. Silakan gunakan Google Login.");
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      // App side effect (onAuthStateChanged) will handle redirection
    } catch (err: any) {
      setError(err.message || "Gagal masuk dengan Google");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: Form */}
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-24 bg-white relative">
        <button 
           onClick={onBack}
           className="absolute top-8 left-8 text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
        >
          <ArrowRight className="rotate-180" size={16} />
          Kembali ke Beranda
        </button>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-blue-500/20 shadow-lg mb-6">
              <QrCode size={28} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Selamat Datang</h1>
            <p className="text-slate-500">Masuk ke dashboard PresensiKu Anda</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 flex items-start gap-3 text-red-600 text-sm"
            >
              <AlertCircle className="shrink-0" size={18} />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Sekolah</label>
              <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <Input 
                   type="email" 
                   placeholder="admin@sekolah.sch.id" 
                   className="pl-10"
                   style={{ fontFamily: 'Arial' }}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">Kata Sandi</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Lupa sandi?</a>
              </div>
              <div className="relative">
                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <Input 
                   type="password" 
                   placeholder="••••••••" 
                   className="pl-10"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? (
                 <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Masuk ke Sistem"
              )}
            </Button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-500">Atau masuk dengan</span>
            </div>
          </div>

          <div className="mt-8">
            <Button variant="outline" className="w-full gap-2 h-12" onClick={handleGoogleLogin} disabled={loading}>
              <Chrome size={20} />
              Google Workspace Sekolah
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Belum punya akun?{' '}
            <a href="#" className="font-semibold text-blue-600 hover:underline">Hubungi Tim Marketing</a>
          </p>
        </div>
      </div>

      {/* Right side: Image/Graphic */}
      <div className="hidden lg:flex bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 max-w-lg text-center">
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5 }}
             className="mb-8"
           >
             <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-600/40">
                <QrCode size={48} />
             </div>
           </motion.div>
           
           <h2 className="text-4xl font-bold text-white mb-6">Membangun Kedisiplinan Unggul Sejak Dini</h2>
           <p className="text-lg text-slate-300">
             "PresensiKu membantu kami mendigitalisasi seluruh ekosistem sekolah dan memberikan rasa aman bagi para orang tua."
           </p>
           
           <div className="mt-12 flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">
                      User
                   </div>
                 ))}
              </div>
              <p className="text-sm text-slate-400">Bergabunglah dengan 500+ sekolah terbaik</p>
           </div>
        </div>

        {/* Floating cards for complex effect */}
        <motion.div 
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-20 right-20 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 hidden xl:block"
        >
           <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                 <div className="h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div>
                 <p className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Latest Entry</p>
                 <p className="text-xs text-white">Siswa: Budi Santoso</p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
