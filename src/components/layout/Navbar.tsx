import { LogIn, QrCode, ClipboardCheck, BarChart3, UserCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onLoginClick: () => void;
  userRole?: string | null;
}

export function Navbar({ onLoginClick, userRole }: NavbarProps) {
  return (
    <nav className="fixed top-0 z-50 w-full border-bottom border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-blue-500/20 shadow-lg">
            <QrCode size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Presensi<span className="text-blue-600">Ku</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Fitur</a>
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Tentang</a>
          <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Hubungi</a>
        </div>

        <div className="flex items-center gap-4">
          {userRole ? (
             <Button variant="ghost" className="gap-2">
                <UserCircle size={20} />
                <span>Dashboard</span>
             </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={onLoginClick} className="hidden sm:flex">Masuk</Button>
              <Button onClick={onLoginClick} className="gap-2">
                <LogIn size={18} />
                <span>Mulai Sekarang</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
