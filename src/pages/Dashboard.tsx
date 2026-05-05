import { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Overview } from '../components/dashboard/Overview';
import { Reports } from './Reports';
import { QRScanner } from '../components/attendance/QRScanner';
import { QRGenerator } from '../components/attendance/QRGenerator';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, User, QrCode, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { attendanceService } from '../services/attendanceService';

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showScanner, setShowScanner] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <Settings size={24} />
               </div>
               <div>
                  <h2 className="text-2xl font-bold text-slate-900">Pengaturan Akun</h2>
                  <p className="text-slate-500">Kelola profil dan preferensi keamanan Anda.</p>
               </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profil Sekolah</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm font-medium">Nama Sekolah</label>
                       <Input defaultValue="SMK Negeri 1 Jakarta" disabled />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-medium">Email Administrator</label>
                       <Input defaultValue="admin@smkn1.sch.id" disabled />
                    </div>
                 </div>
                 <Button variant="outline">Simpan Perubahan</Button>
              </CardContent>
            </Card>

            <Card className="border-red-100 bg-red-50/30">
              <CardHeader>
                <CardTitle className="text-lg text-red-600">Zona Bahaya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <p className="text-sm text-slate-600">
                   Menghapus akun akan menghilangkan semua data sekolah, riwayat absensi, dan akses seluruh guru/siswa secara permanen. Tindakan ini tidak dapat dibatalkan.
                 </p>
                 <Button 
                   variant="outline" 
                   className="text-red-600 border-red-200 hover:bg-red-50"
                   onClick={async () => {
                     if (confirm("APAKAH ANDA YAKIN? Semua data sekolah akan terhapus selamanya.")) {
                       try {
                         const { deleteCurrentUser } = await import('../lib/firebase');
                         await deleteCurrentUser();
                         onLogout();
                       } catch (err: any) {
                         alert(err.message);
                       }
                     }
                   }}
                 >
                   Hapus Akun & Data Sekolah
                 </Button>
              </CardContent>
            </Card>
          </div>
        );
      case 'qr-generate':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Cetak Kartu Siswa</h2>
              <p className="text-slate-500">Pilih siswa atau masukkan data untuk membuat kartu QR.</p>
            </div>
            <QRGenerator student={{
              id: '2026-001',
              name: 'Budi Santoso',
              classId: 'XII-IPA-1',
              qrData: 'STUDENT_2026_001'
            }} />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
             <div className="p-4 bg-slate-100 rounded-full mb-4">
                <Search size={48} />
             </div>
             <p className="text-lg font-medium italic">Fitur "{activeTab}" sedang dalam pengembangan.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className="pl-20 transition-all duration-300 md:pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
           <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                placeholder="Cari siswa, kelas, atau fitur..." 
                className="w-full h-10 pl-10 pr-4 bg-slate-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
           </div>

           <div className="flex items-center gap-4 ml-auto">
              <Button size="sm" onClick={() => setShowScanner(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
                 <QrCode size={18} />
                 Scan Absensi
              </Button>
              
              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                 <User size={20} className="text-slate-500" />
              </div>
           </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* QR Scanner Modal Overlay */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg"
            >
              <button 
                onClick={() => setShowScanner(false)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 font-medium hover:text-blue-400"
              >
                Tutup Scanner
              </button>
              <QRScanner onResult={async (res) => {
                const [type, studentId] = res.split('_'); // Standard: IN_2026-001
                if (studentId) {
                   await attendanceService.markAttendance(studentId, `Siswa ${studentId}`, 'XII-IPA-1', type === 'OUT' ? 'OUT' : 'IN');
                   alert(`Absensi ${type || 'MASUK'} Berhasil: ${studentId}`);
                } else {
                   // Fallback for simple ID
                   await attendanceService.markAttendance(res, `Siswa ${res}`, 'XII-IPA-1', 'IN');
                   alert(`Absensi MASUK Berhasil: ${res}`);
                }
                setShowScanner(false);
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
