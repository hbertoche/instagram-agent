import React, { useState, useEffect } from 'react';
import { ContentForm } from './components/ContentForm';
import { ContentOptions } from './components/ContentOptions';
import { History } from './components/History';
import { Analytics } from './components/Analytics';
import { contentService } from './services/api';
import { Content, ContentType, SelectedOption, Analytics as AnalyticsType } from './types';
import './App.css';

function App() {
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [history, setHistory] = useState<Content[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsType>({
    totalSelections: 0,
    optionASelections: 0,
    optionBSelections: 0,
    optionAPercentage: 0,
    optionBPercentage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history and analytics on component mount
  useEffect(() => {
    loadHistory();
    loadAnalytics();
  }, []);

  const loadHistory = async () => {
    try {
      const historyData = await contentService.getHistory();
      setHistory(historyData);
    } catch (err) {
      console.error('Failed to load history:', err);
    }
  };

  const loadAnalytics = async () => {
    try {
      const analyticsData = await contentService.getAnalytics();
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }
  };

  const handleGenerateContent = async (prompt: string, type: ContentType) => {
    setLoading(true);
    setError(null);
    
    try {
      const content = await contentService.generateContent({ prompt, type });
      setCurrentContent(content);
      await loadHistory(); // Refresh history
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = async (contentId: string, option: SelectedOption) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedContent = await contentService.selectOption({ contentId, selectedOption: option });
      setCurrentContent(updatedContent);
      await loadHistory(); // Refresh history
      await loadAnalytics(); // Refresh analytics
    } catch (err) {
      setError('Failed to select option. Please try again.');
      console.error('Selection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewContent = () => {
    setCurrentContent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📸 Instagram Agent</h1>
          <p className="text-gray-600">Generate and test Instagram content with AI</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {!currentContent ? (
              <ContentForm onSubmit={handleGenerateContent} loading={loading} />
            ) : (
              <div className="space-y-4">
                <ContentOptions 
                  content={currentContent} 
                  onSelect={handleSelectOption}
                  loading={loading}
                />
                <button
                  onClick={handleNewContent}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Generate New Content
                </button>
              </div>
            )}
            
            <Analytics analytics={analytics} />
          </div>

          <div>
            <History history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
