import comparisonsData from '@/services/mockData/comparisons.json';

export const comparisonService = {
  async getComparisons() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [...comparisonsData];
  },

  async getComparisonByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const comparison = comparisonsData.find(c => c.category === category);
    if (!comparison) {
      throw new Error(`Comparison for category ${category} not found`);
    }
    return { ...comparison };
  },

  async getFeatureComparison(feature) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const allFeatures = comparisonsData.flatMap(c => c.features);
    const featureData = allFeatures.find(f => f.name.toLowerCase().includes(feature.toLowerCase()));
    if (!featureData) {
      throw new Error(`Feature ${feature} not found`);
    }
    return { ...featureData };
  }
};