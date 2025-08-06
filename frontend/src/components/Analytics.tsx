import React from 'react';
import { Analytics as AnalyticsType } from '../types';

interface AnalyticsProps {
  analytics: AnalyticsType;
}

export const Analytics: React.FC<AnalyticsProps> = ({ analytics }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">A/B Testing Analytics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{analytics.totalSelections}</div>
          <div className="text-sm text-gray-500">Total Selections</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{analytics.optionASelections}</div>
          <div className="text-sm text-gray-500">Option A</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{analytics.optionBSelections}</div>
          <div className="text-sm text-gray-500">Option B</div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Preferences</div>
          <div className="text-xs">
            <div className="text-green-600">A: {analytics.optionAPercentage.toFixed(1)}%</div>
            <div className="text-purple-600">B: {analytics.optionBPercentage.toFixed(1)}%</div>
          </div>
        </div>
      </div>
      
      {analytics.totalSelections > 0 && (
        <div className="mt-6">
          <div className="mb-2 text-sm font-medium text-gray-700">Selection Distribution</div>
          <div className="flex rounded-lg overflow-hidden h-4">
            <div 
              className="bg-green-500"
              style={{ width: `${analytics.optionAPercentage}%` }}
              title={`Option A: ${analytics.optionAPercentage.toFixed(1)}%`}
            ></div>
            <div 
              className="bg-purple-500"
              style={{ width: `${analytics.optionBPercentage}%` }}
              title={`Option B: ${analytics.optionBPercentage.toFixed(1)}%`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
