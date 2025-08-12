import React, { useState } from "react";
import { Sparkles, Image as ImageIcon, Wand2 } from "lucide-react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useAuth } from "@clerk/clerk-react";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
import ReactMarkdown from "react-markdown";
const GenerateImages = () => {
  const styles = [
    "Photorealistic",
    "Cartoon",
    "3D Render",
    "Watercolor",
    "Oil Painting",
    "Pixel Art",
    "Gibili",
    "Animated"
  ];

  const [input, setInput] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [loading,setLoading]=useState(false);
  const [content,setContent]=useState('')
  const {getToken}=useAuth();
  const handleGenerate = async(e) => {
    e.preventDefault();
     try{
      setLoading(true);
      const prompt=`Generate image of ${input} with ${style}} `;
      const {data}=await axios.post('/api/ai/generate-image',{prompt},
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
        className="lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <Sparkles className="text-purple-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Generate Images</h1>
        </div>

        {/* Prompt Input */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Image Prompt
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. A futuristic city skyline at sunset"
            rows={3}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition resize-none"
          />
        </div>

        {/* Style Select */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Image Style
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition"
          >
            {styles.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Generate Button */}
        

         <button
      type="submit"
      disabled={loading}
      className="flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full font-medium shadow"
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
          <Wand2 size={18} />
          Generate Images
        </>
      )}
    </button>
      </form>

      {/* Right Column - Image Results */}
      

<div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
  <div className="flex items-center gap-3 border-b pb-3">
    <ImageIcon className="text-blue-500 w-6 h-6" />
    <h1 className="text-xl font-bold text-gray-800">Generated Images</h1>
  </div>

  {/* Image Grid */}
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
    {!content ? (
      <div className="col-span-full flex flex-col items-center justify-center text-gray-500 bg-gray-100 rounded-lg p-6">
        <ImageIcon size={40} className="mb-2 text-gray-400" />
        <p>Enter a prompt and choose a style to generate images</p>
      </div>
    ) : (
      <div>
        <img src={content} className='w-full h-full'/>
      </div>
    )}
  </div>
  </div>

    </div>
  );
};

export default GenerateImages;
