import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-gradient-to-r from-white to-gray-50 rounded-xl mb-3 shadow-sm p-5 cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-800 truncate max-w-[500px]">
            {item.prompt}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100 hover:bg-blue-100 transition"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {item.type}
        </button>
      </div>

      {/* Expandable content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          expanded ? 'max-h-[1000px] mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {item.type === 'image' ? (
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={item.content}
              alt="Generated"
              className="w-full max-h-[350px] object-contain bg-gray-50"
            />
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Markdown>{item.content}</Markdown>
          </div>
        )}
      </div>

      {/* Chevron indicator */}
      <div className="flex justify-center mt-3 text-gray-400">
        {expanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export default CreationItem;
