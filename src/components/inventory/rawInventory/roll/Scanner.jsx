import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import jsQR from "jsqr";
import toast from "react-hot-toast";
import scannerPng from "../../../../../public/barcode-scanner.png"

const QRCodeScanner = ({setData}) => {
  const [scan, setScan] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleScan = (data) => {
    if (data && data[0] && data[0].rawValue) {
      const rawValue = data[0].rawValue;
      setScannedData(rawValue);
      setScan(false);
      setIsFullScreen(false);

      const [rollNumber, sortNumber, meter, grade] = rawValue.split('#');

      setData((prevData) => ({
        ...prevData,
        extra_fields: {
          roll_number: rollNumber || "",
          sort_number: sortNumber || "",
          meter: meter || "",
          grade: grade || "",
        },
      }));

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
            title="Scan QR Code"
            >
          <img src={scannerPng} alt="" className="size-6"/>
          </button>
        </div>
      )}

      {scan && (
        <div
          className={`fixed inset-0 z-50 bg-black flex justify-center items-center ${
            isFullScreen ? "w-screen h-screen" : "w-full h-64"
          }`}
        >
          <div className="w-full h-[390px] flex justify-center items-center">
            {/* Circular Scanner UI */}
            {/* <div
              className="absolute border-4 border-white rounded-full"
              style={{
                width: "80vw",
                height: "80vw", 
                maxWidth: "400px", 
                maxHeight: "400px", 
              }}
            /> */}

            <Scanner
              onScan={handleScan}
              onError={handleError}
              className="w-full h-full"
            />

            <div className="absolute bottom-16 flex space-x-6">
              {" "}
              <button
                className="bg-gray-800 text-white rounded-full p-3"
                onClick={() => document.getElementById("galleryInput").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
            </div>

            <input
              type="file"
              id="galleryInput"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <button
              onClick={() => setScan(false)}
              className="absolute top-8 right-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
