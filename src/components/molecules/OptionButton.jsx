import React from 'react';
import { motion } from 'framer-motion';

const OptionButton = ({ 
  option, 
  selected = false, 
  onClick,
  className = '' 
}) => {
  return (
    <motion.button
      onClick={() => onClick(option)}
      className={`
        w-full p-4 rounded-xl border text-left transition-all duration-200
        ${selected 
          ? 'bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border-primary-500 text-primary-200' 
          : 'bg-surface-800 border-surface-700 text-gray-300 hover:bg-surface-700 hover:border-surface-600'
        }
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3">
        {option.emoji && (
          <span className="text-2xl">{option.emoji}</span>
        )}
        <div className="flex-1">
          <p className="font-medium">{option.text}</p>
          {option.description && (
            <p className="text-sm text-gray-400 mt-1">{option.description}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default OptionButton;