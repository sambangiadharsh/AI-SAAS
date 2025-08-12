import React, { useState } from "react";
import { Sparkles, Edit, FileText } from "lucide-react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500–800 words)" },
    { length: 1200, text: "Medium (800–1200 words)" },
    { length: 1600, text: "Long (1200+ words)" }
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [topic, setTopic] = useState("");
  const [loading,setLoading]=useState(false);
  const [content,setContent]=useState('')

  const {getToken}=useAuth();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const prompt=`write an article about ${topic} with length ${selectedLength.text}`;
      const {data}=await axios.post('/api/ai/generate-article',{prompt,lenght:selectedLength},
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
      {/* Left Column - Form */}
      <form
        onSubmit={handleSubmit}
        className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <Sparkles className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">
            Article Configuration
          </h1>
        </div>

        {/* Topic Input */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Article Topic
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            placeholder="Enter your topic..."
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        {/* Length Selection */}
        <div>
          <p className="font-medium text-gray-700 mb-2">Article Length</p>
          <div className="flex gap-3">
            {articleLength.map((item, index) => (
              <span
                key={index}
                onClick={() => setSelectedLength(item)}
                className={`px-4 py-2 rounded-lg cursor-pointer border transition ${
                  selectedLength.length === item.length
                    ? "bg-blue-500 text-white border-blue-500 shadow"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
      type="submit"
      disabled={loading}
      className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full font-medium shadow disabled:opacity-70 disabled:cursor-not-allowed"
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
          Generating...
        </>
      ) : (
        <>
          <Edit size={18} />
          Generate Article
        </>
      )}
    </button>
      </form>

      {/* Right Column - Output */}
     {!content ? (
  <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
    <div className="flex items-center gap-3 border-b pb-3">
      <FileText className="text-green-500 w-6 h-6" />
      <h1 className="text-xl font-bold text-gray-800">
        Generated Article
      </h1>
    </div>

    <div className="mt-6">
      <div className="flex items-center gap-2 text-gray-500 bg-gray-100 p-4 rounded-lg">
        <Edit size={18} />
        <p>Enter a topic and click "Generate Article" to get started</p>
      </div>
    </div>
  </div>
) : (
  <div className="prose prose-lg mx-auto lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 overflow-auto">
    <div className="reset-tw"><ReactMarkdown >{content}</ReactMarkdown></div>
         
  </div>
)}
    </div>
  );
};

export default WriteArticle;
