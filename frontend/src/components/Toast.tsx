import React, { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onDismiss: () => void;
  autoClose?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  onDismiss, 
  autoClose,
  action 
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onDismiss, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onDismiss]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📝';
    }
  };

  return (
    <div className={`border px-4 py-3 rounded mb-6 flex items-center justify-between ${getTypeStyles()}`}>
      <div className="flex items-center">
        <span className="mr-2">{getIcon()}</span>
        <span>{message}</span>
      </div>
      <div className="flex items-center space-x-2">
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm underline hover:no-underline focus:outline-none"
          >
            {action.label}
          </button>
        )}
        <button
          onClick={onDismiss}
          className="text-lg font-bold hover:opacity-70 focus:outline-none ml-2"
        >
          ×
        </button>
      </div>
    </div>
  );
};
