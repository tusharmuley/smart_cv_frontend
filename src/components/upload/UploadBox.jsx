import { useState, useRef } from "react";
import { HiOutlineArrowUp } from "react-icons/hi";

function UploadBox({ onUpload, loading }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (!file) {
            alert("Please select a PDF");
            return;
        }
        onUpload(file);
    };

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
            setFile(droppedFile);
        } else {
            alert("Please select a PDF file");
        }
    };

    return (
        <div className="space-y-3">
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed border-slate-300 hover:border-indigo-600 bg-white hover:bg-indigo-50 rounded-xl px-6 py-8 text-center cursor-pointer transition-all duration-200"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                {file ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                        <span className="text-sm font-semibold text-slate-900 truncate">{file.name}</span>
                    </div>
                ) : (
                    <div>
                        <HiOutlineArrowUp className="w-5 h-5 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-slate-900">
                            Drop your PDF here
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            or click to browse
                        </p>
                    </div>
                )}
            </div>

            <button
                onClick={handleClick}
                disabled={loading}
                className="w-full px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-indigo-600/40"
            >
                {loading ? "Analyzing..." : "Upload Resume"}
            </button>
        </div>
    );
}

export default UploadBox;