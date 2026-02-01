import React from "react";
import { Lightbulb, CheckCircle } from "lucide-react";

const PromptHelperAdvanced = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Lightbulb className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Prompting Assistant
        </h3>
      </div>

      {/* Prompt Framework */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Use this 4-step framework for better results:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Goal", desc: "What do you want to achieve?" },
            { title: "Context", desc: "Who is it for? Any background?" },
            { title: "Constraints", desc: "Format, length, tone?" },
            { title: "Output", desc: "What should the final answer look like?" }
          ].map((item, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 bg-gray-50"
            >
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Example comparison
        </p>

        <div className="space-y-4">
          <div className="rounded-xl bg-red-50 border border-red-100 p-4">
            <p className="text-xs font-semibold text-red-600 mb-1">
              ❌ Weak Prompt
            </p>
            <p className="text-sm text-gray-800">
              Write about artificial intelligence.
            </p>
          </div>

          <div className="rounded-xl bg-green-50 border border-green-100 p-4">
            <p className="text-xs font-semibold text-green-600 mb-1">
              ✅ Strong Prompt
            </p>
            <p className="text-sm text-gray-800">
              Explain how artificial intelligence is used in healthcare for
              beginners. Use simple language, include 3 real-world examples,
              and present the answer in bullet points.
            </p>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
        <p className="text-sm font-medium text-gray-700 mb-3">
          Pro Tips
        </p>

        <ul className="space-y-2 text-sm text-gray-700">
          {[
            "Mention the target audience explicitly",
            "Specify output format (steps, table, bullets)",
            "Add tone or style (professional, friendly, concise)",
            "Limit scope to avoid generic responses"
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromptHelperAdvanced;
