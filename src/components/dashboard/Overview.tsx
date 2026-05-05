import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, UserCheck, UserX, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { attendanceService } from '../../services/attendanceService';

export function Overview() {
  const [recentRecords, setRecentRecords] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = attendanceService.listenToRecentAttendance((records) => {
      setRecentRecords(records);
    });
    return () => unsubscribe();
  }, []);

  const stats = [
    { label: 'Total Siswa', value: '1,280', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+2.1%' },
    { label: 'Hadir Hari Ini', value: recentRecords.length.toString(), icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50', change: '90%' },
    { label: 'Terlambat', value: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', change: '3.2%' },
    { label: 'Tanpa Keterangan', value: '86', icon: UserX, color: 'text-red-600', bg: 'bg-red-50', change: '6.7%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500">Pantau kehadiran siswa hari ini, {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Refresh Data</Button>
          <Button>Download Laporan Harian</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", stat.bg)}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                  <span className={cn("text-xs font-bold px-2 py-1 rounded-full", 
                    stat.change.startsWith('+') || stat.change.endsWith('%') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                  )}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Attendance Feed */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
            <CardTitle className="text-lg">Daftar Kehadiran Terbaru</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">Lihat Semua</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Siswa</th>
                    <th className="px-6 py-3">Kelas</th>
                    <th className="px-6 py-3">Waktu</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentRecords.length > 0 ? recentRecords.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{row.studentName}</td>
                      <td className="px-6 py-4 text-slate-600">{row.classId}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {row.timestamp?.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold",
                          row.status === 'PRESENT' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        )}>
                          {row.status === 'PRESENT' ? 'Hadir' : row.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">Belum ada data absensi hari ini.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart (Mock with CSS) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kehadiran per Jenjang</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6 pt-4">
                {[
                  { label: 'Kelas X', val: 92, color: 'bg-blue-600' },
                  { label: 'Kelas XI', val: 88, color: 'bg-indigo-600' },
                  { label: 'Kelas XII', val: 95, color: 'bg-purple-600' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-slate-700">{item.label}</span>
                      <span className="text-slate-500">{item.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={cn("h-full rounded-full", item.color)} 
                      />
                    </div>
                  </div>
                ))}
             </div>

             <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Tren Kehadiran</p>
                  <p className="text-sm font-bold text-slate-900">Naik 4% dari kemarin</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
