import React, { useState, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

interface ApiUsageStats {
  callCount: number;
  lastReset: string;
  isNearLimit: boolean;
}

interface ApiUsageDisplayProps {
  token: string;
}

export const ApiUsageDisplay: React.FC<ApiUsageDisplayProps> = ({ token }) => {
  const [stats, setStats] = useState<ApiUsageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  const fetchStats = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        
        // Show warning if near limit
        if (data.isNearLimit && data.callCount > 40) {
          addNotification({
            type: 'warning',
            message: `API usage is high (${data.callCount} calls this hour). Approaching rate limit.`,
            duration: 8000,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching API stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [token]);

  if (loading && !stats) {
    return <div className="text-sm text-gray-500">Loading API stats...</div>;
  }

  if (!stats) {
    return null;
  }

  const getStatusColor = () => {
    if (stats.callCount > 45) return 'text-red-600';
    if (stats.callCount > 35) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = () => {
    if (stats.callCount > 45) return 'High Usage';
    if (stats.callCount > 35) return 'Moderate Usage';
    return 'Normal Usage';
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-700">API Usage</h4>
          <p className="text-xs text-gray-500">
            Last reset: {new Date(stats.lastReset).toLocaleTimeString()}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${getStatusColor()}`}>
            {stats.callCount}/50
          </div>
          <div className={`text-xs ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>
      </div>
      
      {stats.isNearLimit && (
        <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
          ⚠️ Approaching API limit. Fallback content will be used if limit is exceeded.
        </div>
      )}
      
      <button
        onClick={fetchStats}
        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
        disabled={loading}
      >
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  );
};
