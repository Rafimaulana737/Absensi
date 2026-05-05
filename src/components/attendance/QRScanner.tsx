import * as React from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QrCode, Camera, ShieldAlert } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface QRScannerProps {
  onResult: (result: string) => void;
}

export function QRScanner({ onResult }: QRScannerProps) {
  const scannerRef = React.useRef<Html5QrcodeScanner | null>(null);

  React.useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scannerRef.current.render(
      (decodedText) => {
        onResult(decodedText);
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <CardHeader className="bg-slate-900 text-white">
        <div className="flex items-center gap-2">
           <Camera size={20} />
           <CardTitle className="text-lg">Scanner Absensi</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div id="reader" className="w-full"></div>
        <div className="p-6 bg-slate-50 border-t">
           <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                 <QrCode size={20} />
              </div>
              <div>
                 <p className="text-sm font-semibold text-slate-900">Arahkan Kamera ke QR Code</p>
                 <p className="text-xs text-slate-500 mt-1">Pastikan pencahayaan cukup dan QR Code terlihat jelas di dalam kotak.</p>
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
