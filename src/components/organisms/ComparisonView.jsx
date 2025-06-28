import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ComparisonRow from '@/components/molecules/ComparisonRow';
import Button from '@/components/atoms/Button';
import { useDecisionFlow } from '@/hooks/useDecisionFlow';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const ComparisonView = ({ className = '' }) => {
  const { currentComparison, currentStep, loading, error, actions } = useDecisionFlow();

  if (currentStep !== 'comparison') {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Empty
          title="Feature Comparison"
          message="Select a category from the chat to see detailed feature comparisons between Apper and Lovable."
          icon="GitCompare"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Loading type="comparison" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Error 
          message={error}
          onRetry={actions.retry}
          type="data"
        />
      </div>
    );
  }

  if (!currentComparison) {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Empty
          title="No Comparison Data"
          message="Unable to load comparison data for the selected category."
          icon="AlertTriangle"
        />
      </div>
    );
  }

  return (
    <div className={`bg-surface-800 border border-surface-700 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="border-b border-surface-700 p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold gradient-text mb-2">
            {currentComparison.title}
          </h2>
          <p className="text-gray-400">
            Feature-by-feature comparison to help you understand the differences
          </p>
        </motion.div>
      </div>

      {/* Comparison Content */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {currentComparison.features.map((feature, index) => (
          <ComparisonRow
            key={feature.name}
            feature={feature}
            index={index}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="border-t border-surface-700 p-6">
        <div className="flex justify-center">
          <Button
            onClick={actions.nextToPreference}
            icon="ArrowRight"
            iconPosition="right"
            size="lg"
          >
            Continue to Recommendation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;