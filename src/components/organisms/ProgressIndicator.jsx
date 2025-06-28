import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { useDecisionFlow } from '@/hooks/useDecisionFlow';

const ProgressIndicator = ({ className = '' }) => {
  const { currentStep } = useDecisionFlow();

  const steps = [
    { id: 'welcome', label: 'Welcome', icon: 'Home' },
    { id: 'priority', label: 'Priorities', icon: 'Star' },
    { id: 'category', label: 'Categories', icon: 'Layers' },
    { id: 'comparison', label: 'Compare', icon: 'GitCompare' },
    { id: 'preference', label: 'Preference', icon: 'Settings' },
    { id: 'recommendation', label: 'Result', icon: 'Target' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === currentStep);
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className={`bg-surface-800 border border-surface-700 rounded-xl p-6 ${className}`}>
      <h3 className="font-semibold text-gray-200 mb-4">Decision Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const isDisabled = index > currentIndex;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              {/* Step Icon */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : isActive 
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white'
                    : 'bg-surface-700 text-gray-400'
                }
              `}>
                {isCompleted ? (
                  <ApperIcon name="Check" size={16} />
                ) : (
                  <ApperIcon name={step.icon} size={16} />
                )}
              </div>

              {/* Step Label */}
              <div className="flex-1">
                <span className={`
                  text-sm font-medium transition-colors duration-300
                  ${isActive 
                    ? 'text-primary-300' 
                    : isCompleted 
                      ? 'text-green-300'
                      : 'text-gray-400'
                  }
                `}>
                  {step.label}
                </span>
              </div>

              {/* Progress Indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-soft"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>{Math.round((currentIndex / (steps.length - 1)) * 100)}%</span>
        </div>
        <div className="w-full bg-surface-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;