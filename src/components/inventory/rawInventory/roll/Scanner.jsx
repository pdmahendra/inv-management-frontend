import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import jsQR from "jsqr";
import toast from "react-hot-toast";

const QRCodeScanner = () => {
  const [scan, setScan] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleScan = (data) => {
    if (data && data[0] && data[0].rawValue) {
      const rawValue = data[0].rawValue;
      setScannedData(rawValue);
      alert("Scanned Data: " + rawValue);
      toast.success(rawValue);
      setScan(false);
      setIsFullScreen(false);
    } else {
      alert("No QR code detected or invalid data format");
    }
  };

  const handleError = (err) => {
    console.error("Scanner Error:", err);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        const img = new Image();
        img.src = imageData;

        img.onload = () => {
          const maxCanvasSize = 500;
          const scaleFactor = Math.min(
            maxCanvasSize / img.width,
            maxCanvasSize / img.height,
            1
          );

          const canvas = document.createElement("canvas");
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;
          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          if (code) {
            setScannedData(code.data);
            console.log("QR Code detected:", code.data);
            setScan(false);
            setIsFullScreen(false);
          } else {
            console.error("No QR code found in the image");
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!scan && (
        <div>
          <button
            onClick={() => {
              setScan(true);
              setIsFullScreen(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Scan QR Code
          </button>
        </div>
      )}

      {scan && (
        <div
          className={`fixed inset-0 z-50 bg-black flex justify-center items-center ${
            isFullScreen ? "w-screen h-screen" : "w-full h-64"
          }`}
        >
          <div className="relative w-full h-full flex justify-center items-center">
            {/* Circular Scanner UI */}
            <div
              className="absolute border-4 border-white rounded-full"
              style={{
                width: "80vw", // Make the scanner border responsive to viewport width
                height: "80vw", // Make the scanner border circular and responsive
                maxWidth: "400px", // Limit maximum width
                maxHeight: "400px", // Limit maximum height
              }}
            />

            {/* QR Scanner */}
            <Scanner
              onScan={handleScan}
              onError={handleError}
              className="w-full h-full"
            />

            {/* Flash/Torch and Gallery Buttons */}
            <div className="absolute bottom-8 flex space-x-6"> {/* Adjusted bottom positioning for visibility */}
              <button
                className="bg-gray-800 text-white rounded-full p-3"
                onClick={() => document.getElementById("galleryInput").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26L12 13l1.11-.74L21 8m0 0v8.6c0 .896-1.078 1.34-1.707.707L12 9l-7.293 7.307c-.63.63-1.707.188-1.707-.707V8m0 0L12 3l9 5z"
                  />
                </svg>
              </button>

              <button className="bg-gray-800 text-white rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
            </div>

            {/* Hidden file input for selecting image from gallery */}
            <input
              type="file"
              id="galleryInput"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Close Button */}
            <button
              onClick={() => setScan(false)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Display scanned data */}
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
