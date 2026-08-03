import apiClient from "../api/axios";

export const uploadResume = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
        "/upload/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const analyzeResume = async (resumeText, jobDescription) => {

    const response = await apiClient.post(
        "/analyze/",
        {
            resume_text: resumeText,
            job_description: jobDescription,
        }
    );

    return response.data;
};