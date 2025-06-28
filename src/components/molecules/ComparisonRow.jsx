import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const ComparisonRow = ({ feature, index, className = '' }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'supported':
      case 'builtin':
      case 'oneclick':
      case 'automatic':
      case 'enterprise':
      case 'certified':
      case 'visual':
      case 'integrated':
      case 'comprehensive':
      case 'full':
      case 'extensive':
        return 'Check';
      case 'external':
      case 'manual':
      case 'basic':
      case 'partial':
      case 'limited':
        return 'AlertTriangle';
      case 'none':
        return 'X';
      default:
        return 'Minus';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'supported':
      case 'builtin':
      case 'oneclick':
      case 'automatic':
      case 'enterprise':
      case 'certified':
      case 'visual':
      case 'integrated':
      case 'comprehensive':
      case 'full':
      case 'extensive':
        return 'text-green-400';
      case 'external':
      case 'manual':
      case 'basic':
      case 'partial':
      case 'limited':
        return 'text-yellow-400';
      case 'none':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getWinnerBadge = (winner) => {
    if (winner === 'apper') {
      return <Badge variant="success" size="sm" icon="Trophy">Apper</Badge>;
    } else if (winner === 'lovable') {
      return <Badge variant="info" size="sm" icon="Trophy">Lovable</Badge>;
    } else if (winner === 'tie') {
      return <Badge variant="warning" size="sm" icon="Equal">Tie</Badge>;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-surface-800 border border-surface-700 rounded-xl p-4 hover:bg-surface-700/50 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-200">{feature.name}</h4>
        {getWinnerBadge(feature.winner)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Apper */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-300">Apper</span>
            <ApperIcon 
              name={getStatusIcon(feature.apper.status)} 
              size={16}
              className={getStatusColor(feature.apper.status)}
            />
          </div>
          <p className="text-sm text-gray-400">{feature.apper.description}</p>
        </div>

        {/* Lovable */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-300">Lovable</span>
            <ApperIcon 
              name={getStatusIcon(feature.lovable.status)} 
              size={16}
              className={getStatusColor(feature.lovable.status)}
            />
          </div>
          <p className="text-sm text-gray-400">{feature.lovable.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonRow;