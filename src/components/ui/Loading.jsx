import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ type = 'chat' }) => {
  if (type === 'chat') {
    return (
      <div className="space-y-4 p-6">
        {/* Assistant message skeleton */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-surface-700 rounded-md w-3/4 animate-pulse"></div>
            <div className="h-4 bg-surface-700 rounded-md w-1/2 animate-pulse"></div>
          </div>
        </div>
        
        {/* Options skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="h-12 bg-surface-800 border border-surface-700 rounded-lg animate-pulse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'comparison') {
    return (
      <div className="space-y-4 p-6">
        <div className="h-6 bg-surface-700 rounded-md w-1/3 animate-pulse mb-6"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-surface-800 rounded-lg border border-surface-700">
            <div className="h-4 bg-surface-700 rounded w-1/4 animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-surface-700 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-surface-700 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;