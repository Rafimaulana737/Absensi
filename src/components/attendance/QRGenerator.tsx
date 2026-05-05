import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, User } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRef } from 'react';

interface QRGeneratorProps {
  student: {
    id: string;
    name: string;
    classId: string;
    qrData: string;
  };
}

export function QRGenerator({ student }: QRGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto">
      <Card ref={cardRef} className="bg-white overflow-hidden border-2 border-slate-100 shadow-xl print:shadow-none print:border-slate-300">
        <div className="bg-blue-600 h-24 relative">
           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full border-4 border-white shadow-md">
             <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <User size={40} />
             </div>
           </div>
        </div>
        <CardContent className="pt-14 pb-8 text-center bg-white px-8">
           <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
           <p className="text-sm font-medium text-slate-500 mb-6">{student.classId}</p>
           
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 inline-block mb-6 shadow-inner">
             <QRCodeSVG 
               value={student.qrData} 
               size={160}
               level="H"
               includeMargin={true}
             />
           </div>

           <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">ID Siswa: {student.id}</div>
           
           <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
              <div className="h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex">
                <QrCode size={16} />
              </div>
              <span className="text-sm font-bold text-slate-900">PresensiKu</span>
           </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 print:hidden">
        <Button variant="outline" className="flex-1 gap-2" onClick={handlePrint}>
           <Printer size={18} />
           Cetak Kartu
        </Button>
        <Button className="flex-1 gap-2">
           <Download size={18} />
           Unduh PNG
        </Button>
      </div>
    </div>
  );
}

import { QrCode } from 'lucide-react';
