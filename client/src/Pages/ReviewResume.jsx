import React, { useState } from "react";
import { FileText, UploadCloud, ClipboardCheck, Wand2 } from "lucide-react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
const ResumeReview = () => {
  const [resumeFile, setResumeFile] = useState(null);
  
    const [loading,setLoading]=useState(false);
    const [content,setContent]=useState('')
    const {getToken}=useAuth();
 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setContent("");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const formData=new FormData()
      formData.append('review',resumeFile);
      
      
      const {data}=await axios.post('/api/ai/resume-review',formData,
        {headers:{Authorization:`Bearer ${await getToken()}`}}
      )
     if(data.success){
      setContent(data.content);
     }
     else{
      toast.error(data.message);
     }
    }
    catch(error){
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-[#F4F7FB] h-150">
      {/* Left Column - Upload & Form */}
      <form
        onSubmit={handleReview}
        className="lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <FileText className="text-green-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Resume Review</h1>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition">
          <UploadCloud className="w-10 h-10 text-gray-400" />
          <p className="text-gray-600">
            Drag & drop your resume here, or click to select (PDF/DOCX)
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resumeInput"
          />
          <label
            htmlFor="resumeInput"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            Choose Resume
          </label>
        </div>

        {/* File Name */}
        {resumeFile && (
          <p className="text-sm text-gray-500 mt-2">Uploaded: {resumeFile.name}</p>
        )}

        {/* Review Button */}
       
         <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium shadow flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Reviewing...
                </>
              ) : (
                <>
                  <ClipboardCheck className="w-5 h-5" />
                  Review Resume
                </>
              )}
            </button>
      </form>

      {/* Right Column - Review Result */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3 border-b pb-3">
          <ClipboardCheck className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Review Suggestions</h1>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg min-h-[300px] border border-gray-200">
          {!content? (
             <p className="text-gray-500">
              Upload your resume and click "Review Resume" to get suggestions.
            </p>
          ) : (
          <div className="overflow-auto max-h-96 p-4 bg-gray-50 rounded-lg">
            <div className="reset-tw"><ReactMarkdown >{content}</ReactMarkdown></div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;
