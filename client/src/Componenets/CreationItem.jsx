import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-white rounded-xl mb-2 shadow p-4 cursor-pointer hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-800">{item.prompt}</h2>
          <p className="text-sm text-gray-500">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {item.type}
        </button>
      </div>

      {/* Expandable content */}
      {expanded && (
        <div className="mt-4 border-t pt-4">
          {item.type === 'image' ? (
            <div className="rounded-lg overflow-hidden">
              <img
              src={item.content}
              alt="Generated"
              className="max-w-[400px] max-h-[250px] object-contain rounded-md mx-auto"
             />

            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-700">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}

      {/* Chevron indicator */}
      <div className="flex justify-center mt-2 text-gray-400">
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
