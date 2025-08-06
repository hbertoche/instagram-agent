import React from 'react';
import { Content, SelectedOption } from '../types';

interface ContentOptionsProps {
  content: Content;
  onSelect: (contentId: string, option: SelectedOption) => void;
  loading?: boolean;
}

export const ContentOptions: React.FC<ContentOptionsProps> = ({ content, onSelect, loading = false }) => {
  const handleSelect = (option: SelectedOption) => {
    onSelect(content.id, option);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">Generated Content</h3>
        <p className="text-gray-600 mt-1">
          <span className="font-medium">Prompt:</span> {content.prompt}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Type:</span> {content.type}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Option A */}
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            content.selectedOption === SelectedOption.A 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => !loading && handleSelect(SelectedOption.A)}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold text-gray-800">Option A</h4>
            {content.selectedOption === SelectedOption.A && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Selected</span>
            )}
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-700 mb-2">Caption:</h5>
            <p className="text-gray-600 text-sm leading-relaxed">{content.optionA.caption}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Hashtags:</h5>
            <div className="flex flex-wrap gap-1">
              {content.optionA.hashtags.map((hashtag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Option B */}
        <div 
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            content.selectedOption === SelectedOption.B 
              ? 'border-green-500 bg-green-50' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => !loading && handleSelect(SelectedOption.B)}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold text-gray-800">Option B</h4>
            {content.selectedOption === SelectedOption.B && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Selected</span>
            )}
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-700 mb-2">Caption:</h5>
            <p className="text-gray-600 text-sm leading-relaxed">{content.optionB.caption}</p>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Hashtags:</h5>
            <div className="flex flex-wrap gap-1">
              {content.optionB.hashtags.map((hashtag, index) => (
                <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                  {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!content.selectedOption && (
        <p className="text-center text-gray-500 mt-4">Click on an option to select it</p>
      )}
    </div>
  );
};
