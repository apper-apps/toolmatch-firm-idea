import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '@/components/organisms/ChatInterface';
import ComparisonView from '@/components/organisms/ComparisonView';
import RecommendationCard from '@/components/organisms/RecommendationCard';
import ProgressIndicator from '@/components/organisms/ProgressIndicator';
import ApperIcon from '@/components/ApperIcon';

const DecisionFlowPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-800 to-surface-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-surface-700 bg-surface-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <ApperIcon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">ToolMatch Pro</h1>
                <p className="text-sm text-gray-400">SaaS Builder Decision Assistant</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" size={16} />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" size={16} />
                <span>Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Brain" size={16} />
                <span>Smart</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <ChatInterface className="h-full" />
          </motion.div>

          {/* Right Column - Progress & Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <ProgressIndicator />
            
            {/* Quick Info Card */}
            <div className="bg-surface-800 border border-surface-700 rounded-xl p-6">
              <h3 className="font-semibold text-gray-200 mb-4 flex items-center">
                <ApperIcon name="Info" size={16} className="mr-2 text-blue-400" />
                How It Works
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <p>Tell us your priorities and requirements</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <p>Compare features side-by-side</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <p>Get personalized recommendation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Comparison & Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8"
        >
          <ComparisonView />
          <RecommendationCard />
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border-t border-surface-700 bg-surface-800/50 backdrop-blur-sm mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <ApperIcon name="Heart" size={16} className="text-red-400" />
              <span>Built to help you make better decisions</span>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-gray-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-200 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-200 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default DecisionFlowPage;