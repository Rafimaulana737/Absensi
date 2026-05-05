import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  QrCode, 
  FilePieChart, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Ringkasan' },
    { id: 'students', icon: Users, label: 'Data Siswa' },
    { id: 'classes', icon: BookOpen, label: 'Data Kelas' },
    { id: 'qr-generate', icon: QrCode, label: 'Cetak QR Link' },
    { id: 'reports', icon: FilePieChart, label: 'Laporan' },
    { id: 'notifications', icon: Bell, label: 'Notifikasi' },
    { id: 'settings', icon: Settings, label: 'Pengaturan' },
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-slate-900 text-slate-400 transition-all duration-300 z-50 border-r border-slate-800 flex flex-col",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <QrCode className="text-blue-500 shrink-0" size={28} />
        {!collapsed && (
          <span className="ml-3 text-white font-bold text-lg tracking-tight overflow-hidden whitespace-nowrap">
            Presensi<span className="text-blue-500">Ku</span>
          </span>
        )}
      </div>

      {/* Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
              activeTab === item.id 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            <item.icon size={22} className="shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer / User */}
      <div className="p-4 border-t border-slate-800">
        {!collapsed && (
          <div className="mb-4 px-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logged in as</p>
            <p className="text-sm font-medium text-white truncate">Administrator SMK 1</p>
          </div>
        )}
        <button 
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="font-medium">Keluar</span>}
        </button>
      </div>
    </aside>
  );
}
