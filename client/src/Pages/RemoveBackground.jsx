import React, { useState } from "react";
import { Eraser, UploadCloud, Wand2, Image as ImageIcon, Download } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setContent("");
    }
  };

  const handleRemoveBackground = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/ai/remove-image-background", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Download handler
  const downloadImage = () => {
    if (!content) return;
    const link = document.createElement("a");
    link.href = content;
    link.download = "processed-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-[#F4F7FB] h-150">
      {/* Left Column - Upload */}
      <form
        onSubmit={handleRemoveBackground}
        className="lg:w-2/4 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-3">
          <Eraser className="text-red-500 w-6 h-6" />
          <h1 className="text-xl font-bold text-gray-800">Remove Background</h1>
        </div>

        {/* Upload Section */}
        <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition">
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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
          >
            Choose Image
          </label>
        </div>

        {/* Remove Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow"
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
              Remove Background
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

        <div className="mt-6 relative flex items-center justify-center min-h-[300px] bg-gray-100 rounded-lg border border-gray-200">
          {!content ? (
            <p className="text-gray-500 flex flex-col items-center">
              <ImageIcon size={40} className="mb-2 text-gray-400" />
              Upload an image and click <b>Remove Background</b> to see results
            </p>
          ) : (
            <>
              <img src={content} alt="Processed" className="max-h-[300px] w-full  object-contain" />
              <button
                onClick={downloadImage}
                className="absolute top-3 right-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow flex items-center gap-1"
                title="Download Image"
              >
                <Download size={16} />
                Download
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
