import { useState } from "react";


function UploadBox({ onUpload, loading }) {

    const [file, setFile] = useState(null);

    const handleClick = () => {

        if (!file) {
            alert("Please select a PDF");
            return;
        }

        onUpload(file);

    };

    return (

        <div className="bg-white p-6 rounded-lg shadow">

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                onClick={handleClick}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                {
                    loading
                        ? "Analyzing..."
                        : "Upload Resume"
                }
            </button>

        </div>

    );

}

export default UploadBox;