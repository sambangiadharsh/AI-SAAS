import React, { useState } from "react";
import { Scissors, UploadCloud, Image as ImageIcon, Wand2 } from "lucide-react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useAuth } from "@clerk/clerk-react";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;


const RemoveObject = () => {
  const [image, setImage] = useState(null);
  const [objectDescription, setObjectDescription] = useState("");
   
   const [loading,setLoading]=useState(false);
    const [content,setContent]=useState('')
    const {getToken}=useAuth();
  
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file); // store file object
    setContent(null);
  }
};

  const handleRemoveObject = async (e) => {
    e.preventDefault();
   try{
      setLoading(true);
      const formData=new FormData()
      formData.append('image',image);
      formData.append('object',objectDescription);
      
      const {data}=await axios.post('/api/ai/remove-object',formData,
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
        onSubmit={handleRemoveObject}
        className="lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <Scissors className="text-orange-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Remove Object</h1>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-orange-400 transition">
          <UploadCloud className="w-10 h-10 text-gray-400" />
          <p className="text-gray-600">
            Drag & drop your image here, or click to select
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer"
          >
            Choose Image
          </label>
        </div>

       

        {/* Object Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Describe the object to remove:
          </label>
          <input
            type="text"
            value={objectDescription}
            onChange={(e) => setObjectDescription(e.target.value)}
            placeholder='e.g. "Remove the logo in the top-right corner"'
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Remove Button */}
        
        <button
      type="submit"
      disabled={loading}
      className="w-full px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium shadow flex items-center justify-center gap-2"
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
          Removing...
        </>
      ) : (
        <>
          <Wand2 size={18} />
          Remove Object
        </>
      )}
    </button>
      </form>

      {/* Right Column - Result */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center gap-3 border-b pb-3">
          <ImageIcon className="text-blue-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Processed Image</h1>
        </div>

        <div className="mt-6 flex items-center justify-center min-h-[300px] bg-gray-100 rounded-lg border border-gray-200">
          {!content ? (
            <p className="text-gray-500 flex flex-col items-center">
              <ImageIcon size={40} className="mb-2 text-gray-400" />
              Upload an image and describe the object you want removed.
            </p>
          ) : (
            <div>
               <img src={content} className="w-full h-full"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;
