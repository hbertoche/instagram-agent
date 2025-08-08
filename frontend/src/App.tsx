import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider, NotificationContainer, useNotifications } from './contexts/NotificationContext';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import { ContentForm } from './components/ContentForm';
import { ContentOptions } from './components/ContentOptions';
import { History } from './components/History';
import { Analytics } from './components/Analytics';
import { ApiUsageDisplay } from './components/ApiUsageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { contentService } from './services/api';
import { Content, ContentType, SelectedOption, Analytics as AnalyticsType } from './types';
import './App.css';

const AppContent: React.FC = () => {
  const { user, token, isLoading: authLoading } = useAuth();
  const { addNotification } = useNotifications();
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

  // Load history and analytics on component mount (when authenticated)
  useEffect(() => {
    if (user && token) {
      loadHistory();
      loadAnalytics();
    }
  }, [user, token]);

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
      
      // Check if we got fallback content and notify user
      if (content.optionA.caption.includes('fallback') || content.optionA.caption.includes('unavailable')) {
        addNotification({
          type: 'warning',
          message: 'OpenAI API is currently unavailable. Using enhanced fallback content generation.',
          duration: 6000,
        });
      } else {
        addNotification({
          type: 'success',
          message: 'Content generated successfully!',
          duration: 3000,
        });
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to generate content';
      setError(errorMessage);
      
      if (errorMessage.toLowerCase().includes('quota') || errorMessage.toLowerCase().includes('limit')) {
        addNotification({
          type: 'error',
          message: 'API quota exceeded. Please try again later or contact support.',
          duration: 8000,
        });
      } else {
        addNotification({
          type: 'error',
          message: 'Failed to generate content. Please try again.',
          duration: 5000,
        });
      }
      
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

  // Show loading spinner during auth check
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // Show login form if not authenticated
  if (!user) {
    return <AuthForm />;
  }

  // Main app content for authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            
            {token && <ApiUsageDisplay token={token} />}
          </div>

          <div>
            <History history={history} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
        <NotificationContainer />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
