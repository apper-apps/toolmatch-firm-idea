import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "Let's Get Started", 
  message = "Begin your journey to find the perfect SaaS builder platform",
  actionText = "Start Conversation",
  onAction,
  icon = "MessageCircle"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon 
          name={icon} 
          size={40}
          className="text-primary-400"
        />
      </div>
      
      <h2 className="text-xl font-bold gradient-text mb-3">
        {title}
      </h2>
      
      <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 flex items-center space-x-3 shadow-xl"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name={icon} size={20} />
          <span>{actionText}</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;