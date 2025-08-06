import React, { useState } from 'react';
import { ContentType } from '../types';

interface ContentFormProps {
  onSubmit: (prompt: string, type: ContentType) => void;
  loading?: boolean;
}

export const ContentForm: React.FC<ContentFormProps> = ({ onSubmit, loading = false }) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<ContentType>(ContentType.POST);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim(), type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Generate Instagram Content</h2>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
          Content Prompt
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Post about summer skincare tips"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          disabled={loading}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Type
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value={ContentType.POST}
              checked={type === ContentType.POST}
              onChange={(e) => setType(e.target.value as ContentType)}
              className="mr-2"
              disabled={loading}
            />
            Instagram Post
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value={ContentType.STORY}
              checked={type === ContentType.STORY}
              onChange={(e) => setType(e.target.value as ContentType)}
              className="mr-2"
              disabled={loading}
            />
            Instagram Story
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !prompt.trim()}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Generating...' : 'Generate Content'}
      </button>
    </form>
  );
};
