import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ChatMessage = ({ 
  message, 
  isUser = false, 
  timestamp,
  avatar,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} ${className}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-r from-accent-500 to-accent-600' 
          : 'bg-gradient-to-r from-primary-600 to-secondary-600'
      }`}>
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-full h-full rounded-full" />
        ) : (
          <ApperIcon 
            name={isUser ? 'User' : 'Bot'} 
            size={16} 
            className="text-white"
          />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-xs md:max-w-md lg:max-w-lg ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-gradient-to-r from-accent-600 to-accent-700 text-white' 
            : 'bg-surface-800 text-gray-200 border border-surface-700'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        
        {timestamp && (
          <span className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;