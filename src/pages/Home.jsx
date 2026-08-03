import { useState } from "react";
import UploadBox from "../components/upload/UploadBox";

function Home() {

    const [resumeText, setResumeText] = useState("");

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold text-center mb-10">
                SmartCV 🚀
            </h1>

            <UploadBox
                setResumeText={setResumeText}
            />

            {
                resumeText && (

                    <div className="mt-10 bg-white rounded-lg p-6 shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Extracted Resume
                        </h2>

                        <pre className="whitespace-pre-wrap text-sm">
                            {resumeText}
                        </pre>

                    </div>

                )
            }

        </div>

    );
}

export default Home;