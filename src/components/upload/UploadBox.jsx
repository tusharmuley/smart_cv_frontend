import { useState } from "react";
import { uploadResume } from "../../services/resumeService";

function UploadBox({ setResumeText }) {

    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a PDF");
            return;
        }

        try {

            setLoading(true);

            const response = await uploadResume(file);

            setResumeText(
                response.data.resume_text
            );

        } catch (error) {

            console.log(error);

            alert("Upload Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-white p-6 rounded-lg shadow">

            <input

                type="file"

                accept=".pdf"

                onChange={(e) =>
                    setFile(e.target.files[0])
                }

            />

            <button

                onClick={handleUpload}

                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"

            >

                {

                    loading

                        ? "Uploading..."

                        : "Upload Resume"

                }

            </button>

        </div>

    );

}

export default UploadBox;