import React from 'react';
import { Content, SelectedOption } from '../types';

interface HistoryProps {
  history: Content[];
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Content History</h3>
        <p className="text-gray-500 text-center">No content generated yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Content History</h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-800">{item.prompt}</p>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                {item.selectedOption && (
                  <span 
                    className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                      item.selectedOption === SelectedOption.A 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    Selected: Option {item.selectedOption}
                  </span>
                )}
              </div>
            </div>
            
            {item.selectedOption && (
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Selected Caption:</span>
                </p>
                <p className="text-sm text-gray-600">
                  {item.selectedOption === SelectedOption.A 
                    ? item.optionA.caption 
                    : item.optionB.caption}
                </p>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Hashtags:</span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(item.selectedOption === SelectedOption.A 
                      ? item.optionA.hashtags 
                      : item.optionB.hashtags
                    ).map((hashtag, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
