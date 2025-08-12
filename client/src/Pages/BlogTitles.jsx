import React, { useState } from "react";
import { Sparkles, Edit3, List, Folder } from "lucide-react";
import toast from 'react-hot-toast';
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const categories = [
    "Technology",
    "Health & Wellness",
    "Travel",
    "Business",
    "Lifestyle",
    "Food & Recipes",
    "Education",
    "Finance",
    "Entertainment",
  ];

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState(categories[0]);
  
  const [loading,setLoading]=useState(false);
  const [content,setContent]=useState('')
  const {getToken}=useAuth();
  const handleGenerate =async (e) => {
    e.preventDefault();

    try{
      setLoading(true);
      const prompt=`suggest blog titles with keyword ${keyword} with category ${category} `;
      const {data}=await axios.post('/api/ai/blog-title',{prompt},
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
        onSubmit={handleGenerate}
        className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <Sparkles className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Generate Blog Titles</h1>
        </div>

        {/* Keyword Input */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Blog Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
            placeholder="e.g. AI Tools, Digital Marketing..."
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Blog Category
          </label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
            <Folder className="text-gray-500 w-5 h-5" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
      type="submit"
      disabled={loading}
      className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full font-medium shadow"
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
          <Edit3 size={18} />
          Generate Article
        </>
      )}
    </button>
    
      </form>

      {/* Right Column - Output */}
      <div className="lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
  {/* Header */}
  <div className="flex items-center gap-3 border-b pb-3">
    <List className="text-green-500 w-6 h-6" />
    <h1 className="text-xl font-bold text-gray-800">Suggested Titles</h1>
  </div>

  {/* Content */}
  <div className="mt-6 space-y-3">
    {!content ? (
      <div className="flex items-center gap-2 text-gray-500 bg-gray-100 p-4 rounded-lg">
        <Edit3 size={18} />
        <p>Enter a keyword and select a category to see suggestions</p>
      </div>
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

export default BlogTitles;
