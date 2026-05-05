import { motion } from 'motion/react';
import { QrCode, ShieldCheck, Zap, BarChart3, Bell, Smartphone, Users, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Landing({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
              Absensi Modern untuk <br />
              <span className="text-blue-600 italic font-serif">Sekolah Anda</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10">
              Ubah proses absensi manual menjadi digital dengan teknologi QR Code yang cepat, aman, dan terintegrasi secara real-time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10" onClick={onLogin}>
                Daftar Sekolah Sekarang
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10">
                Lihat Demo
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-2"
          >
             <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent" />
                <div className="flex items-center gap-4 text-slate-400">
                    <Smartphone size={48} className="animate-bounce" />
                    <QrCode size={48} className="animate-pulse" />
                </div>
                <div className="absolute bottom-8 left-8 p-4 bg-white rounded-lg shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-slate-700">Real-time sync active</span>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Mengapa Memilih PresensiKu?</h2>
            <p className="mt-4 text-lg text-slate-600">Teknologi yang memudahkan administrasi sekolah dan memantau siswa.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: QrCode, title: "QR Scan Cepat", desc: "Absensi hanya butuh waktu kurang dari 2 detik per siswa." },
              { icon: Bell, title: "Notifikasi Real-time", desc: "Orang tua mandapat info saat anak memasuki gerbang sekolah." },
              { icon: BarChart3, title: "Laporan Otomatis", desc: "Unduh laporan absensi harian, mingguan, atau bulanan." },
              { icon: ShieldCheck, title: "Data Aman", desc: "Database terenkripsi dan terproteksi untuk privasi data." },
              { icon: Smartphone, title: "Akses Mobile", desc: "Akses mudah melalui browser handphone atau desktop." },
              { icon: Users, title: "Multi-Role", desc: "Dashboard khusus untuk Admin, Guru, dan Orang Tua." },
              { icon: Zap, title: "Performa Tinggi", desc: "Sistem ringan dan responsif untuk sekolah besar sekalipun." },
              { icon: FileText, title: "Rekap Digital", desc: "Hapus tumpukan kertas dengan rekap absensi digital." }
            ].map((f, i) => (
              <motion.div key={i} variants={item}>
                <Card className="h-full hover:border-blue-200 hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <f.icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-slate-600">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100 italic">Sekolah Terdaftar</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-100 italic">Siswa Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100 italic">Uptime Server</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 italic">Dukungan Teknis</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <QrCode size={24} className="text-white" />
            <span className="text-xl font-bold text-white">PresensiKu</span>
          </div>
          <div className="text-sm">
            © 2026 PresensiKu. Dibuat dengan dedikasi untuk pendidikan Indonesia.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
