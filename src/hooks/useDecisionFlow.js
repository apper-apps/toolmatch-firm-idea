import { useState, useCallback } from 'react';
import { questionService } from '@/services/api/questionService';
import { comparisonService } from '@/services/api/comparisonService';
import { recommendationService } from '@/services/api/recommendationService';

export const useDecisionFlow = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [userSelections, setUserSelections] = useState({
    priorities: [],
    categories: [],
    preference: null
  });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentComparison, setCurrentComparison] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startFlow = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const question = await questionService.getQuestionByType('priority');
      setCurrentQuestion(question);
      setCurrentStep('priority');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectPriority = useCallback(async (priority) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedSelections = {
        ...userSelections,
        priorities: [...userSelections.priorities, priority]
      };
      setUserSelections(updatedSelections);

      const question = await questionService.getQuestionByType('category');
      setCurrentQuestion(question);
      setCurrentStep('category');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userSelections]);

  const selectCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      const comparison = await comparisonService.getComparisonByCategory(category);
      setCurrentComparison(comparison);
      setCurrentStep('comparison');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectPreference = useCallback(async (preference) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedSelections = {
        ...userSelections,
        preference
      };
      setUserSelections(updatedSelections);

      const rec = await recommendationService.generateRecommendation(updatedSelections);
      setRecommendation(rec);
      setCurrentStep('recommendation');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userSelections]);

  const nextToPreference = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const question = await questionService.getQuestionByType('preference');
      setCurrentQuestion(question);
      setCurrentStep('preference');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep('welcome');
    setUserSelections({
      priorities: [],
      categories: [],
      preference: null
    });
    setCurrentQuestion(null);
    setCurrentComparison(null);
    setRecommendation(null);
    setError(null);
  }, []);

  const retry = useCallback(() => {
    setError(null);
    switch (currentStep) {
      case 'priority':
        startFlow();
        break;
      case 'category':
        selectPriority(userSelections.priorities[userSelections.priorities.length - 1]);
        break;
      case 'comparison':
        // Retry loading comparison
        if (userSelections.categories.length > 0) {
          selectCategory(userSelections.categories[userSelections.categories.length - 1]);
        }
        break;
      case 'preference':
        nextToPreference();
        break;
      case 'recommendation':
        selectPreference(userSelections.preference);
        break;
      default:
        startFlow();
    }
  }, [currentStep, userSelections, startFlow, selectPriority, selectCategory, nextToPreference, selectPreference]);

  return {
    currentStep,
    userSelections,
    currentQuestion,
    currentComparison,
    recommendation,
    loading,
    error,
    actions: {
      startFlow,
      selectPriority,
      selectCategory,
      selectPreference,
      nextToPreference,
      resetFlow,
      retry
    }
  };
};