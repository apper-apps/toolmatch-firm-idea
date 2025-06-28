import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';
import { useDecisionFlow } from '@/hooks/useDecisionFlow';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const RecommendationCard = ({ className = '' }) => {
  const { recommendation, currentStep, loading, error, actions } = useDecisionFlow();

  const handleAction = (action) => {
    switch (action) {
      case 'demo':
        toast.success('Opening demo in new tab...');
        window.open('https://demo.apper.com', '_blank');
        break;
      case 'pricing':
        toast.info('Redirecting to pricing page...');
        window.open('https://apper.com/pricing', '_blank');
        break;
      case 'sales':
        toast.success('Opening contact form...');
        window.open('https://apper.com/contact', '_blank');
        break;
      case 'compare':
        toast.info('Loading detailed comparison...');
        break;
      case 'trial':
        toast.success('Starting free trial...');
        window.open('https://apper.com/signup', '_blank');
        break;
      case 'cases':
        toast.info('Loading case studies...');
        window.open('https://apper.com/case-studies', '_blank');
        break;
      case 'supabase':
        toast.info('Exploring Supabase...');
        window.open('https://supabase.com', '_blank');
        break;
      case 'docs':
        toast.info('Opening documentation...');
        window.open('https://lovable.dev/docs', '_blank');
        break;
      case 'community':
        toast.success('Joining community...');
        window.open('https://discord.gg/lovable', '_blank');
        break;
      default:
        toast.warning('Action not implemented yet');
    }
  };

  if (currentStep !== 'recommendation') {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Empty
          title="Personalized Recommendation"
          message="Complete the decision flow to receive a personalized platform recommendation tailored to your needs."
          icon="Target"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Loading />
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

  if (!recommendation) {
    return (
      <div className={`bg-surface-800 border border-surface-700 rounded-xl ${className}`}>
        <Empty
          title="No Recommendation Available"
          message="Unable to generate a recommendation. Please try the decision flow again."
          icon="AlertTriangle"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-surface-800 border border-surface-700 rounded-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="border-b border-surface-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold gradient-text">
            Recommendation
          </h2>
          <Badge variant="success" icon="CheckCircle">
            {recommendation.confidence}% Match
          </Badge>
        </div>
        
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center p-6 bg-gradient-to-r from-primary-600/10 to-secondary-600/10 rounded-xl border border-primary-500/20"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Trophy" size={32} className="text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-200 mb-2">
            {recommendation.title}
          </h3>
          <p className="text-gray-400">
            Based on your preferences and requirements
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {/* Reasons */}
        <div>
          <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
            <ApperIcon name="Lightbulb" size={16} className="mr-2 text-yellow-400" />
            Why This Platform?
          </h4>
          <div className="space-y-2">
            {recommendation.reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2"
              >
                <ApperIcon name="Check" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-300">{reason}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
            <ApperIcon name="Star" size={16} className="mr-2 text-yellow-400" />
            Key Benefits
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {recommendation.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface-700/50 rounded-lg p-3"
              >
                <p className="text-sm text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-surface-700 p-6">
        <h4 className="font-semibold text-gray-200 mb-4">Next Steps</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendation.nextSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant="secondary"
                size="sm"
                icon={step.icon}
                onClick={() => handleAction(step.action)}
                className="w-full"
              >
                {step.text}
              </Button>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-surface-700">
          <Button
            variant="primary"
            size="lg"
            icon="RotateCcw"
            onClick={actions.resetFlow}
            className="w-full"
          >
            Start New Assessment
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;