import { useState } from 'react';
import { FileText, Download, Calendar as CalendarIcon, Filter, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/utils';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function Reports() {
  const [dateRange, setDateRange] = useState('Mei 2026');

  const handleExportPDF = () => {
    const doc = new jsPDF() as any;
    
    doc.setFontSize(22);
    doc.text('Laporan Absensi Siswa', 14, 20);
    doc.setFontSize(12);
    doc.text(`Periode: ${dateRange}`, 14, 30);
    doc.text(`Sekolah: SMK Negeri 1 Jakarta`, 14, 37);

    const data = [
      ['01/05/2026', 'X-IPA-1', 'Budi Santoso', '07:05', 'Hadir'],
      ['01/05/2026', 'X-IPA-1', 'Siti Aminah', '07:12', 'Hadir'],
      ['01/05/2026', 'X-IPA-1', 'Rahmat Hidayat', '07:45', 'Terlambat'],
      ['02/05/2026', 'X-IPA-1', 'Budi Santoso', '07:02', 'Hadir'],
      ['02/05/2026', 'X-IPA-1', 'Lia Kusuma', '07:08', 'Hadir'],
    ];

    doc.autoTable({
      head: [['Tanggal', 'Kelas', 'Nama Siswa', 'Waktu', 'Status']],
      body: data,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235] }, // Blue-600
    });

    doc.save(`laporan-absensi-${dateRange.replace(' ', '-')}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Laporan Absensi</h1>
          <p className="text-slate-500">Kelola dan unduh data kehadiran sekolah secara berkala.</p>
        </div>
        <Button size="lg" className="gap-2" onClick={handleExportPDF}>
          <Download size={20} />
          Ekspor ke PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
             <CardTitle className="text-lg flex items-center gap-2">
                <Filter size={18} />
                Filter Laporan
             </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm font-medium">Rentang Waktu</label>
                <select className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-blue-500 bg-white">
                   <option>Harian (Hari Ini)</option>
                   <option selected>Bulanan (Mei 2026)</option>
                   <option>Semester Ganjil 2025/2026</option>
                   <option>Kustom Tanggal...</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Jenjang Kelas</label>
                <select className="w-full h-10 rounded-md border border-slate-200 px-3 text-sm focus:ring-2 focus:ring-blue-500 bg-white">
                   <option>Semua Kelas</option>
                   <option>Kelas X</option>
                   <option>Kelas XI</option>
                   <option>Kelas XII</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Status Kehadiran</label>
                <div className="space-y-2 pt-1">
                   {['Hadir', 'Terlambat', 'Alpa', 'Izin'].map((status) => (
                     <label key={status} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm">{status}</span>
                     </label>
                   ))}
                </div>
             </div>
             <Button variant="outline" className="w-full">Terapkan Filter</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pratinjau Data</CardTitle>
            <div className="relative w-48">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <Input placeholder="Cari nama..." className="pl-9 h-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0 border-t">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Nama Siswa</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { date: '01/05/2026', name: 'Budi Santoso', status: 'Hadir' },
                    { date: '01/05/2026', name: 'Siti Aminah', status: 'Hadir' },
                    { date: '01/05/2026', name: 'Rahmat Hidayat', status: 'Terlambat' },
                    { date: '02/05/2026', name: 'Budi Santoso', status: 'Hadir' },
                    { date: '02/05/2026', name: 'Lia Kusuma', status: 'Izin' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">{row.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="px-6 py-4">
                         <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold",
                           row.status === 'Hadir' ? 'bg-green-100 text-green-700' : 
                           row.status === 'Terlambat' ? 'bg-amber-100 text-amber-700' :
                           'bg-red-100 text-red-700'
                         )}>
                           {row.status}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-blue-600 text-white border-0">
             <CardContent className="p-6">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Total Kehadiran</p>
                <div className="flex items-end gap-2">
                   <h3 className="text-3xl font-bold">92%</h3>
                   <span className="text-xs mb-1 text-blue-200">Mei 2026</span>
                </div>
             </CardContent>
          </Card>
          <Card>
             <CardContent className="p-6">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Paling Rajin</p>
                <h3 className="text-lg font-bold text-slate-900">Budi Santoso</h3>
                <p className="text-xs text-green-600 font-medium">100% Kehadiran</p>
             </CardContent>
          </Card>
          <Card>
             <CardContent className="p-6">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Paling Banyak Terlambat</p>
                <h3 className="text-lg font-bold text-slate-900">Rahmat Hidayat</h3>
                <p className="text-xs text-amber-600 font-medium">4x Terlambat</p>
             </CardContent>
          </Card>
          <Card>
             <CardContent className="p-6">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Rata-rata Terlambat</p>
                <h3 className="text-3xl font-bold text-slate-900">4%</h3>
             </CardContent>
          </Card>
      </div>
    </div>
  );
}
