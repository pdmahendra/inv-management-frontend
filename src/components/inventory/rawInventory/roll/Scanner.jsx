import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRCodeScanner = () => {
  const [scan, setScan] = useState(false);
  const [scannedData, setScannedData] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScannedData(data);
      console.log("Scanned Data:", data);
      setScan(false);
    }
  };

  const handleError = (err) => {
    console.error("Scanner Error:", err);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setScan(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Scan QR Code
      </button>

      {scan && (
        <Scanner
          onScan={handleScan}
          onError={handleError}
          className="w-full h-64"
        />
      )}

      {scannedData && (
        <div className="mt-4 p-4 border bg-gray-100">
          <h3>Scanned Data:</h3>
          <p>{scannedData}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
